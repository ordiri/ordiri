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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * MachineProfile
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     */
    kind?: string;
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     */
    metadata?: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     */
    spec?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec;
    /**
     * MachineProfileStatus defines the observed state of MachineProfile
     * @type {object}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     */
    status?: object;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile | null): any {
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
        'spec': ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpecToJSON(value.spec),
        'status': value.status,
    };
}

