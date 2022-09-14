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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfigurationFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfigurationFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfigurationToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration';

/**
 * MachineProfileSpec defines the desired state of MachineProfile
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec {
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec
     */
    files?: { [key: string]: string; };
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec
     */
    ipxeConfiguration?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'files': !exists(json, 'files') ? undefined : json['files'],
        'ipxeConfiguration': !exists(json, 'ipxeConfiguration') ? undefined : ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfigurationFromJSON(json['ipxeConfiguration']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'files': value.files,
        'ipxeConfiguration': ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfigurationToJSON(value.ipxeConfiguration),
    };
}
