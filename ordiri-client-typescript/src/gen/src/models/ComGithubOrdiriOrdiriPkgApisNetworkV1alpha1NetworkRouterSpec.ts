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
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec {
    /**
     * 
     * @type {boolean}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec
     */
    ip: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "enabled" in value;
    isInstance = isInstance && "ip" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpecFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpecFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
        'ip': json['ip'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpecToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkRouterSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'ip': value.ip,
    };
}

