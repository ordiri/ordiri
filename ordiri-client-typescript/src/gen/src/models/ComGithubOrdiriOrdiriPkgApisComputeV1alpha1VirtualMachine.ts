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
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1Operation } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1Operation';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1OperationFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1OperationFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1OperationToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1Operation';
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec';
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * VirtualMachine
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1Operation>}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    pendingOperations?: Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1Operation>;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    spec?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     */
    status?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'pendingOperations': !exists(json, 'pendingOperations') ? undefined : ((json['pendingOperations'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisComputeV1alpha1OperationFromJSON)),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatusFromJSON(json['status']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'kind': value.kind,
        'metadata': IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON(value.metadata),
        'pendingOperations': value.pendingOperations === undefined ? undefined : ((value.pendingOperations as Array<any>).map(ComGithubOrdiriOrdiriPkgApisComputeV1alpha1OperationToJSON)),
        'spec': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecToJSON(value.spec),
        'status': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatusToJSON(value.status),
    };
}

