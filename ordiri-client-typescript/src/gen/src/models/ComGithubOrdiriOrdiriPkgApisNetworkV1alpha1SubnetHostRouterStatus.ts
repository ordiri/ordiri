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
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus
     */
    mac: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "mac" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mac': json['mac'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetHostRouterStatus | null): any {
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

