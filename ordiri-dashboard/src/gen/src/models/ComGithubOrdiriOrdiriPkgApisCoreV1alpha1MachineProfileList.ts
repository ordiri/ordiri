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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile';
import type { V1ListMeta } from './V1ListMeta';
import {
    V1ListMetaFromJSON,
    V1ListMetaFromJSONTyped,
    V1ListMetaToJSON,
} from './V1ListMeta';

/**
 * MachineProfileList
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList
     */
    apiVersion?: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList
     */
    items: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList
     */
    kind?: string;
    /**
     * 
     * @type {V1ListMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList
     */
    metadata?: V1ListMeta;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "items" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileListFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileListFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'items': ((json['items'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSON)),
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ListMetaFromJSON(json['metadata']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileListToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'items': ((value.items as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileToJSON)),
        'kind': value.kind,
        'metadata': V1ListMetaToJSON(value.metadata),
    };
}

