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
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration {
    /**
     * 
     * @type {boolean}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration
     */
    enabled: boolean;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "enabled" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfigurationFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfigurationFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfigurationToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
    };
}

