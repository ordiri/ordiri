package store

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"sync"

	"github.com/ordiri/ordiri-netplot/pkg/aggregator"
	"github.com/ordiri/ordiri-netplot/pkg/store/migrations"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/sqlitedialect"
	"github.com/uptrace/bun/driver/sqliteshim"
	"github.com/uptrace/bun/extra/bundebug"
	"github.com/uptrace/bun/migrate"
)

type DbClient struct {
	*bun.DB
	pendingMachines          map[string]*Machine
	pendingEndpoints         map[string]*Endpoint
	pendingEndpointRelations map[string]*PacketFlow
	pl                       sync.Mutex
}

func (dbc *DbClient) Flush(ctx context.Context) error {
	dbc.pl.Lock()
	defer dbc.pl.Unlock()
	log.Printf("Flushing pending relations %d %d", len(dbc.pendingEndpoints), len(dbc.pendingEndpointRelations))
	peps := []*Endpoint{}
	for _, ep := range dbc.pendingEndpoints {
		peps = append(peps, ep)
	}

	peprs := []*PacketFlow{}
	for _, epr := range dbc.pendingEndpointRelations {
		peprs = append(peprs, epr)
	}
	err := dbc.RunInTx(ctx, &sql.TxOptions{}, func(ctx context.Context, tx bun.Tx) error {
		if _, err := tx.NewInsert().
			Model(&peps).
			On("CONFLICT DO UPDATE").
			Set("machine = COALESCE(nullif(EXCLUDED.machine,''), machine), interface = COALESCE(nullif(EXCLUDED.interface,''), interface)").
			Exec(ctx); err != nil {
			return err
		}

		if _, err := tx.NewInsert().
			Model(&peprs).
			Ignore().
			Exec(ctx); err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return err
	}

	dbc.pendingMachines = map[string]*Machine{}
	dbc.pendingEndpoints = map[string]*Endpoint{}
	dbc.pendingEndpointRelations = map[string]*PacketFlow{}

	return nil
}

func (dbc *DbClient) PutPacket(ctx context.Context, packet aggregator.AggregatedPacket) error {
	dbc.pl.Lock()
	defer dbc.pl.Unlock()
	src := packet.GetSource()
	dst := packet.GetDestination()
	srcEp := &Endpoint{
		ID: src.Mac.String(),
	}
	dstEp := &Endpoint{
		ID: dst.Mac.String(),
	}

	if packet.Direction == aggregator.AggregatedPacketDirectionOutbound {
		srcEp.Interface = packet.Interface
		srcEp.MachineId = packet.MachineId
	} else {
		dstEp.Interface = packet.Interface
		dstEp.MachineId = packet.MachineId
	}

	dbc.pendingMachines[packet.MachineId] = &Machine{
		ID:   packet.MachineId,
		Name: packet.MachineId,
	}

	dbc.pendingEndpoints[src.Mac.String()] = srcEp

	dbc.pendingEndpoints[dst.Mac.String()] = dstEp

	eprKey := fmt.Sprintf("%s:%s:%d:%s:%s:%d", src.Mac.String(), dst.Ip.String(), src.Port, dst.Mac.String(), dst.Ip.String(), dst.Port)

	dbc.pendingEndpointRelations[eprKey] = &PacketFlow{
		SourceID:   src.Mac.String(),
		SourceIp:   src.Ip.String(),
		SourcePort: src.Port,
		TargetID:   dst.Mac.String(),
		TargetIp:   dst.Ip.String(),
		TargetPort: dst.Port,
		Target:     dbc.pendingEndpoints[dst.Mac.String()],
		Source:     dbc.pendingEndpoints[src.Mac.String()],
	}

	return nil
}

type Book struct {
	ID       int64
	AuthorID int64
	Author   Author `bun:"rel:belongs-to,join:author_id=id"`
}

type Author struct {
	ID int64
}

func Client(migrate bool) (*DbClient, error) {
	ctx := context.Background()

	sqldb, err := sql.Open(sqliteshim.ShimName, "file::memory:?cache=shared")
	if err != nil {
		return nil, err
	}

	db := bun.NewDB(sqldb, sqlitedialect.New())
	// Register many to many model so bun can better recognize m2m relation.
	// This should be done before you use the model for the first time.

	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))

	db.RegisterModel((*Machine)(nil), (*Endpoint)(nil), (*PacketFlow)(nil))

	if _, err := db.NewCreateTable().IfNotExists().Model((*Machine)(nil)).WithForeignKeys().Exec(ctx); err != nil {
		return nil, err
	}
	if _, err := db.NewCreateTable().IfNotExists().Model((*Endpoint)(nil)).WithForeignKeys().Exec(ctx); err != nil {
		return nil, err
	}
	if _, err := db.NewCreateTable().IfNotExists().Model((*PacketFlow)(nil)).WithForeignKeys().Exec(ctx); err != nil {
		return nil, err
	}

	// db.NewInsert().Model(&User{Name: "Aoe", Profiles: []*Profile{{Lang: "en"}, {Lang: "de"}}}).Exec(ctx)

	// user := new(User)

	// if err := db.NewSelect().
	// 	Model(user).
	// 	Column("user.*").
	// 	Relation("Profiles", func(q *bun.SelectQuery) *bun.SelectQuery {
	// 		return q.Where("active IS TRUE")
	// 	}).
	// 	OrderExpr("user.id ASC").
	// 	Limit(1).
	// 	Scan(ctx); err != nil {
	// 	panic(err)
	// }
	// fmt.Println(user.ID, user.Name, user.Profiles[0], user.Profiles[1])

	// spew.Dump(user)

	if migrate {
		_, err := doMigrate(ctx, db)
		if err != nil {
			return nil, err
		}
	}

	return &DbClient{
		DB:                       db,
		pendingMachines:          map[string]*Machine{},
		pendingEndpoints:         map[string]*Endpoint{},
		pendingEndpointRelations: map[string]*PacketFlow{},
	}, nil
}

func doMigrate(ctx context.Context, db *bun.DB) (bool, error) {
	migrator := migrate.NewMigrator(db, migrations.Migrations)
	if err := migrator.Init(ctx); err != nil {
		return false, err
	}
	if err := migrator.Lock(ctx); err != nil {
		return false, err
	}
	defer migrator.Unlock(ctx) //nolint:errcheck

	group, err := migrator.Migrate(ctx)
	if err != nil {
		return false, err
	}
	if group.IsZero() {
		return false, nil
	}
	return true, nil
}
