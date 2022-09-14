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
import type { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec } from './ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec';
import {
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * Volume
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
 */
export interface ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     */
    spec?: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec;
    /**
     * VolumeStatus defines the observed state of Volume
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     */
    status?: object;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume {
    return ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeToJSON(value?: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume | null): any {
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
        'spec': ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpecToJSON(value.spec),
        'status': value.status,
    };
}
