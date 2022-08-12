// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { IoK8sApimachineryPkgApisMetaV1APIGroup } from '../models/IoK8sApimachineryPkgApisMetaV1APIGroup';

/**
 * no description
 */
export class CoreOrdiriComApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * get information of a group
     */
    public async getCoreOrdiriComAPIGroup(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/apis/core.ordiri.com/';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class CoreOrdiriComApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getCoreOrdiriComAPIGroup
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getCoreOrdiriComAPIGroup(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1APIGroup = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1APIGroup", ""
            ) as IoK8sApimachineryPkgApisMetaV1APIGroup;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1APIGroup = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1APIGroup", ""
            ) as IoK8sApimachineryPkgApisMetaV1APIGroup;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
