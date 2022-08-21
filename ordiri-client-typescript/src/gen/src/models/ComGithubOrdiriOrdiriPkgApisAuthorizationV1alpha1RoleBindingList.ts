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
import type { ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBinding } from './ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBinding';
import {
    ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingFromJSON,
    ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingToJSON,
} from './ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBinding';
import type { IoK8sApimachineryPkgApisMetaV1ListMeta } from './IoK8sApimachineryPkgApisMetaV1ListMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ListMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ListMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ListMeta';

/**
 * RoleBindingList
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList
 */
export interface ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList
     */
    apiVersion?: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBinding>}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList
     */
    items: Array<ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBinding>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ListMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ListMeta;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "items" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingListFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList {
    return ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingListFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'items': ((json['items'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingFromJSON)),
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON(json['metadata']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingListToJSON(value?: ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'items': ((value.items as Array<any>).map(ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleBindingToJSON)),
        'kind': value.kind,
        'metadata': IoK8sApimachineryPkgApisMetaV1ListMetaToJSON(value.metadata),
    };
}

