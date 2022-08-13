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
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec';
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * Subnet
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     */
    spec?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     */
    status?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatusFromJSON(json['status']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet | null): any {
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
        'spec': ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpecToJSON(value.spec),
        'status': ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatusToJSON(value.status),
    };
}

