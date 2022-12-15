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
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus {
    /**
     * 
     * @type {Array<string>}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus
     */
    ips?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus
     */
    mac: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "mac" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ips': !exists(json, 'ips') ? undefined : json['ips'],
        'mac': json['mac'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkInterfaceStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ips': value.ips,
        'mac': value.mac,
    };
}
