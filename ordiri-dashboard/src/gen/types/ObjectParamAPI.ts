import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1HostLocalVolumeClaim } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1HostLocalVolumeClaim';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentSpec } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentSpec';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterfaceStatus } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterfaceStatus';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeStatus } from '../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeStatus';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSpec } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSpec';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus } from '../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSelector } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSelector';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSelector } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSelector';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSubnetReference } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSubnetReference';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus } from '../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList';
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec } from '../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec';
import { IoK8sApiCoreV1ObjectReference } from '../models/IoK8sApiCoreV1ObjectReference';
import { IoK8sApimachineryPkgApisMetaV1APIGroup } from '../models/IoK8sApimachineryPkgApisMetaV1APIGroup';
import { IoK8sApimachineryPkgApisMetaV1APIGroupList } from '../models/IoK8sApimachineryPkgApisMetaV1APIGroupList';
import { IoK8sApimachineryPkgApisMetaV1APIResource } from '../models/IoK8sApimachineryPkgApisMetaV1APIResource';
import { IoK8sApimachineryPkgApisMetaV1APIResourceList } from '../models/IoK8sApimachineryPkgApisMetaV1APIResourceList';
import { IoK8sApimachineryPkgApisMetaV1Condition } from '../models/IoK8sApimachineryPkgApisMetaV1Condition';
import { IoK8sApimachineryPkgApisMetaV1DeleteOptions } from '../models/IoK8sApimachineryPkgApisMetaV1DeleteOptions';
import { IoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery } from '../models/IoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery';
import { IoK8sApimachineryPkgApisMetaV1ListMeta } from '../models/IoK8sApimachineryPkgApisMetaV1ListMeta';
import { IoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry } from '../models/IoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry';
import { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from '../models/IoK8sApimachineryPkgApisMetaV1ObjectMeta';
import { IoK8sApimachineryPkgApisMetaV1OwnerReference } from '../models/IoK8sApimachineryPkgApisMetaV1OwnerReference';
import { IoK8sApimachineryPkgApisMetaV1Preconditions } from '../models/IoK8sApimachineryPkgApisMetaV1Preconditions';
import { IoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR } from '../models/IoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR';
import { IoK8sApimachineryPkgApisMetaV1Status } from '../models/IoK8sApimachineryPkgApisMetaV1Status';
import { IoK8sApimachineryPkgApisMetaV1StatusCause } from '../models/IoK8sApimachineryPkgApisMetaV1StatusCause';
import { IoK8sApimachineryPkgApisMetaV1StatusDetails } from '../models/IoK8sApimachineryPkgApisMetaV1StatusDetails';
import { IoK8sApimachineryPkgApisMetaV1WatchEvent } from '../models/IoK8sApimachineryPkgApisMetaV1WatchEvent';
import { IoK8sApimachineryPkgVersionInfo } from '../models/IoK8sApimachineryPkgVersionInfo';

import { ObservableApisApi } from "./ObservableAPI";
import { ApisApiRequestFactory, ApisApiResponseProcessor} from "../apis/ApisApi";

export interface ApisApiGetAPIVersionsRequest {
}

export class ObjectApisApi {
    private api: ObservableApisApi

    public constructor(configuration: Configuration, requestFactory?: ApisApiRequestFactory, responseProcessor?: ApisApiResponseProcessor) {
        this.api = new ObservableApisApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get available API versions
     * @param param the request object
     */
    public getAPIVersions(param: ApisApiGetAPIVersionsRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIGroupList> {
        return this.api.getAPIVersions( options).toPromise();
    }

}

import { ObservableComputeOrdiriComApi } from "./ObservableAPI";
import { ComputeOrdiriComApiRequestFactory, ComputeOrdiriComApiResponseProcessor} from "../apis/ComputeOrdiriComApi";

export interface ComputeOrdiriComApiGetComputeOrdiriComAPIGroupRequest {
}

export class ObjectComputeOrdiriComApi {
    private api: ObservableComputeOrdiriComApi

    public constructor(configuration: Configuration, requestFactory?: ComputeOrdiriComApiRequestFactory, responseProcessor?: ComputeOrdiriComApiResponseProcessor) {
        this.api = new ObservableComputeOrdiriComApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get information of a group
     * @param param the request object
     */
    public getComputeOrdiriComAPIGroup(param: ComputeOrdiriComApiGetComputeOrdiriComAPIGroupRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
        return this.api.getComputeOrdiriComAPIGroup( options).toPromise();
    }

}

import { ObservableComputeOrdiriComV1alpha1Api } from "./ObservableAPI";
import { ComputeOrdiriComV1alpha1ApiRequestFactory, ComputeOrdiriComV1alpha1ApiResponseProcessor} from "../apis/ComputeOrdiriComV1alpha1Api";

export interface ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachine
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachine
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApicreateComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachine
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeploymentRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSetRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachine
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof ComputeOrdiriComV1alpha1ApideleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface ComputeOrdiriComV1alpha1ApiGetComputeOrdiriComV1alpha1APIResourcesRequest {
}

export interface ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachine
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApilistComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachine
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineStatusRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApipatchComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    force?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachine
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineStatusRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireadComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    pretty?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachine
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachine
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachine
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineStatusRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApireplaceComputeOrdiriComV1alpha1VirtualMachineStatus
     */
    fieldManager?: string
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineRequest {
    /**
     * name of the VirtualMachine
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachine
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest {
    /**
     * name of the VirtualMachineDeployment
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeployment
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineDeploymentListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineDeploymentList
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineList
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest {
    /**
     * name of the VirtualMachineReplicaSet
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSet
     */
    watch?: boolean
}

export interface ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof ComputeOrdiriComV1alpha1ApiwatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList
     */
    watch?: boolean
}

export class ObjectComputeOrdiriComV1alpha1Api {
    private api: ObservableComputeOrdiriComV1alpha1Api

    public constructor(configuration: Configuration, requestFactory?: ComputeOrdiriComV1alpha1ApiRequestFactory, responseProcessor?: ComputeOrdiriComV1alpha1ApiResponseProcessor) {
        this.api = new ObservableComputeOrdiriComV1alpha1Api(configuration, requestFactory, responseProcessor);
    }

    /**
     * create a VirtualMachine
     * @param param the request object
     */
    public createComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.createComputeOrdiriComV1alpha1VirtualMachine(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a VirtualMachineDeployment
     * @param param the request object
     */
    public createComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.createComputeOrdiriComV1alpha1VirtualMachineDeployment(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a VirtualMachineReplicaSet
     * @param param the request object
     */
    public createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiCreateComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * delete collection of VirtualMachine
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of VirtualMachineDeployment
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeploymentRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of VirtualMachineReplicaSet
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSetRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete a VirtualMachine
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1VirtualMachine(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a VirtualMachineDeployment
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a VirtualMachineReplicaSet
     * @param param the request object
     */
    public deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiDeleteComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * get available resources
     * @param param the request object
     */
    public getComputeOrdiriComV1alpha1APIResources(param: ComputeOrdiriComV1alpha1ApiGetComputeOrdiriComV1alpha1APIResourcesRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
        return this.api.getComputeOrdiriComV1alpha1APIResources( options).toPromise();
    }

    /**
     * list or watch objects of kind VirtualMachine
     * @param param the request object
     */
    public listComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList> {
        return this.api.listComputeOrdiriComV1alpha1VirtualMachine(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind VirtualMachineDeployment
     * @param param the request object
     */
    public listComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList> {
        return this.api.listComputeOrdiriComV1alpha1VirtualMachineDeployment(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind VirtualMachineReplicaSet
     * @param param the request object
     */
    public listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiListComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList> {
        return this.api.listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * partially update the specified VirtualMachine
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachine(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified VirtualMachineDeployment
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachineDeployment(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified VirtualMachineDeployment
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified VirtualMachine
     * @param param the request object
     */
    public patchComputeOrdiriComV1alpha1VirtualMachineStatus(param: ComputeOrdiriComV1alpha1ApiPatchComputeOrdiriComV1alpha1VirtualMachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.patchComputeOrdiriComV1alpha1VirtualMachineStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * read the specified VirtualMachine
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachine(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified VirtualMachineDeployment
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachineDeployment(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified VirtualMachineDeployment
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified VirtualMachine
     * @param param the request object
     */
    public readComputeOrdiriComV1alpha1VirtualMachineStatus(param: ComputeOrdiriComV1alpha1ApiReadComputeOrdiriComV1alpha1VirtualMachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.readComputeOrdiriComV1alpha1VirtualMachineStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * replace the specified VirtualMachine
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachine(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified VirtualMachineDeployment
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified VirtualMachineDeployment
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified VirtualMachineReplicaSet
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified VirtualMachine
     * @param param the request object
     */
    public replaceComputeOrdiriComV1alpha1VirtualMachineStatus(param: ComputeOrdiriComV1alpha1ApiReplaceComputeOrdiriComV1alpha1VirtualMachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
        return this.api.replaceComputeOrdiriComV1alpha1VirtualMachineStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * watch changes to an object of kind VirtualMachine. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachine(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachine(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind VirtualMachineDeployment. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachineDeployment(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineDeploymentRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachineDeployment(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of VirtualMachineDeployment. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineDeploymentListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of VirtualMachine. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachineList(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachineList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind VirtualMachineReplicaSet. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of VirtualMachineReplicaSet. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(param: ComputeOrdiriComV1alpha1ApiWatchComputeOrdiriComV1alpha1VirtualMachineReplicaSetListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

}

import { ObservableCoreOrdiriComApi } from "./ObservableAPI";
import { CoreOrdiriComApiRequestFactory, CoreOrdiriComApiResponseProcessor} from "../apis/CoreOrdiriComApi";

export interface CoreOrdiriComApiGetCoreOrdiriComAPIGroupRequest {
}

export class ObjectCoreOrdiriComApi {
    private api: ObservableCoreOrdiriComApi

    public constructor(configuration: Configuration, requestFactory?: CoreOrdiriComApiRequestFactory, responseProcessor?: CoreOrdiriComApiResponseProcessor) {
        this.api = new ObservableCoreOrdiriComApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get information of a group
     * @param param the request object
     */
    public getCoreOrdiriComAPIGroup(param: CoreOrdiriComApiGetCoreOrdiriComAPIGroupRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
        return this.api.getCoreOrdiriComAPIGroup( options).toPromise();
    }

}

import { ObservableCoreOrdiriComV1alpha1Api } from "./ObservableAPI";
import { CoreOrdiriComV1alpha1ApiRequestFactory, CoreOrdiriComV1alpha1ApiResponseProcessor} from "../apis/CoreOrdiriComV1alpha1Api";

export interface CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1MachineRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Machine
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Machine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Machine
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1MachineProfile
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1MachineProfile
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1MachineProfile
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1NodeRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Node
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Node
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApicreateCoreOrdiriComV1alpha1Node
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionMachineRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachine
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionMachineProfileRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionMachineProfile
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionNodeRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1CollectionNode
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1MachineRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Machine
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1MachineProfile
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1NodeRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof CoreOrdiriComV1alpha1ApideleteCoreOrdiriComV1alpha1Node
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface CoreOrdiriComV1alpha1ApiGetCoreOrdiriComV1alpha1APIResourcesRequest {
}

export interface CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1MachineRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Machine
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1MachineProfile
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1NodeRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApilistCoreOrdiriComV1alpha1Node
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Machine
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfile
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineProfileStatusRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineProfileStatus
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineReviewRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineReview
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineStatusRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1MachineStatus
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1NodeRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1Node
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1NodeStatusRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApipatchCoreOrdiriComV1alpha1NodeStatus
     */
    force?: boolean
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1Machine
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineProfile
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineProfileStatusRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineProfileStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineProfileStatus
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineReviewRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineReview
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineReview
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineStatusRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1MachineStatus
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1NodeRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1Node
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1Node
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1NodeStatusRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1NodeStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireadCoreOrdiriComV1alpha1NodeStatus
     */
    pretty?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Machine
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Machine
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Machine
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Machine
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfile
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfile
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfile
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfile
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineProfileStatusRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfileStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfileStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfileStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfileStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineProfileStatus
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineReviewRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineReview
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineReview
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineReview
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineReview
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineReview
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineStatusRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1MachineStatus
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1NodeRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Node
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Node
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Node
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1Node
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1NodeStatusRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1NodeStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1NodeStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1NodeStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1NodeStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApireplaceCoreOrdiriComV1alpha1NodeStatus
     */
    fieldManager?: string
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineRequest {
    /**
     * name of the Machine
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Machine
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineList
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineProfileRequest {
    /**
     * name of the MachineProfile
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfile
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineProfileListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1MachineProfileList
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1NodeRequest {
    /**
     * name of the Node
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1Node
     */
    watch?: boolean
}

export interface CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1NodeListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof CoreOrdiriComV1alpha1ApiwatchCoreOrdiriComV1alpha1NodeList
     */
    watch?: boolean
}

export class ObjectCoreOrdiriComV1alpha1Api {
    private api: ObservableCoreOrdiriComV1alpha1Api

    public constructor(configuration: Configuration, requestFactory?: CoreOrdiriComV1alpha1ApiRequestFactory, responseProcessor?: CoreOrdiriComV1alpha1ApiResponseProcessor) {
        this.api = new ObservableCoreOrdiriComV1alpha1Api(configuration, requestFactory, responseProcessor);
    }

    /**
     * create a Machine
     * @param param the request object
     */
    public createCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.createCoreOrdiriComV1alpha1Machine(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a MachineProfile
     * @param param the request object
     */
    public createCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.createCoreOrdiriComV1alpha1MachineProfile(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a Node
     * @param param the request object
     */
    public createCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiCreateCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.createCoreOrdiriComV1alpha1Node(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * delete collection of Machine
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1CollectionMachine(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionMachineRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1CollectionMachine(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of MachineProfile
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1CollectionMachineProfile(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionMachineProfileRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1CollectionMachineProfile(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of Node
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1CollectionNode(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1CollectionNodeRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1CollectionNode(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete a Machine
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1Machine(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a MachineProfile
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1MachineProfile(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a Node
     * @param param the request object
     */
    public deleteCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiDeleteCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteCoreOrdiriComV1alpha1Node(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * get available resources
     * @param param the request object
     */
    public getCoreOrdiriComV1alpha1APIResources(param: CoreOrdiriComV1alpha1ApiGetCoreOrdiriComV1alpha1APIResourcesRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
        return this.api.getCoreOrdiriComV1alpha1APIResources( options).toPromise();
    }

    /**
     * list or watch objects of kind Machine
     * @param param the request object
     */
    public listCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1MachineRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList> {
        return this.api.listCoreOrdiriComV1alpha1Machine(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind MachineProfile
     * @param param the request object
     */
    public listCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1MachineProfileRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList> {
        return this.api.listCoreOrdiriComV1alpha1MachineProfile(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind Node
     * @param param the request object
     */
    public listCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiListCoreOrdiriComV1alpha1NodeRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList> {
        return this.api.listCoreOrdiriComV1alpha1Node(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * partially update the specified Machine
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.patchCoreOrdiriComV1alpha1Machine(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified MachineProfile
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.patchCoreOrdiriComV1alpha1MachineProfile(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified MachineProfile
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1MachineProfileStatus(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineProfileStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.patchCoreOrdiriComV1alpha1MachineProfileStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update review of the specified Machine
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1MachineReview(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineReviewRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.patchCoreOrdiriComV1alpha1MachineReview(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Machine
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1MachineStatus(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1MachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.patchCoreOrdiriComV1alpha1MachineStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified Node
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.patchCoreOrdiriComV1alpha1Node(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Node
     * @param param the request object
     */
    public patchCoreOrdiriComV1alpha1NodeStatus(param: CoreOrdiriComV1alpha1ApiPatchCoreOrdiriComV1alpha1NodeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.patchCoreOrdiriComV1alpha1NodeStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * read the specified Machine
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.readCoreOrdiriComV1alpha1Machine(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified MachineProfile
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.readCoreOrdiriComV1alpha1MachineProfile(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified MachineProfile
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1MachineProfileStatus(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineProfileStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.readCoreOrdiriComV1alpha1MachineProfileStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read review of the specified Machine
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1MachineReview(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineReviewRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.readCoreOrdiriComV1alpha1MachineReview(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Machine
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1MachineStatus(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1MachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.readCoreOrdiriComV1alpha1MachineStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified Node
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.readCoreOrdiriComV1alpha1Node(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Node
     * @param param the request object
     */
    public readCoreOrdiriComV1alpha1NodeStatus(param: CoreOrdiriComV1alpha1ApiReadCoreOrdiriComV1alpha1NodeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.readCoreOrdiriComV1alpha1NodeStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * replace the specified Machine
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.replaceCoreOrdiriComV1alpha1Machine(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified MachineProfile
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.replaceCoreOrdiriComV1alpha1MachineProfile(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified MachineProfile
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1MachineProfileStatus(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineProfileStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
        return this.api.replaceCoreOrdiriComV1alpha1MachineProfileStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace review of the specified Machine
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1MachineReview(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineReviewRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.replaceCoreOrdiriComV1alpha1MachineReview(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Machine
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1MachineStatus(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1MachineStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
        return this.api.replaceCoreOrdiriComV1alpha1MachineStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified Node
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.replaceCoreOrdiriComV1alpha1Node(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Node
     * @param param the request object
     */
    public replaceCoreOrdiriComV1alpha1NodeStatus(param: CoreOrdiriComV1alpha1ApiReplaceCoreOrdiriComV1alpha1NodeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
        return this.api.replaceCoreOrdiriComV1alpha1NodeStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Machine. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1Machine(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1Machine(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Machine. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1MachineList(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1MachineList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind MachineProfile. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1MachineProfile(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineProfileRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1MachineProfile(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of MachineProfile. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1MachineProfileList(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1MachineProfileListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1MachineProfileList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Node. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1Node(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1NodeRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1Node(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Node. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchCoreOrdiriComV1alpha1NodeList(param: CoreOrdiriComV1alpha1ApiWatchCoreOrdiriComV1alpha1NodeListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchCoreOrdiriComV1alpha1NodeList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

}

import { ObservableNetworkOrdiriComApi } from "./ObservableAPI";
import { NetworkOrdiriComApiRequestFactory, NetworkOrdiriComApiResponseProcessor} from "../apis/NetworkOrdiriComApi";

export interface NetworkOrdiriComApiGetNetworkOrdiriComAPIGroupRequest {
}

export class ObjectNetworkOrdiriComApi {
    private api: ObservableNetworkOrdiriComApi

    public constructor(configuration: Configuration, requestFactory?: NetworkOrdiriComApiRequestFactory, responseProcessor?: NetworkOrdiriComApiResponseProcessor) {
        this.api = new ObservableNetworkOrdiriComApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get information of a group
     * @param param the request object
     */
    public getNetworkOrdiriComAPIGroup(param: NetworkOrdiriComApiGetNetworkOrdiriComAPIGroupRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
        return this.api.getNetworkOrdiriComAPIGroup( options).toPromise();
    }

}

import { ObservableNetworkOrdiriComV1alpha1Api } from "./ObservableAPI";
import { NetworkOrdiriComV1alpha1ApiRequestFactory, NetworkOrdiriComV1alpha1ApiResponseProcessor} from "../apis/NetworkOrdiriComV1alpha1Api";

export interface NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Network
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Network
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Network
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Route
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Route
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Route
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1RouteTable
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1RouteTable
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1RouteTable
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Router
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Router
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Router
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Subnet
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Subnet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApicreateNetworkOrdiriComV1alpha1Subnet
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionNetworkRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionNetwork
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouteRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRoute
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouteTableRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouteTable
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouterRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionRouter
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionSubnetRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1CollectionSubnet
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Network
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Route
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1RouteTable
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Router
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof NetworkOrdiriComV1alpha1ApideleteNetworkOrdiriComV1alpha1Subnet
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface NetworkOrdiriComV1alpha1ApiGetNetworkOrdiriComV1alpha1APIResourcesRequest {
}

export interface NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Network
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Route
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1RouteTable
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Router
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApilistNetworkOrdiriComV1alpha1Subnet
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Network
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1NetworkStatusRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1NetworkStatus
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Route
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteStatusRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteStatus
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTable
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteTableStatusRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouteTableStatus
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Router
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouterStatusRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1RouterStatus
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1Subnet
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1SubnetStatusRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApipatchNetworkOrdiriComV1alpha1SubnetStatus
     */
    force?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Network
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1NetworkStatusRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1NetworkStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1NetworkStatus
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Route
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteStatusRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteStatus
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteTable
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteTableStatusRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteTableStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouteTableStatus
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Router
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouterStatusRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouterStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1RouterStatus
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Subnet
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1SubnetStatusRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1SubnetStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireadNetworkOrdiriComV1alpha1SubnetStatus
     */
    pretty?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Network
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Network
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Network
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Network
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1NetworkStatusRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1NetworkStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1NetworkStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1NetworkStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1NetworkStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1NetworkStatus
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Route
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Route
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Route
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Route
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteStatusRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteStatus
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTable
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTable
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTable
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTable
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteTableStatusRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTableStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTableStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTableStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTableStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouteTableStatus
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Router
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Router
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Router
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Router
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouterStatusRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouterStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouterStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouterStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouterStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1RouterStatus
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Subnet
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Subnet
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Subnet
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1Subnet
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1SubnetStatusRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1SubnetStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1SubnetStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1SubnetStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1SubnetStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApireplaceNetworkOrdiriComV1alpha1SubnetStatus
     */
    fieldManager?: string
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1NetworkRequest {
    /**
     * name of the Network
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Network
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1NetworkListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1NetworkList
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteRequest {
    /**
     * name of the Route
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Route
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteList
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteTableRequest {
    /**
     * name of the RouteTable
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTable
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteTableListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouteTableList
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouterRequest {
    /**
     * name of the Router
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Router
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouterListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1RouterList
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1SubnetRequest {
    /**
     * name of the Subnet
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1Subnet
     */
    watch?: boolean
}

export interface NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1SubnetListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof NetworkOrdiriComV1alpha1ApiwatchNetworkOrdiriComV1alpha1SubnetList
     */
    watch?: boolean
}

export class ObjectNetworkOrdiriComV1alpha1Api {
    private api: ObservableNetworkOrdiriComV1alpha1Api

    public constructor(configuration: Configuration, requestFactory?: NetworkOrdiriComV1alpha1ApiRequestFactory, responseProcessor?: NetworkOrdiriComV1alpha1ApiResponseProcessor) {
        this.api = new ObservableNetworkOrdiriComV1alpha1Api(configuration, requestFactory, responseProcessor);
    }

    /**
     * create a Network
     * @param param the request object
     */
    public createNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.createNetworkOrdiriComV1alpha1Network(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a Route
     * @param param the request object
     */
    public createNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.createNetworkOrdiriComV1alpha1Route(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a RouteTable
     * @param param the request object
     */
    public createNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.createNetworkOrdiriComV1alpha1RouteTable(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a Router
     * @param param the request object
     */
    public createNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.createNetworkOrdiriComV1alpha1Router(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a Subnet
     * @param param the request object
     */
    public createNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiCreateNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.createNetworkOrdiriComV1alpha1Subnet(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * delete collection of Network
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1CollectionNetwork(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionNetworkRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1CollectionNetwork(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of Route
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1CollectionRoute(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouteRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1CollectionRoute(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of RouteTable
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1CollectionRouteTable(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouteTableRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1CollectionRouteTable(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of Router
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1CollectionRouter(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionRouterRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1CollectionRouter(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of Subnet
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1CollectionSubnet(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1CollectionSubnetRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1CollectionSubnet(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete a Network
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1Network(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a Route
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1Route(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a RouteTable
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1RouteTable(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a Router
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1Router(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a Subnet
     * @param param the request object
     */
    public deleteNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiDeleteNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteNetworkOrdiriComV1alpha1Subnet(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * get available resources
     * @param param the request object
     */
    public getNetworkOrdiriComV1alpha1APIResources(param: NetworkOrdiriComV1alpha1ApiGetNetworkOrdiriComV1alpha1APIResourcesRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
        return this.api.getNetworkOrdiriComV1alpha1APIResources( options).toPromise();
    }

    /**
     * list or watch objects of kind Network
     * @param param the request object
     */
    public listNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1NetworkRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList> {
        return this.api.listNetworkOrdiriComV1alpha1Network(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind Route
     * @param param the request object
     */
    public listNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouteRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList> {
        return this.api.listNetworkOrdiriComV1alpha1Route(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind RouteTable
     * @param param the request object
     */
    public listNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouteTableRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList> {
        return this.api.listNetworkOrdiriComV1alpha1RouteTable(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind Router
     * @param param the request object
     */
    public listNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1RouterRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList> {
        return this.api.listNetworkOrdiriComV1alpha1Router(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind Subnet
     * @param param the request object
     */
    public listNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiListNetworkOrdiriComV1alpha1SubnetRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList> {
        return this.api.listNetworkOrdiriComV1alpha1Subnet(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * partially update the specified Network
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.patchNetworkOrdiriComV1alpha1Network(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Network
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1NetworkStatus(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1NetworkStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.patchNetworkOrdiriComV1alpha1NetworkStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified Route
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.patchNetworkOrdiriComV1alpha1Route(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Route
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1RouteStatus(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.patchNetworkOrdiriComV1alpha1RouteStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified RouteTable
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.patchNetworkOrdiriComV1alpha1RouteTable(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified RouteTable
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1RouteTableStatus(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouteTableStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.patchNetworkOrdiriComV1alpha1RouteTableStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified Router
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.patchNetworkOrdiriComV1alpha1Router(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Router
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1RouterStatus(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1RouterStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.patchNetworkOrdiriComV1alpha1RouterStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified Subnet
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.patchNetworkOrdiriComV1alpha1Subnet(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Subnet
     * @param param the request object
     */
    public patchNetworkOrdiriComV1alpha1SubnetStatus(param: NetworkOrdiriComV1alpha1ApiPatchNetworkOrdiriComV1alpha1SubnetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.patchNetworkOrdiriComV1alpha1SubnetStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * read the specified Network
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.readNetworkOrdiriComV1alpha1Network(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Network
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1NetworkStatus(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1NetworkStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.readNetworkOrdiriComV1alpha1NetworkStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified Route
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.readNetworkOrdiriComV1alpha1Route(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Route
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1RouteStatus(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.readNetworkOrdiriComV1alpha1RouteStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified RouteTable
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.readNetworkOrdiriComV1alpha1RouteTable(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified RouteTable
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1RouteTableStatus(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouteTableStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.readNetworkOrdiriComV1alpha1RouteTableStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified Router
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.readNetworkOrdiriComV1alpha1Router(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Router
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1RouterStatus(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1RouterStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.readNetworkOrdiriComV1alpha1RouterStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified Subnet
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.readNetworkOrdiriComV1alpha1Subnet(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Subnet
     * @param param the request object
     */
    public readNetworkOrdiriComV1alpha1SubnetStatus(param: NetworkOrdiriComV1alpha1ApiReadNetworkOrdiriComV1alpha1SubnetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.readNetworkOrdiriComV1alpha1SubnetStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * replace the specified Network
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.replaceNetworkOrdiriComV1alpha1Network(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Network
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1NetworkStatus(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1NetworkStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
        return this.api.replaceNetworkOrdiriComV1alpha1NetworkStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified Route
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.replaceNetworkOrdiriComV1alpha1Route(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Route
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1RouteStatus(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
        return this.api.replaceNetworkOrdiriComV1alpha1RouteStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified RouteTable
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.replaceNetworkOrdiriComV1alpha1RouteTable(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified RouteTable
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1RouteTableStatus(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouteTableStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
        return this.api.replaceNetworkOrdiriComV1alpha1RouteTableStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified Router
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.replaceNetworkOrdiriComV1alpha1Router(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Router
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1RouterStatus(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1RouterStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
        return this.api.replaceNetworkOrdiriComV1alpha1RouterStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified Subnet
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.replaceNetworkOrdiriComV1alpha1Subnet(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Subnet
     * @param param the request object
     */
    public replaceNetworkOrdiriComV1alpha1SubnetStatus(param: NetworkOrdiriComV1alpha1ApiReplaceNetworkOrdiriComV1alpha1SubnetStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
        return this.api.replaceNetworkOrdiriComV1alpha1SubnetStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Network. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1Network(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1NetworkRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1Network(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Network. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1NetworkList(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1NetworkListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1NetworkList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Route. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1Route(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1Route(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Route. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1RouteList(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1RouteList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind RouteTable. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1RouteTable(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteTableRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1RouteTable(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of RouteTable. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1RouteTableList(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouteTableListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1RouteTableList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Router. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1Router(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouterRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1Router(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Router. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1RouterList(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1RouterListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1RouterList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Subnet. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1Subnet(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1SubnetRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1Subnet(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Subnet. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchNetworkOrdiriComV1alpha1SubnetList(param: NetworkOrdiriComV1alpha1ApiWatchNetworkOrdiriComV1alpha1SubnetListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchNetworkOrdiriComV1alpha1SubnetList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

}

import { ObservableStorageOrdiriComApi } from "./ObservableAPI";
import { StorageOrdiriComApiRequestFactory, StorageOrdiriComApiResponseProcessor} from "../apis/StorageOrdiriComApi";

export interface StorageOrdiriComApiGetStorageOrdiriComAPIGroupRequest {
}

export class ObjectStorageOrdiriComApi {
    private api: ObservableStorageOrdiriComApi

    public constructor(configuration: Configuration, requestFactory?: StorageOrdiriComApiRequestFactory, responseProcessor?: StorageOrdiriComApiResponseProcessor) {
        this.api = new ObservableStorageOrdiriComApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get information of a group
     * @param param the request object
     */
    public getStorageOrdiriComAPIGroup(param: StorageOrdiriComApiGetStorageOrdiriComAPIGroupRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
        return this.api.getStorageOrdiriComAPIGroup( options).toPromise();
    }

}

import { ObservableStorageOrdiriComV1alpha1Api } from "./ObservableAPI";
import { StorageOrdiriComV1alpha1ApiRequestFactory, StorageOrdiriComV1alpha1ApiResponseProcessor} from "../apis/StorageOrdiriComV1alpha1Api";

export interface StorageOrdiriComV1alpha1ApiCreateStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1Volume
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1Volume
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1Volume
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiCreateStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1VolumeClaim
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1VolumeClaim
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApicreateStorageOrdiriComV1alpha1VolumeClaim
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1CollectionVolumeRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolume
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1CollectionVolumeClaimRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    pretty?: string
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    _continue?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    dryRun?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    fieldSelector?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    gracePeriodSeconds?: number
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    limit?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    propagationPolicy?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    timeoutSeconds?: number
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1CollectionVolumeClaim
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1Volume
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    dryRun?: string
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    gracePeriodSeconds?: number
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    orphanDependents?: boolean
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    propagationPolicy?: string
    /**
     * 
     * @type IoK8sApimachineryPkgApisMetaV1DeleteOptions
     * @memberof StorageOrdiriComV1alpha1ApideleteStorageOrdiriComV1alpha1VolumeClaim
     */
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions
}

export interface StorageOrdiriComV1alpha1ApiGetStorageOrdiriComV1alpha1APIResourcesRequest {
}

export interface StorageOrdiriComV1alpha1ApiListStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1Volume
     */
    watch?: boolean
}

export interface StorageOrdiriComV1alpha1ApiListStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    limit?: number
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApilistStorageOrdiriComV1alpha1VolumeClaim
     */
    watch?: boolean
}

export interface StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    name: string
    /**
     * 
     * @type any
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1Volume
     */
    force?: boolean
}

export interface StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    name: string
    /**
     * 
     * @type any
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaim
     */
    force?: boolean
}

export interface StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeClaimStatusRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    force?: boolean
}

export interface StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeStatusRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    name: string
    /**
     * 
     * @type any
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    body: any
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    fieldManager?: string
    /**
     * Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApipatchStorageOrdiriComV1alpha1VolumeStatus
     */
    force?: boolean
}

export interface StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1Volume
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
}

export interface StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeClaim
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
}

export interface StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeClaimStatusRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    pretty?: string
}

export interface StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeStatusRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeStatus
     */
    name: string
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireadStorageOrdiriComV1alpha1VolumeStatus
     */
    pretty?: string
}

export interface StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1Volume
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1Volume
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1Volume
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1Volume
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaim
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaim
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaim
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaim
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeClaimStatusRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeClaimStatus
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeStatusRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeStatus
     */
    name: string
    /**
     * 
     * @type ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeStatus
     */
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeStatus
     */
    pretty?: string
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeStatus
     */
    dryRun?: string
    /**
     * fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApireplaceStorageOrdiriComV1alpha1VolumeStatus
     */
    fieldManager?: string
}

export interface StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeRequest {
    /**
     * name of the Volume
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1Volume
     */
    watch?: boolean
}

export interface StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeClaimRequest {
    /**
     * name of the VolumeClaim
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    name: string
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaim
     */
    watch?: boolean
}

export interface StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeClaimListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeClaimList
     */
    watch?: boolean
}

export interface StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeListRequest {
    /**
     * allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    allowWatchBookmarks?: boolean
    /**
     * The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    _continue?: string
    /**
     * A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    fieldSelector?: string
    /**
     * A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    labelSelector?: string
    /**
     * limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    limit?: number
    /**
     * If &#39;true&#39;, then the output is pretty printed.
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    pretty?: string
    /**
     * resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    resourceVersion?: string
    /**
     * resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @type string
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    resourceVersionMatch?: string
    /**
     * Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @type number
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    timeoutSeconds?: number
    /**
     * Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
     * @type boolean
     * @memberof StorageOrdiriComV1alpha1ApiwatchStorageOrdiriComV1alpha1VolumeList
     */
    watch?: boolean
}

export class ObjectStorageOrdiriComV1alpha1Api {
    private api: ObservableStorageOrdiriComV1alpha1Api

    public constructor(configuration: Configuration, requestFactory?: StorageOrdiriComV1alpha1ApiRequestFactory, responseProcessor?: StorageOrdiriComV1alpha1ApiResponseProcessor) {
        this.api = new ObservableStorageOrdiriComV1alpha1Api(configuration, requestFactory, responseProcessor);
    }

    /**
     * create a Volume
     * @param param the request object
     */
    public createStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiCreateStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.createStorageOrdiriComV1alpha1Volume(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * create a VolumeClaim
     * @param param the request object
     */
    public createStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiCreateStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.createStorageOrdiriComV1alpha1VolumeClaim(param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * delete collection of Volume
     * @param param the request object
     */
    public deleteStorageOrdiriComV1alpha1CollectionVolume(param: StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1CollectionVolumeRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteStorageOrdiriComV1alpha1CollectionVolume(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete collection of VolumeClaim
     * @param param the request object
     */
    public deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(param: StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1CollectionVolumeClaimRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(param.pretty, param._continue, param.dryRun, param.fieldSelector, param.gracePeriodSeconds, param.labelSelector, param.limit, param.orphanDependents, param.propagationPolicy, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.body,  options).toPromise();
    }

    /**
     * delete a Volume
     * @param param the request object
     */
    public deleteStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteStorageOrdiriComV1alpha1Volume(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * delete a VolumeClaim
     * @param param the request object
     */
    public deleteStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiDeleteStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
        return this.api.deleteStorageOrdiriComV1alpha1VolumeClaim(param.name, param.pretty, param.dryRun, param.gracePeriodSeconds, param.orphanDependents, param.propagationPolicy, param.body,  options).toPromise();
    }

    /**
     * get available resources
     * @param param the request object
     */
    public getStorageOrdiriComV1alpha1APIResources(param: StorageOrdiriComV1alpha1ApiGetStorageOrdiriComV1alpha1APIResourcesRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
        return this.api.getStorageOrdiriComV1alpha1APIResources( options).toPromise();
    }

    /**
     * list or watch objects of kind Volume
     * @param param the request object
     */
    public listStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiListStorageOrdiriComV1alpha1VolumeRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList> {
        return this.api.listStorageOrdiriComV1alpha1Volume(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * list or watch objects of kind VolumeClaim
     * @param param the request object
     */
    public listStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiListStorageOrdiriComV1alpha1VolumeClaimRequest = {}, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList> {
        return this.api.listStorageOrdiriComV1alpha1VolumeClaim(param.pretty, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * partially update the specified Volume
     * @param param the request object
     */
    public patchStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.patchStorageOrdiriComV1alpha1Volume(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update the specified VolumeClaim
     * @param param the request object
     */
    public patchStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.patchStorageOrdiriComV1alpha1VolumeClaim(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified VolumeClaim
     * @param param the request object
     */
    public patchStorageOrdiriComV1alpha1VolumeClaimStatus(param: StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeClaimStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.patchStorageOrdiriComV1alpha1VolumeClaimStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * partially update status of the specified Volume
     * @param param the request object
     */
    public patchStorageOrdiriComV1alpha1VolumeStatus(param: StorageOrdiriComV1alpha1ApiPatchStorageOrdiriComV1alpha1VolumeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.patchStorageOrdiriComV1alpha1VolumeStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager, param.force,  options).toPromise();
    }

    /**
     * read the specified Volume
     * @param param the request object
     */
    public readStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.readStorageOrdiriComV1alpha1Volume(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read the specified VolumeClaim
     * @param param the request object
     */
    public readStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.readStorageOrdiriComV1alpha1VolumeClaim(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified VolumeClaim
     * @param param the request object
     */
    public readStorageOrdiriComV1alpha1VolumeClaimStatus(param: StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeClaimStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.readStorageOrdiriComV1alpha1VolumeClaimStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * read status of the specified Volume
     * @param param the request object
     */
    public readStorageOrdiriComV1alpha1VolumeStatus(param: StorageOrdiriComV1alpha1ApiReadStorageOrdiriComV1alpha1VolumeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.readStorageOrdiriComV1alpha1VolumeStatus(param.name, param.pretty,  options).toPromise();
    }

    /**
     * replace the specified Volume
     * @param param the request object
     */
    public replaceStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.replaceStorageOrdiriComV1alpha1Volume(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace the specified VolumeClaim
     * @param param the request object
     */
    public replaceStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.replaceStorageOrdiriComV1alpha1VolumeClaim(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified VolumeClaim
     * @param param the request object
     */
    public replaceStorageOrdiriComV1alpha1VolumeClaimStatus(param: StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeClaimStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
        return this.api.replaceStorageOrdiriComV1alpha1VolumeClaimStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * replace status of the specified Volume
     * @param param the request object
     */
    public replaceStorageOrdiriComV1alpha1VolumeStatus(param: StorageOrdiriComV1alpha1ApiReplaceStorageOrdiriComV1alpha1VolumeStatusRequest, options?: Configuration): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
        return this.api.replaceStorageOrdiriComV1alpha1VolumeStatus(param.name, param.body, param.pretty, param.dryRun, param.fieldManager,  options).toPromise();
    }

    /**
     * watch changes to an object of kind Volume. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchStorageOrdiriComV1alpha1Volume(param: StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchStorageOrdiriComV1alpha1Volume(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch changes to an object of kind VolumeClaim. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
     * @param param the request object
     */
    public watchStorageOrdiriComV1alpha1VolumeClaim(param: StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeClaimRequest, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchStorageOrdiriComV1alpha1VolumeClaim(param.name, param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of VolumeClaim. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchStorageOrdiriComV1alpha1VolumeClaimList(param: StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeClaimListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchStorageOrdiriComV1alpha1VolumeClaimList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

    /**
     * watch individual changes to a list of Volume. deprecated: use the 'watch' parameter with a list operation instead.
     * @param param the request object
     */
    public watchStorageOrdiriComV1alpha1VolumeList(param: StorageOrdiriComV1alpha1ApiWatchStorageOrdiriComV1alpha1VolumeListRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
        return this.api.watchStorageOrdiriComV1alpha1VolumeList(param.allowWatchBookmarks, param._continue, param.fieldSelector, param.labelSelector, param.limit, param.pretty, param.resourceVersion, param.resourceVersionMatch, param.timeoutSeconds, param.watch,  options).toPromise();
    }

}

import { ObservableVersionApi } from "./ObservableAPI";
import { VersionApiRequestFactory, VersionApiResponseProcessor} from "../apis/VersionApi";

export interface VersionApiGetCodeVersionRequest {
}

export class ObjectVersionApi {
    private api: ObservableVersionApi

    public constructor(configuration: Configuration, requestFactory?: VersionApiRequestFactory, responseProcessor?: VersionApiResponseProcessor) {
        this.api = new ObservableVersionApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * get the code version
     * @param param the request object
     */
    public getCodeVersion(param: VersionApiGetCodeVersionRequest = {}, options?: Configuration): Promise<IoK8sApimachineryPkgVersionInfo> {
        return this.api.getCodeVersion( options).toPromise();
    }

}
