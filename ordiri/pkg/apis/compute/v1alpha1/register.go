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

package v1alpha1

import (
	autoscalingv1 "k8s.io/api/autoscaling/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

const (
	GroupName = "compute.ordiri.com"
	Version   = "v1alpha1"
)

var SchemeGroupVersion = schema.GroupVersion{Group: GroupName, Version: Version}

var AddToScheme = func(scheme *runtime.Scheme) error {
	metav1.AddToGroupVersion(scheme, SchemeGroupVersion)
	if !scheme.Recognizes(autoscalingv1.SchemeGroupVersion.WithKind("Scale")) {
		autoscalingv1.AddToScheme(scheme)
	}
	// +kubebuilder:scaffold:install

	scheme.AddKnownTypes(SchemeGroupVersion, &VirtualMachineDeployment{}, &VirtualMachineDeploymentList{}, &VirtualMachineReplicaSet{}, &VirtualMachineReplicaSetList{})
	scheme.AddKnownTypes(SchemeGroupVersion, &VirtualMachine{}, &VirtualMachineList{})
	return nil
}

// Resource takes an unqualified resource and returns a Group qualified GroupResource
func Resource(resource string) schema.GroupResource {
	return SchemeGroupVersion.WithResource(resource).GroupResource()
}
