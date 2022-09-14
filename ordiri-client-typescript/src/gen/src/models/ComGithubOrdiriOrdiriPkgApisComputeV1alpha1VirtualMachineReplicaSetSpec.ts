/* tslint:disable */
/* eslint-disable */
/**
 * openapi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate';

/**
 * VirtualMachineReplicaSetSpec defines the desired state of VirtualMachineReplicaSet
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec {
    /**
     * 
     * @type {number}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec
     */
    replicas: number;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec
     */
    template: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "replicas" in value;
    isInstance = isInstance && "template" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpecFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpecFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'replicas': json['replicas'],
        'template': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSON(json['template']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpecToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'replicas': value.replicas,
        'template': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateToJSON(value.template),
    };
}
