package compute

import (
	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	"k8s.io/apimachinery/pkg/runtime"
)

var AddToScheme = func(scheme *runtime.Scheme) error {
	if err := computev1alpha1.AddToScheme(scheme); err != nil {
		return err
	}

	return nil
}

func RegisterDefaults(scheme *runtime.Scheme) error {
	if err := computev1alpha1.RegisterDefaults(scheme); err != nil {
		return err
	}

	return nil

}
