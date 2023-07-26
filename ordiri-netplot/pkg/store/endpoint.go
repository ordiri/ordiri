package store

type Machine struct {
	ID   string `bun:",pk" json:"id"`
	Name string `json:"name"`

	Endpoints []*Endpoint `bun:"rel:has-many,join:id=machine" json:"endpoints"`
}

type Endpoint struct {
	ID        string `bun:",pk" json:"id"`
	Name      string `json:"name"`
	MachineId string `json:"machineId"`
	Interface string `json:"interface"`

	Machine *Machine      `bun:"rel:belongs-to,join:machine_id=id" json:"machine"`
	Sources []*PacketFlow `bun:"rel:has-many,join:id=source_id" json:"sources"`
	Targets []*PacketFlow `bun:"rel:has-many,join:id=target_id" json:"targets"`
}

type PacketFlow struct {
	TargetID string `bun:",pk" json:"targetID"`
	SourceID string `bun:",pk" json:"sourceID"`

	TargetIp   string `bun:",pk" json:"targetIp"`
	TargetPort int64  `bun:",pk" json:"targetPort"`

	SourceIp   string `bun:",pk" json:"sourceIp"`
	SourcePort int64  `bun:",pk" json:"sourcePort"`

	Source *Endpoint `bun:"rel:belongs-to,join:source_id=id" json:"source"`
	Target *Endpoint `bun:"rel:belongs-to,join:target_id=id" json:"target"`
}
