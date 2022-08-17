package network

import (
	"testing"

	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/driver"
)

func Test_networkManager_HasSubnet(t *testing.T) {
	network := &managedNet{
		nw: &network{
			name: "test",
		},
	}
	type fields struct {
		networks []*managedNet
		driver   driver.Driver
	}
	type args struct {
		nw   api.Network
		name string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   bool
	}{
		{
			name: "No networks, subnet doesn't exist",
			fields: fields{
				networks: []*managedNet{},
			},
			args: args{
				nw:   network.nw,
				name: "subnet",
			},
			want: false,
		},
		{
			name: "One networks, no subnets, subnet doesn't exist",
			fields: fields{
				networks: []*managedNet{
					network,
				},
			},
			args: args{
				nw:   network.nw,
				name: "subnet",
			},
			want: false,
		},
		{
			name: "One networks, no subnets, subnet doesn't exist",
			fields: fields{
				networks: []*managedNet{
					{
						nw: network.nw,
						subnets: []*managedSubnet{
							{
								sn: &subnet{name: "subnet"},
							},
						},
					},
				},
			},
			args: args{
				nw:   network.nw,
				name: "subnet",
			},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ln := &networkManager{
				networks: tt.fields.networks,
				driver:   tt.fields.driver,
			}
			if got := ln.HasSubnet(tt.args.nw, tt.args.name); got != tt.want {
				t.Errorf("networkManager.HasSubnet() = %v, want %v", got, tt.want)
			}
		})
	}
}
