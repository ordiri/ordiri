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
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet';
import type { IoK8sApimachineryPkgApisMetaV1ListMeta } from './IoK8sApimachineryPkgApisMetaV1ListMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ListMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ListMeta';

/**
 * SubnetList
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList
     */
    apiVersion?: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet>}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList
     */
    items: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ListMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ListMeta;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "items" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetListFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetListFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'items': ((json['items'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetFromJSON)),
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON(json['metadata']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetListToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'items': ((value.items as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetToJSON)),
        'kind': value.kind,
        'metadata': IoK8sApimachineryPkgApisMetaV1ListMetaToJSON(value.metadata),
    };
}

