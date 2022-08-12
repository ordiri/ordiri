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

import { RequestFile } from './models';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment } from './comGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment';
import { V1ListMeta } from './v1ListMeta';

/**
* VirtualMachineDeploymentList
*/
export class ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList {
    /**
    * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
    */
    'apiVersion'?: string;
    'items': Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment>;
    /**
    * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
    */
    'kind'?: string;
    'metadata'?: V1ListMeta;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "apiVersion",
            "baseName": "apiVersion",
            "type": "string"
        },
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment>"
        },
        {
            "name": "kind",
            "baseName": "kind",
            "type": "string"
        },
        {
            "name": "metadata",
            "baseName": "metadata",
            "type": "V1ListMeta"
        }    ];

    static getAttributeTypeMap() {
        return ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList.attributeTypeMap;
    }
}

