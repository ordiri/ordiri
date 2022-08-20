package network

import (
	"context"
	"reflect"
	"testing"

	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/driver"
)

func TestNewManager(t *testing.T) {
	type args struct {
		driver driver.Driver
	}
	tests := []struct {
		name    string
		args    args
		want    api.RunnableManager
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewManager(tt.args.driver)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewManager() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewManager() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_networkManager_Close(t *testing.T) {
	type fields struct {
		networks []*managedNet
		driver   driver.Driver
	}
	tests := []struct {
		name    string
		fields  fields
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ln := &networkManager{
				networks: tt.fields.networks,
				driver:   tt.fields.driver,
			}
			if err := ln.Close(); (err != nil) != tt.wantErr {
				t.Errorf("networkManager.Close() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_networkManager_Start(t *testing.T) {
	type fields struct {
		networks []*managedNet
		driver   driver.Driver
	}
	type args struct {
		ctx context.Context
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ln := &networkManager{
				networks: tt.fields.networks,
				driver:   tt.fields.driver,
			}
			if err := ln.Start(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("networkManager.Start() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
