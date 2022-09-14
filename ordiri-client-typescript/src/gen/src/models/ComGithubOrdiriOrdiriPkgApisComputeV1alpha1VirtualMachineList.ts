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
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine';
import type { IoK8sApimachineryPkgApisMetaV1ListMeta } from './IoK8sApimachineryPkgApisMetaV1ListMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ListMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ListMeta';

/**
 * VirtualMachineList
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList
     */
    apiVersion?: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine>}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList
     */
    items: Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ListMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ListMeta;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "items" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineListFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineListFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'items': ((json['items'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineFromJSON)),
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON(json['metadata']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineListToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'items': ((value.items as Array<any>).map(ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineToJSON)),
        'kind': value.kind,
        'metadata': IoK8sApimachineryPkgApisMetaV1ListMetaToJSON(value.metadata),
    };
}
