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
import type { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec } from './ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec';
import {
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * VolumeClaim
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
 */
export interface ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     */
    spec?: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec;
    /**
     * VolumeClaimStatus defines the observed state of VolumeClaim
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     */
    status?: object;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim {
    return ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimToJSON(value?: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim | null): any {
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
        'spec': ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpecToJSON(value.spec),
        'status': value.status,
    };
}
