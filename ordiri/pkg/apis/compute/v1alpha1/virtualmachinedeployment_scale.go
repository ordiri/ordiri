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
	v1 "k8s.io/api/autoscaling/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
)

var _ resource.ObjectWithScaleSubResource = &VirtualMachineDeployment{}

func (in *VirtualMachineDeployment) SetScale(scaleSubResource *v1.Scale) {
	in.Spec.Replicas = scaleSubResource.Spec.Replicas
}

func (in *VirtualMachineDeployment) GetScale() (scaleSubResource *v1.Scale) {
	return &v1.Scale{
		ObjectMeta: metav1.ObjectMeta{
			Name:              in.Name,
			Namespace:         in.Namespace,
			UID:               in.UID,
			ResourceVersion:   in.ResourceVersion,
			CreationTimestamp: in.CreationTimestamp,
		},
		Spec: v1.ScaleSpec{
			Replicas: in.Spec.Replicas,
		},
	}
}
