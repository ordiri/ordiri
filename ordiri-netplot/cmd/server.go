package cmd

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/bufbuild/connect-go"
	grpchealth "github.com/bufbuild/connect-grpchealth-go"
	grpcreflect "github.com/bufbuild/connect-grpcreflect-go"
	"github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1/netplotv1connect"
	"github.com/ordiri/ordiri-netplot/pkg/aggregator"
	"github.com/ordiri/ordiri-netplot/pkg/grpc"
	"github.com/ordiri/ordiri-netplot/pkg/store"
	"github.com/spf13/cobra"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		ctx := cmd.Context()
		const address = "[::]:8096"
		db, err := store.Client(true)

		agg := aggregator.NewAggregator()

		if err != nil {
			return err
		}
		go func() {
			for pkt := range agg.Packets {
				log.Printf("Got packet %+v\n", pkt)
				if err := db.PutPacket(ctx, pkt); err != nil {
					log.Printf("Error putting packet: %v\n", err)
					continue
				}
			}
		}()

		go func() {
			ticker := time.NewTicker(5 * time.Second)
			for {
				select {
				case <-ctx.Done():
					return
				case <-ticker.C:
					if err := db.Flush(ctx); err != nil {
						log.Printf("Error flushing db: %v\n", err)
					}

				}
			}
		}()
		mux := http.NewServeMux()
		aggsrv := grpc.NewNetServiceServer(agg, db)
		compress1KB := connect.WithCompressMinBytes(1024)

		mux.Handle(netplotv1connect.NewNetplotServerServiceHandler(aggsrv, compress1KB))
		mux.Handle(grpchealth.NewHandler(
			grpchealth.NewStaticChecker(netplotv1connect.NetplotServerServiceName),
			compress1KB,
		))
		mux.Handle(grpcreflect.NewHandlerV1(
			grpcreflect.NewStaticReflector(netplotv1connect.NetplotServerServiceName),
			compress1KB,
		))
		mux.Handle(grpcreflect.NewHandlerV1Alpha(
			grpcreflect.NewStaticReflector(netplotv1connect.NetplotServerServiceName),
			compress1KB,
		))
		mux.Handle("/api", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			eps := []*store.Endpoint{}
			err := db.NewSelect().Model(&eps).Relation("Sources").Relation("Targets").Scan(ctx)

			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(err.Error()))
				return
			}
			w.Header().Set("Content-Type", "application/json")
			b, err := json.Marshal(eps)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(err.Error()))
				return
			}
			w.WriteHeader(200)
			w.Write(b)
		}))

		signals := make(chan os.Signal, 1)
		signal.Notify(signals, os.Interrupt, syscall.SIGTERM)

		fmt.Println("... Listening on", address)
		srv := &http.Server{
			Addr: address,
			Handler: h2c.NewHandler(
				mux,
				&http2.Server{},
			),
			ReadHeaderTimeout: time.Second,
			ReadTimeout:       5 * time.Minute,
			WriteTimeout:      5 * time.Minute,
			MaxHeaderBytes:    8 * 1024, // 8KiB
		}

		cert, key, err := getCert()
		if err != nil {
			return err
		}
		go func() {
			aggsrv.StartMonitor(ctx)
		}()
		go func() {
			if err := srv.ListenAndServeTLS(cert, key); err != nil && !errors.Is(err, http.ErrServerClosed) {
				log.Fatalf("HTTP listen and serve: %v", err)
			}
		}()

		<-signals
		ctx, cancel := context.WithTimeout(ctx, time.Second)
		defer cancel()
		if err := srv.Shutdown(ctx); err != nil {
			return err
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
