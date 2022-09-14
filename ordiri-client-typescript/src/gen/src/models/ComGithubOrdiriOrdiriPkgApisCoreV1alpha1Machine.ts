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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec';
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * Machine
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     */
    spec?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     */
    status?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatusFromJSON(json['status']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine | null): any {
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
        'spec': ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecToJSON(value.spec),
        'status': ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatusToJSON(value.status),
    };
}
