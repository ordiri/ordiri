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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty';

/**
 * MachineSpec defines the desired state of Machine
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec {
    /**
     * 
     * @type {boolean}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec
     */
    approved?: boolean;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec
     */
    properties?: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty>;
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec
     */
    role: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "role" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'approved': !exists(json, 'approved') ? undefined : json['approved'],
        'properties': !exists(json, 'properties') ? undefined : ((json['properties'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSON)),
        'role': json['role'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpecToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'approved': value.approved,
        'properties': value.properties === undefined ? undefined : ((value.properties as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyToJSON)),
        'role': value.role,
    };
}
