package firewall

import (
	"net"

	"github.com/ordiri/ordiri/pkg/nftables"
	"github.com/ordiri/ordiri/pkg/nftables/expr"
)

type Table = nftables.Table
type Chain = nftables.Chain
type Rule = nftables.Rule

// todo we should implement ipv6 in places like this and flow rules
// and return multiple []*Rule
func Masquerade(table *Table, chain *Chain, cidr *net.IPNet) *Rule {

	_ = &nftables.Rule{
		Table: &nftables.Table{Name: "filter", Family: nftables.TableFamilyIPv4},
		Chain: &nftables.Chain{
			Name: "output",
		},
		Exprs: []expr.Any{
			&expr.Ct{Register: 1, SourceRegister: false, Key: expr.CtKeyHELPER},
			&expr.Objref{
				// Name: ,
			},
			&expr.Cmp{Op: expr.CmpOpNeq, Register: 1, Data: []byte{0, 0, 0, 0}},
			&expr.Verdict{Kind: expr.VerdictAccept},
			// &expr.Co
		},
	}

	return &Rule{
		Table:    table,
		Chain:    chain,
		UserData: []byte("msq"),
		Exprs: []expr.Any{
			// // payload load 4b @ network header + 12 => reg 1
			// &expr.Payload{
			// 	DestRegister: 1,
			// 	Base:         expr.PayloadBaseNetworkHeader,
			// 	Offset:       12,
			// 	Len:          4,
			// },
			// // cmp eq reg 1 0x0245a8c0
			// &expr.Cmp{
			// 	Op:       expr.CmpOpEq,
			// 	Register: 1,
			// 	Data:     net.ParseIP("192.168.69.2").To4(),
			// },

			// masq
			&expr.Masq{
				Persistent: true,
			},
		},
	}
}
