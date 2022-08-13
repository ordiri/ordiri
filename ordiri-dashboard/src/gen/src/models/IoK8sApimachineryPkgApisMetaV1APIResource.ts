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
 * APIResource specifies the name of a resource and whether it is namespaced.
 * @export
 * @interface IoK8sApimachineryPkgApisMetaV1APIResource
 */
export interface IoK8sApimachineryPkgApisMetaV1APIResource {
    /**
     * categories is a list of the grouped resources this resource belongs to (e.g. 'all')
     * @type {Array<string>}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    categories?: Array<string>;
    /**
     * group is the preferred group of the resource.  Empty implies the group of the containing resource list. For subresources, this may have a different value, for example: Scale".
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    group?: string;
    /**
     * kind is the kind for the resource (e.g. 'Foo' is the kind for a resource 'foo')
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    kind: string;
    /**
     * name is the plural name of the resource.
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    name: string;
    /**
     * namespaced indicates if a resource is namespaced or not.
     * @type {boolean}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    namespaced: boolean;
    /**
     * shortNames is a list of suggested short names of the resource.
     * @type {Array<string>}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    shortNames?: Array<string>;
    /**
     * singularName is the singular name of the resource.  This allows clients to handle plural and singular opaquely. The singularName is more correct for reporting status on a single item and both singular and plural are allowed from the kubectl CLI interface.
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    singularName: string;
    /**
     * The hash value of the storage version, the version this resource is converted to when written to the data store. Value must be treated as opaque by clients. Only equality comparison on the value is valid. This is an alpha feature and may change or be removed in the future. The field is populated by the apiserver only if the StorageVersionHash feature gate is enabled. This field will remain optional even if it graduates.
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    storageVersionHash?: string;
    /**
     * verbs is a list of supported kube verbs (this includes get, list, watch, create, update, patch, delete, deletecollection, and proxy)
     * @type {Array<string>}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    verbs: Array<string>;
    /**
     * version is the preferred version of the resource.  Empty implies the version of the containing resource list For subresources, this may have a different value, for example: v1 (while inside a v1beta1 version of the core resource's group)".
     * @type {string}
     * @memberof IoK8sApimachineryPkgApisMetaV1APIResource
     */
    version?: string;
}

/**
 * Check if a given object implements the IoK8sApimachineryPkgApisMetaV1APIResource interface.
 */
export function instanceOfIoK8sApimachineryPkgApisMetaV1APIResource(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "kind" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "namespaced" in value;
    isInstance = isInstance && "singularName" in value;
    isInstance = isInstance && "verbs" in value;

    return isInstance;
}

export function IoK8sApimachineryPkgApisMetaV1APIResourceFromJSON(json: any): IoK8sApimachineryPkgApisMetaV1APIResource {
    return IoK8sApimachineryPkgApisMetaV1APIResourceFromJSONTyped(json, false);
}

export function IoK8sApimachineryPkgApisMetaV1APIResourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): IoK8sApimachineryPkgApisMetaV1APIResource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'categories': !exists(json, 'categories') ? undefined : json['categories'],
        'group': !exists(json, 'group') ? undefined : json['group'],
        'kind': json['kind'],
        'name': json['name'],
        'namespaced': json['namespaced'],
        'shortNames': !exists(json, 'shortNames') ? undefined : json['shortNames'],
        'singularName': json['singularName'],
        'storageVersionHash': !exists(json, 'storageVersionHash') ? undefined : json['storageVersionHash'],
        'verbs': json['verbs'],
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}

export function IoK8sApimachineryPkgApisMetaV1APIResourceToJSON(value?: IoK8sApimachineryPkgApisMetaV1APIResource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'categories': value.categories,
        'group': value.group,
        'kind': value.kind,
        'name': value.name,
        'namespaced': value.namespaced,
        'shortNames': value.shortNames,
        'singularName': value.singularName,
        'storageVersionHash': value.storageVersionHash,
        'verbs': value.verbs,
        'version': value.version,
    };
}

