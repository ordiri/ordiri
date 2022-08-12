// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList';
import { IoK8sApimachineryPkgApisMetaV1APIResourceList } from '../models/IoK8sApimachineryPkgApisMetaV1APIResourceList';
import { IoK8sApimachineryPkgApisMetaV1DeleteOptions } from '../models/IoK8sApimachineryPkgApisMetaV1DeleteOptions';
import { IoK8sApimachineryPkgApisMetaV1Status } from '../models/IoK8sApimachineryPkgApisMetaV1Status';
import { IoK8sApimachineryPkgApisMetaV1WatchEvent } from '../models/IoK8sApimachineryPkgApisMetaV1WatchEvent';

/**
 * no description
 */
export class ComputeOrdiriComV1alpha1ApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * create a VirtualMachine
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createComputeOrdiriComV1alpha1VirtualMachine(body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "createComputeOrdiriComV1alpha1VirtualMachine", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines';

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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""),
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
     * create a VirtualMachineDeployment
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createComputeOrdiriComV1alpha1VirtualMachineDeployment(body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "createComputeOrdiriComV1alpha1VirtualMachineDeployment", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments';

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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""),
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
     * create a VirtualMachineReplicaSet
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "createComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets';

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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""),
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
     * delete collection of VirtualMachine
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
    public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(pretty?: string, _continue?: string, dryRun?: string, fieldSelector?: string, gracePeriodSeconds?: number, labelSelector?: string, limit?: number, orphanDependents?: boolean, propagationPolicy?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;














        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines';

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
     * delete collection of VirtualMachineDeployment
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
    public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(pretty?: string, _continue?: string, dryRun?: string, fieldSelector?: string, gracePeriodSeconds?: number, labelSelector?: string, limit?: number, orphanDependents?: boolean, propagationPolicy?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;














        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments';

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
     * delete collection of VirtualMachineReplicaSet
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
    public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(pretty?: string, _continue?: string, dryRun?: string, fieldSelector?: string, gracePeriodSeconds?: number, labelSelector?: string, limit?: number, orphanDependents?: boolean, propagationPolicy?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;














        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets';

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
     * delete a VirtualMachine
     * @param name name of the VirtualMachine
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param body 
     */
    public async deleteComputeOrdiriComV1alpha1VirtualMachine(name: string, pretty?: string, dryRun?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "deleteComputeOrdiriComV1alpha1VirtualMachine", "name");
        }








        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}'
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
     * delete a VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param body 
     */
    public async deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(name: string, pretty?: string, dryRun?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "deleteComputeOrdiriComV1alpha1VirtualMachineDeployment", "name");
        }








        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}'
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
     * delete a VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @param body 
     */
    public async deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(name: string, pretty?: string, dryRun?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "name");
        }








        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}'
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
    public async getComputeOrdiriComV1alpha1APIResources(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/';

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
     * list or watch objects of kind VirtualMachine
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
    public async listComputeOrdiriComV1alpha1VirtualMachine(pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines';

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
     * list or watch objects of kind VirtualMachineDeployment
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
    public async listComputeOrdiriComV1alpha1VirtualMachineDeployment(pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments';

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
     * list or watch objects of kind VirtualMachineReplicaSet
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
    public async listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets';

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
     * partially update the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachine(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachine", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachine", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}'
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
     * partially update the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachineDeployment(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineDeployment", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineDeployment", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}'
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
     * partially update status of the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}/status'
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
     * partially update the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}'
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
     * partially update status of the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}/status'
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
     * partially update status of the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchComputeOrdiriComV1alpha1VirtualMachineStatus(name: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "patchComputeOrdiriComV1alpha1VirtualMachineStatus", "body");
        }






        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}/status'
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
     * read the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachine(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachine", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}'
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
     * read the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachineDeployment(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachineDeployment", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}'
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
     * read status of the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}/status'
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
     * read the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}'
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
     * read status of the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}/status'
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
     * read status of the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     */
    public async readComputeOrdiriComV1alpha1VirtualMachineStatus(name: string, pretty?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "readComputeOrdiriComV1alpha1VirtualMachineStatus", "name");
        }



        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}/status'
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
     * replace the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachine(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachine", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachine", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""),
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
     * replace the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineDeployment", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineDeployment", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""),
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
     * replace status of the specified VirtualMachineDeployment
     * @param name name of the VirtualMachineDeployment
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinedeployments/{name}/status'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""),
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
     * replace the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""),
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
     * replace status of the specified VirtualMachineReplicaSet
     * @param name name of the VirtualMachineReplicaSet
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachinereplicasets/{name}/status'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""),
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
     * replace status of the specified VirtualMachine
     * @param name name of the VirtualMachine
     * @param body 
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceComputeOrdiriComV1alpha1VirtualMachineStatus(name: string, body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "replaceComputeOrdiriComV1alpha1VirtualMachineStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/virtualmachines/{name}/status'
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
            ObjectSerializer.serialize(body, "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""),
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
     * watch changes to an object of kind VirtualMachine. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param name name of the VirtualMachine
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
    public async watchComputeOrdiriComV1alpha1VirtualMachine(name: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "watchComputeOrdiriComV1alpha1VirtualMachine", "name");
        }












        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachines/{name}'
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
     * watch changes to an object of kind VirtualMachineDeployment. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param name name of the VirtualMachineDeployment
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
    public async watchComputeOrdiriComV1alpha1VirtualMachineDeployment(name: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "watchComputeOrdiriComV1alpha1VirtualMachineDeployment", "name");
        }












        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachinedeployments/{name}'
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
     * watch individual changes to a list of VirtualMachineDeployment. deprecated: use the 'watch' parameter with a list operation instead.
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
    public async watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachinedeployments';

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
     * watch individual changes to a list of VirtualMachine. deprecated: use the 'watch' parameter with a list operation instead.
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
    public async watchComputeOrdiriComV1alpha1VirtualMachineList(allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachines';

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
     * watch changes to an object of kind VirtualMachineReplicaSet. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param name name of the VirtualMachineReplicaSet
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
    public async watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(name: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("ComputeOrdiriComV1alpha1Api", "watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet", "name");
        }












        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachinereplicasets/{name}'
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
     * watch individual changes to a list of VirtualMachineReplicaSet. deprecated: use the 'watch' parameter with a list operation instead.
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
    public async watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;











        // Path Params
        const localVarPath = '/apis/compute.ordiri.com/v1alpha1/watch/virtualmachinereplicasets';

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

export class ComputeOrdiriComV1alpha1ApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("202", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1Status > {
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
     * @params response Response returned by the server for a request to getComputeOrdiriComV1alpha1APIResources
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getComputeOrdiriComV1alpha1APIResources(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList > {
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
     * @params response Response returned by the server for a request to listComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchComputeOrdiriComV1alpha1VirtualMachineStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchComputeOrdiriComV1alpha1VirtualMachineStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to readComputeOrdiriComV1alpha1VirtualMachineStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async readComputeOrdiriComV1alpha1VirtualMachineStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceComputeOrdiriComV1alpha1VirtualMachineStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceComputeOrdiriComV1alpha1VirtualMachineStatus(response: ResponseContext): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine", ""
            ) as ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachine
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachine(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachineDeployment
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachineDeployment(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachineList
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachineList(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
     * @params response Response returned by the server for a request to watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(response: ResponseContext): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent > {
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
