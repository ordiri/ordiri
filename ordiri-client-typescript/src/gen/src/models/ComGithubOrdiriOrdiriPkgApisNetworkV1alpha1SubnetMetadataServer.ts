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
 * 
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer
     */
    mac: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "mac" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServerFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServerFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mac': json['mac'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServerToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetMetadataServer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mac': value.mac,
    };
}

