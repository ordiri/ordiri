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
import type { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec } from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec';
import {
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSON,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecToJSON,
} from './ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec';
import type { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import {
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON,
} from './IoK8sApimachineryPkgApisMetaV1ObjectMeta';

/**
 * 
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate
 */
export interface ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate {
    /**
     * 
     * @type {IoK8sApimachineryPkgApisMetaV1ObjectMeta}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate
     */
    metadata: IoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * 
     * @type {ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec}
     * @memberof ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate
     */
    spec: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "metadata" in value;
    isInstance = isInstance && "spec" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate {
    return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'metadata': IoK8sApimachineryPkgApisMetaV1ObjectMetaFromJSON(json['metadata']),
        'spec': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecFromJSON(json['spec']),
    };
}

export function ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplateToJSON(value?: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'metadata': IoK8sApimachineryPkgApisMetaV1ObjectMetaToJSON(value.metadata),
        'spec': ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpecToJSON(value.spec),
    };
}
