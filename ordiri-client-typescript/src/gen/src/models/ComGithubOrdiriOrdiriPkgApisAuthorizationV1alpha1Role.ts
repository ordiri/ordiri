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
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * Role
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
 */
export interface ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * RoleSpec defines the desired state of Role
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
     */
    spec?: object;
    /**
     * RoleStatus defines the observed state of Role
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role
     */
    status?: object;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role {
    return ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : json['spec'],
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1RoleToJSON(value?: ComGithubOrdiriOrdiriPkgApisAuthorizationV1alpha1Role | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'kind': value.kind,
        'metadata': IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON(value.metadata),
        'spec': value.spec,
        'status': value.status,
    };
}

