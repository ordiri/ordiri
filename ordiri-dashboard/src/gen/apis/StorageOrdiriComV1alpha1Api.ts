// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList';
import { IoK8sApimachineryPkgApisMetaV1APIResourceList } from '../models/IoK8sApimachineryPkgApisMetaV1APIResourceList';
import { IoK8sApimachineryPkgApisMetaV1DeleteOptions } from '../models/IoK8sApimachineryPkgApisMetaV1DeleteOptions';
import { IoK8sApimachineryPkgApisMetaV1Status } from '../models/IoK8sApimachineryPkgApisMetaV1Status';
import { IoK8sApimachineryPkgApisMetaV1WatchEvent } from '../models/IoK8sApimachineryPkgApisMetaV1WatchEvent';

/**
 * no description
 */
export class StorageOrdiriComV1alpha1ApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * create a Volume
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createStorageOrdiriComV1alpha1Volume(body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "createStorageOrdiriComV1alpha1Volume", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * create a VolumeClaim
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createStorageOrdiriComV1alpha1VolumeClaim(body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "createStorageOrdiriComV1alpha1VolumeClaim", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * delete collection of Volume
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param body 
     */
    public async deleteStorageOrdiriComV1alpha1CollectionVolume(pretty?: string, _continue?: string, dryRun?: string, fieldSelector?: string, gracePeriodSeconds?: number, labelSelector?: string, limit?: number, orphanDependents?: boolean, propagationPolicy?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;














        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "IoK8sApimachineryPkgApisMetaV1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * delete collection of VolumeClaim
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param body 
     */
    public async deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(pretty?: string, _continue?: string, dryRun?: string, fieldSelector?: string, gracePeriodSeconds?: number, labelSelector?: string, limit?: number, orphanDependents?: boolean, propagationPolicy?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;














        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "IoK8sApimachineryPkgApisMetaV1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * delete a Volume
     * @param name name of the Volume
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param body 
     */
    public async deleteStorageOrdiriComV1alpha1Volume(name: string, pretty?: string, dryRun?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "deleteStorageOrdiriComV1alpha1Volume", "name");
        }








        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "IoK8sApimachineryPkgApisMetaV1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * delete a VolumeClaim
     * @param name name of the VolumeClaim
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param body 
     */
    public async deleteStorageOrdiriComV1alpha1VolumeClaim(name: string, pretty?: string, dryRun?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "deleteStorageOrdiriComV1alpha1VolumeClaim", "name");
        }








        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "IoK8sApimachineryPkgApisMetaV1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * get available resources
     */
    public async getStorageOrdiriComV1alpha1APIResources(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * list or watch objects of kind Volume
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async listStorageOrdiriComV1alpha1Volume(pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * list or watch objects of kind VolumeClaim
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async listStorageOrdiriComV1alpha1VolumeClaim(pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update the specified Volume
     * @param name name of the Volume
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchStorageOrdiriComV1alpha1Volume(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1Volume", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1Volume", "body");
        }






        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/strategic-merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchStorageOrdiriComV1alpha1VolumeClaim(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeClaim", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeClaim", "body");
        }






        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/strategic-merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update status of the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchStorageOrdiriComV1alpha1VolumeClaimStatus(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeClaimStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeClaimStatus", "body");
        }






        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/strategic-merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update status of the specified Volume
     * @param name name of the Volume
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchStorageOrdiriComV1alpha1VolumeStatus(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "patchStorageOrdiriComV1alpha1VolumeStatus", "body");
        }






        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/strategic-merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read the specified Volume
     * @param name name of the Volume
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readStorageOrdiriComV1alpha1Volume(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "readStorageOrdiriComV1alpha1Volume", "name");
        }



        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readStorageOrdiriComV1alpha1VolumeClaim(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "readStorageOrdiriComV1alpha1VolumeClaim", "name");
        }



        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read status of the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readStorageOrdiriComV1alpha1VolumeClaimStatus(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "readStorageOrdiriComV1alpha1VolumeClaimStatus", "name");
        }



        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read status of the specified Volume
     * @param name name of the Volume
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readStorageOrdiriComV1alpha1VolumeStatus(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "readStorageOrdiriComV1alpha1VolumeStatus", "name");
        }



        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace the specified Volume
     * @param name name of the Volume
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceStorageOrdiriComV1alpha1Volume(name: string, body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1Volume", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1Volume", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceStorageOrdiriComV1alpha1VolumeClaim(name: string, body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeClaim", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeClaim", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace status of the specified VolumeClaim
     * @param name name of the VolumeClaim
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceStorageOrdiriComV1alpha1VolumeClaimStatus(name: string, body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeClaimStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeClaimStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumeclaims/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace status of the specified Volume
     * @param name name of the Volume
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceStorageOrdiriComV1alpha1VolumeStatus(name: string, body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "replaceStorageOrdiriComV1alpha1VolumeStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/volumes/{name}/status'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * watch changes to an object of kind Volume. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param name name of the Volume
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async watchStorageOrdiriComV1alpha1Volume(name: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "watchStorageOrdiriComV1alpha1Volume", "name");
        }












        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/watch/volumes/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * watch changes to an object of kind VolumeClaim. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param name name of the VolumeClaim
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async watchStorageOrdiriComV1alpha1VolumeClaim(name: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("StorageOrdiriComV1alpha1Api", "watchStorageOrdiriComV1alpha1VolumeClaim", "name");
        }












        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/watch/volumeclaims/{name}'
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * watch individual changes to a list of VolumeClaim. deprecated: use the 'watch' parameter with a list operation instead.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async watchStorageOrdiriComV1alpha1VolumeClaimList(allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/watch/volumeclaims';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * watch individual changes to a list of Volume. deprecated: use the 'watch' parameter with a list operation instead.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param resourceVersion resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     */
    public async watchStorageOrdiriComV1alpha1VolumeList(allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/storage.ordiri.com/v1alpha1/watch/volumes';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class StorageOrdiriComV1alpha1ApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteStorageOrdiriComV1alpha1CollectionVolume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteStorageOrdiriComV1alpha1CollectionVolume(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1Status = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1Status", ""
            ) as IoK8sApimachineryPkgApisMetaV1Status;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getStorageOrdiriComV1alpha1APIResources
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getStorageOrdiriComV1alpha1APIResources(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1APIResourceList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1APIResourceList", ""
            ) as IoK8sApimachineryPkgApisMetaV1APIResourceList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1APIResourceList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1APIResourceList", ""
            ) as IoK8sApimachineryPkgApisMetaV1APIResourceList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchStorageOrdiriComV1alpha1VolumeClaimStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchStorageOrdiriComV1alpha1VolumeClaimStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchStorageOrdiriComV1alpha1VolumeStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchStorageOrdiriComV1alpha1VolumeStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readStorageOrdiriComV1alpha1VolumeClaimStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readStorageOrdiriComV1alpha1VolumeClaimStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readStorageOrdiriComV1alpha1VolumeStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readStorageOrdiriComV1alpha1VolumeStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceStorageOrdiriComV1alpha1VolumeClaimStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceStorageOrdiriComV1alpha1VolumeClaimStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceStorageOrdiriComV1alpha1VolumeStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceStorageOrdiriComV1alpha1VolumeStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume", ""
            ) as ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to watchStorageOrdiriComV1alpha1Volume
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchStorageOrdiriComV1alpha1Volume(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to watchStorageOrdiriComV1alpha1VolumeClaim
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchStorageOrdiriComV1alpha1VolumeClaim(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to watchStorageOrdiriComV1alpha1VolumeClaimList
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchStorageOrdiriComV1alpha1VolumeClaimList(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to watchStorageOrdiriComV1alpha1VolumeList
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchStorageOrdiriComV1alpha1VolumeList(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: IoK8sApimachineryPkgApisMetaV1WatchEvent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "IoK8sApimachineryPkgApisMetaV1WatchEvent", ""
            ) as IoK8sApimachineryPkgApisMetaV1WatchEvent;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
