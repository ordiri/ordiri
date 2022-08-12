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
 * MachineProperty is a key/value pair, representing a property on a machine
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty
     */
    value: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'value': json['value'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachinePropertyToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'value': value.value,
    };
}

