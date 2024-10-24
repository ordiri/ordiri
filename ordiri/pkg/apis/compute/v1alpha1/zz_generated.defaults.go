//go:build !ignore_autogenerated
// +build !ignore_autogenerated

/*
Copyright 2022.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.aoeaoeaoeao
*/
// Code generated by defaulter-gen. DO NOT EDIT.

package v1alpha1

import (
	runtime "k8s.io/apimachinery/pkg/runtime"
)

// RegisterDefaults adds defaulters functions to the given scheme.
// Public to allow building arbitrary schemes.
// All generated defaulters are covering - they call all nested defaulters.
func RegisterDefaults(scheme *runtime.Scheme) error {
	scheme.AddTypeDefaultingFunc(&VirtualMachine{}, func(obj interface{}) { SetObjectDefaults_VirtualMachine(obj.(*VirtualMachine)) })
	scheme.AddTypeDefaultingFunc(&VirtualMachineDeployment{}, func(obj interface{}) { SetObjectDefaults_VirtualMachineDeployment(obj.(*VirtualMachineDeployment)) })
	scheme.AddTypeDefaultingFunc(&VirtualMachineDeploymentList{}, func(obj interface{}) {
		SetObjectDefaults_VirtualMachineDeploymentList(obj.(*VirtualMachineDeploymentList))
	})
	scheme.AddTypeDefaultingFunc(&VirtualMachineList{}, func(obj interface{}) { SetObjectDefaults_VirtualMachineList(obj.(*VirtualMachineList)) })
	scheme.AddTypeDefaultingFunc(&VirtualMachineReplicaSet{}, func(obj interface{}) { SetObjectDefaults_VirtualMachineReplicaSet(obj.(*VirtualMachineReplicaSet)) })
	scheme.AddTypeDefaultingFunc(&VirtualMachineReplicaSetList{}, func(obj interface{}) {
		SetObjectDefaults_VirtualMachineReplicaSetList(obj.(*VirtualMachineReplicaSetList))
	})
	return nil
}

func SetObjectDefaults_VirtualMachine(in *VirtualMachine) {
	SetDefaults_VirtualMachine(in)
	SetDefaults_VirtualMachineSpec(&in.Spec)
	SetDefaults_VirtualMachineResources(&in.Spec.Resources)
}

func SetObjectDefaults_VirtualMachineDeployment(in *VirtualMachineDeployment) {
	SetDefaults_VirtualMachineDeployment(in)
	SetDefaults_VirtualMachineSpec(&in.Spec.Template.Spec)
	SetDefaults_VirtualMachineResources(&in.Spec.Template.Spec.Resources)
}

func SetObjectDefaults_VirtualMachineDeploymentList(in *VirtualMachineDeploymentList) {
	for i := range in.Items {
		a := &in.Items[i]
		SetObjectDefaults_VirtualMachineDeployment(a)
	}
}

func SetObjectDefaults_VirtualMachineList(in *VirtualMachineList) {
	for i := range in.Items {
		a := &in.Items[i]
		SetObjectDefaults_VirtualMachine(a)
	}
}

func SetObjectDefaults_VirtualMachineReplicaSet(in *VirtualMachineReplicaSet) {
	SetDefaults_VirtualMachineSpec(&in.Spec.Template.Spec)
	SetDefaults_VirtualMachineResources(&in.Spec.Template.Spec.Resources)
}

func SetObjectDefaults_VirtualMachineReplicaSetList(in *VirtualMachineReplicaSetList) {
	for i := range in.Items {
		a := &in.Items[i]
		SetObjectDefaults_VirtualMachineReplicaSet(a)
	}
}
