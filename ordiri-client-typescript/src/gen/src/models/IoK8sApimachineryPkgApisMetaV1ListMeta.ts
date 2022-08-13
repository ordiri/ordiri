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
/**
 * ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
 * @export
 * @interface IoK8sApimachineryPkgApisMetaV1ListMeta
 */
export interface IoK8sApimachineryPkgApisMetaV1ListMeta {
    /**
     * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1ListMeta
     */
    _continue?: string;
    /**
     * remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
     * @type {number}
     * @memberof IoK8sApimachineryPkgApisMetaV1ListMeta
     */
    remainingItemCount?: number;
    /**
     * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1ListMeta
     */
    resourceVersion?: string;
    /**
     * Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1ListMeta
     */
    selfLink?: string;
}

/**
 * Check if a given object implements the IoK8sApimachineryPkgApisMetaV1ListMeta interface.
 */
export function instanceOfIoK8sApimachineryPkgApisMetaV1ListMeta(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function IoK8sApimachineryPkgApisMetaV1ListMetaFromJSON(json: any): IoK8sApimachineryPkgApisMetaV1ListMeta {
    return IoK8sApimachineryPkgApisMetaV1ListMetaFromJSONTyped(json, false);
}

export function IoK8sApimachineryPkgApisMetaV1ListMetaFromJSONTyped(json: any, ignoreDiscriminator: boolean): IoK8sApimachineryPkgApisMetaV1ListMeta {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_continue': !exists(json, 'continue') ? undefined : json['continue'],
        'remainingItemCount': !exists(json, 'remainingItemCount') ? undefined : json['remainingItemCount'],
        'resourceVersion': !exists(json, 'resourceVersion') ? undefined : json['resourceVersion'],
        'selfLink': !exists(json, 'selfLink') ? undefined : json['selfLink'],
    };
}

export function IoK8sApimachineryPkgApisMetaV1ListMetaToJSON(value?: IoK8sApimachineryPkgApisMetaV1ListMeta | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'continue': value._continue,
        'remainingItemCount': value.remainingItemCount,
        'resourceVersion': value.resourceVersion,
        'selfLink': value.selfLink,
    };
}

