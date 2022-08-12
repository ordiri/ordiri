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
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec';
import type { V1ObjectMeta } from './V1ObjectMeta';
import {
    V1ObjectMetaFromJSON,
    V1ObjectMetaFromJSONTyped,
    V1ObjectMetaToJSON,
} from './V1ObjectMeta';

/**
 * RouteTable
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     */
    spec?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec;
    /**
     * RouteTableStatus defines the observed state of RouteTable
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     */
    status?: object;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'kind': value.kind,
        'metadata': V1ObjectMetaToJSON(value.metadata),
        'spec': ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpecToJSON(value.spec),
        'status': value.status,
    };
}

