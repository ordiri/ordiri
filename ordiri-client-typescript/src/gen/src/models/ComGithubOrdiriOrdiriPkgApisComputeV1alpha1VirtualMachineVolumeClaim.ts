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
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim
     */
    claimName: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "claimName" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaimFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaimFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaimFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'claimName': json['claimName'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaimToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'claimName': value.claimName,
    };
}

