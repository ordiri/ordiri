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
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTarget } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTarget';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTarget';

/**
 * 
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup
     */
    name: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTarget>}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup
     */
    targets: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTarget>;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "targets" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroupFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroupFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'targets': ((json['targets'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetFromJSON)),
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroupToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetGroup | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'targets': ((value.targets as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1LoadBalancerTargetToJSON)),
    };
}

