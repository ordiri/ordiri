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
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec {
    /**
     * 
     * @type {boolean}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec
     */
    nat: boolean;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nat" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpecFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpecFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nat': json['nat'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpecToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nat': value.nat,
    };
}
