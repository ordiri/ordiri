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
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDevice } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDevice';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDeviceFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDeviceFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDeviceToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDevice';
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus';
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus';
import type { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus } from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus';
import {
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSON,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSONTyped,
    ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusToJSON,
} from './ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus';

/**
 * NodeStatus defines the observed state of Node
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus {
    /**
     * 
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
     */
    cephSecretUuid: string;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDevice>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
     */
    devices: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDevice>;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
     */
    networks: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus>;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
     */
    subnets: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus>;
    /**
     * 
     * @type {Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus>}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus
     */
    virtualMachines: Array<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus>;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cephSecretUuid" in value;
    isInstance = isInstance && "devices" in value;
    isInstance = isInstance && "networks" in value;
    isInstance = isInstance && "subnets" in value;
    isInstance = isInstance && "virtualMachines" in value;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cephSecretUuid': json['cephSecretUuid'],
        'devices': ((json['devices'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDeviceFromJSON)),
        'networks': ((json['networks'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatusFromJSON)),
        'subnets': ((json['subnets'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatusFromJSON)),
        'virtualMachines': ((json['virtualMachines'] as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSON)),
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cephSecretUuid': value.cephSecretUuid,
        'devices': ((value.devices as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeDeviceToJSON)),
        'networks': ((value.networks as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatusToJSON)),
        'subnets': ((value.subnets as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatusToJSON)),
        'virtualMachines': ((value.virtualMachines as Array<any>).map(ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusToJSON)),
    };
}

