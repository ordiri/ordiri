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
/**
 * VirtualMachineReplicaSetStatus defines the observed state of VirtualMachineReplicaSet
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus {
    /**
     * 
     * @type {number}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus
     */
    replicas: number;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "replicas" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'replicas': json['replicas'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'replicas': value.replicas,
    };
}

