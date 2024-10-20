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


import * as runtime from '../runtime';
import type {
  IoK8sApimachineryPkgApisMetaV1APIGroup,
} from '../models';
import {
    IoK8sApimachineryPkgApisMetaV1APIGroupFromJSON,
    IoK8sApimachineryPkgApisMetaV1APIGroupToJSON,
} from '../models';

/**
 * 
 */
export class StorageOrdiriComApi extends runtime.BaseAPI {

    /**
     * get information of a group
     */
    async getStorageOrdiriComAPIGroupRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<IoK8sApimachineryPkgApisMetaV1APIGroup>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/apis/storage.ordiri.com/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => IoK8sApimachineryPkgApisMetaV1APIGroupFromJSON(jsonValue));
    }

    /**
     * get information of a group
     */
    async getStorageOrdiriComAPIGroup(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
        const response = await this.getStorageOrdiriComAPIGroupRaw(initOverrides);
        return await response.value();
    }

}
