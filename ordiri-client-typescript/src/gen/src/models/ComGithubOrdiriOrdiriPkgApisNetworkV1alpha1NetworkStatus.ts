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
import type { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus } from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus';
import {
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus';
import type { IoK8sApimachineryPkgApisMetaV1Condition } from './IoK8sApimachineryPkgApisMetaV1Condition';
import {
    IoK8sApimachineryPkgApisMetaV1ConditionFromJSON,
    IoK8sApimachineryPkgApisMetaV1ConditionFromJSONTyped,
    IoK8sApimachineryPkgApisMetaV1ConditionToJSON,
} from './IoK8sApimachineryPkgApisMetaV1Condition';

/**
 * NetworkStatus defines the observed state of Network
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus {
    /**
     * Represents the observations of a Networks current state. Known .status.conditions.type are: "AssignedRole", "Progressing", and "Degraded"
     * @type {Array<IoK8sApimachineryPkgApisMetaV1Condition>}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus
     */
    conditions?: Array<IoK8sApimachineryPkgApisMetaV1Condition>;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus>}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus
     */
    hosts: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus>;
    /**
     * The generation observed by the deployment controller.
     * @type {number}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus
     */
    observedGeneration?: number;
    /**
     * 
     * @type {number}
     * @memberof ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus
     */
    vni: number;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "hosts" in value;
    isInstance = isInstance && "vni" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus {
    return ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(IoK8sApimachineryPkgApisMetaV1ConditionFromJSON)),
        'hosts': ((json['hosts'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatusFromJSON)),
        'observedGeneration': !exists(json, 'observedGeneration') ? undefined : json['observedGeneration'],
        'vni': json['vni'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(IoK8sApimachineryPkgApisMetaV1ConditionToJSON)),
        'hosts': ((value.hosts as Array<any>).map(ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatusToJSON)),
        'observedGeneration': value.observedGeneration,
        'vni': value.vni,
    };
}

