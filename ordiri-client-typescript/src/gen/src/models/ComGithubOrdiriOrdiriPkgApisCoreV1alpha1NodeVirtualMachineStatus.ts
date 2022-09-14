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
 * 
 * @export
 * @interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
 */
export interface ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus {
    /**
     * API version of the referent.
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    apiVersion?: string;
    /**
     * If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    fieldPath?: string;
    /**
     * Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    kind?: string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    name?: string;
    /**
     * Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    namespace?: string;
    /**
     * Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    resourceVersion?: string;
    /**
     * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
     * @type {string}
     * @memberof ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus
     */
    uid?: string;
}

/**
 * Check if a given object implements the ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus interface.
 */
export function instanceOfComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSON(json: any): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus {
    return ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSONTyped(json, false);
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'fieldPath': !exists(json, 'fieldPath') ? undefined : json['fieldPath'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'namespace': !exists(json, 'namespace') ? undefined : json['namespace'],
        'resourceVersion': !exists(json, 'resourceVersion') ? undefined : json['resourceVersion'],
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
    };
}

export function ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatusToJSON(value?: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'fieldPath': value.fieldPath,
        'kind': value.kind,
        'name': value.name,
        'namespace': value.namespace,
        'resourceVersion': value.resourceVersion,
        'uid': value.uid,
    };
}
