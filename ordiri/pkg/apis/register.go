package apis

import (
	compute "github.com/ordiri/ordiri/pkg/apis/compute"
	core "github.com/ordiri/ordiri/pkg/apis/core"
	network "github.com/ordiri/ordiri/pkg/apis/network"
	storage "github.com/ordiri/ordiri/pkg/apis/storage"
	"k8s.io/apimachinery/pkg/runtime"
)

var AddToScheme = func(scheme *runtime.Scheme) error {
	if err := core.AddToScheme(scheme); err != nil {
		return err
	}
	if err := compute.AddToScheme(scheme); err != nil {
		return err
	}
	if err := network.AddToScheme(scheme); err != nil {
		return err
	}
	if err := storage.AddToScheme(scheme); err != nil {
		return err
	}

	return nil
}

func RegisterDefaults(scheme *runtime.Scheme) error {
	if err := core.RegisterDefaults(scheme); err != nil {
		return err
	}
	if err := compute.RegisterDefaults(scheme); err != nil {
		return err
	}
	if err := network.RegisterDefaults(scheme); err != nil {
		return err
	}
	if err := storage.RegisterDefaults(scheme); err != nil {
		return err
	}

	return nil

}
