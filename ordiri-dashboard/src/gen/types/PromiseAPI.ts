import { ResponseContext, RequestContext, HttpFile } from "../http/http";
import * as models from "../models/all";
import { Configuration } from "../configuration";

import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1HostLocalVolumeClaim } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1HostLocalVolumeClaim";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentSpec } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentSpec";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterfaceStatus } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterfaceStatus";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetSpec";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineSpec";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineStatus";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineTemplate";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeClaim";
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeStatus } from "../models/ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolumeStatus";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1IpxeConfiguration";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileSpec";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProperty";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineSpec";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineStatus";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeNetworkStatus";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSpec } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSpec";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeSubnetStatus";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus } from "../models/ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeVirtualMachineStatus";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1DhcpConfiguration";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkNatSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSelector } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSelector";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkStatus";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSelector } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSelector";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSubnetReference } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterSubnetReference";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetSpec";
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus } from "../models/ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetStatus";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimSpec";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList";
import { ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec } from "../models/ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeSpec";
import { IoK8sApiCoreV1ObjectReference } from "../models/IoK8sApiCoreV1ObjectReference";
import { IoK8sApimachineryPkgApisMetaV1APIGroup } from "../models/IoK8sApimachineryPkgApisMetaV1APIGroup";
import { IoK8sApimachineryPkgApisMetaV1APIGroupList } from "../models/IoK8sApimachineryPkgApisMetaV1APIGroupList";
import { IoK8sApimachineryPkgApisMetaV1APIResource } from "../models/IoK8sApimachineryPkgApisMetaV1APIResource";
import { IoK8sApimachineryPkgApisMetaV1APIResourceList } from "../models/IoK8sApimachineryPkgApisMetaV1APIResourceList";
import { IoK8sApimachineryPkgApisMetaV1Condition } from "../models/IoK8sApimachineryPkgApisMetaV1Condition";
import { IoK8sApimachineryPkgApisMetaV1DeleteOptions } from "../models/IoK8sApimachineryPkgApisMetaV1DeleteOptions";
import { IoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery } from "../models/IoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery";
import { IoK8sApimachineryPkgApisMetaV1ListMeta } from "../models/IoK8sApimachineryPkgApisMetaV1ListMeta";
import { IoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry } from "../models/IoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry";
import { IoK8sApimachineryPkgApisMetaV1ObjectMeta } from "../models/IoK8sApimachineryPkgApisMetaV1ObjectMeta";
import { IoK8sApimachineryPkgApisMetaV1OwnerReference } from "../models/IoK8sApimachineryPkgApisMetaV1OwnerReference";
import { IoK8sApimachineryPkgApisMetaV1Preconditions } from "../models/IoK8sApimachineryPkgApisMetaV1Preconditions";
import { IoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR } from "../models/IoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR";
import { IoK8sApimachineryPkgApisMetaV1Status } from "../models/IoK8sApimachineryPkgApisMetaV1Status";
import { IoK8sApimachineryPkgApisMetaV1StatusCause } from "../models/IoK8sApimachineryPkgApisMetaV1StatusCause";
import { IoK8sApimachineryPkgApisMetaV1StatusDetails } from "../models/IoK8sApimachineryPkgApisMetaV1StatusDetails";
import { IoK8sApimachineryPkgApisMetaV1WatchEvent } from "../models/IoK8sApimachineryPkgApisMetaV1WatchEvent";
import { IoK8sApimachineryPkgVersionInfo } from "../models/IoK8sApimachineryPkgVersionInfo";
import { ObservableApisApi } from "./ObservableAPI";

import { ObservableVersionApi } from "./ObservableAPI";

import { ObservableStorageOrdiriComV1alpha1Api } from "./ObservableAPI";

import {
  StorageOrdiriComV1alpha1ApiRequestFactory,
  StorageOrdiriComV1alpha1ApiResponseProcessor,
} from "../apis/StorageOrdiriComV1alpha1Api";
import { ObservableStorageOrdiriComApi } from "./ObservableAPI";

import {
  StorageOrdiriComApiRequestFactory,
  StorageOrdiriComApiResponseProcessor,
} from "../apis/StorageOrdiriComApi";
import { ObservableNetworkOrdiriComV1alpha1Api } from "./ObservableAPI";

import {
  NetworkOrdiriComV1alpha1ApiRequestFactory,
  NetworkOrdiriComV1alpha1ApiResponseProcessor,
} from "../apis/NetworkOrdiriComV1alpha1Api";

import { ObservableNetworkOrdiriComApi } from "./ObservableAPI";

import {
  NetworkOrdiriComApiRequestFactory,
  NetworkOrdiriComApiResponseProcessor,
} from "../apis/NetworkOrdiriComApi";
import { ObservableCoreOrdiriComV1alpha1Api } from "./ObservableAPI";

import {
  CoreOrdiriComV1alpha1ApiRequestFactory,
  CoreOrdiriComV1alpha1ApiResponseProcessor,
} from "../apis/CoreOrdiriComV1alpha1Api";
import { ObservableCoreOrdiriComApi } from "./ObservableAPI";

import {
  CoreOrdiriComApiRequestFactory,
  CoreOrdiriComApiResponseProcessor,
} from "../apis/CoreOrdiriComApi";
import {
  VersionApiRequestFactory,
  VersionApiResponseProcessor,
} from "../apis/VersionApi";
import {
  ApisApiRequestFactory,
  ApisApiResponseProcessor,
} from "../apis/ApisApi";

import { ObservableComputeOrdiriComApi } from "./ObservableAPI";

import {
  ComputeOrdiriComApiRequestFactory,
  ComputeOrdiriComApiResponseProcessor,
} from "../apis/ComputeOrdiriComApi";
import { ObservableComputeOrdiriComV1alpha1Api } from "./ObservableAPI";

import {
  ComputeOrdiriComV1alpha1ApiRequestFactory,
  ComputeOrdiriComV1alpha1ApiResponseProcessor,
} from "../apis/ComputeOrdiriComV1alpha1Api";
export class PromiseApisApi {
  private api: ObservableApisApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: ApisApiRequestFactory,
    responseProcessor?: ApisApiResponseProcessor
  ) {
    this.api = new ObservableApisApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get available API versions
   */
  public getAPIVersions(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIGroupList> {
    const result = this.api.getAPIVersions(_options);
    return result.toPromise();
  }
}

export class PromiseComputeOrdiriComApi {
  private api: ObservableComputeOrdiriComApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: ComputeOrdiriComApiRequestFactory,
    responseProcessor?: ComputeOrdiriComApiResponseProcessor
  ) {
    this.api = new ObservableComputeOrdiriComApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get information of a group
   */
  public getComputeOrdiriComAPIGroup(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
    const result = this.api.getComputeOrdiriComAPIGroup(_options);
    return result.toPromise();
  }
}

export class PromiseComputeOrdiriComV1alpha1Api {
  private api: ObservableComputeOrdiriComV1alpha1Api;

  public constructor(
    configuration: Configuration,
    requestFactory?: ComputeOrdiriComV1alpha1ApiRequestFactory,
    responseProcessor?: ComputeOrdiriComV1alpha1ApiResponseProcessor
  ) {
    this.api = new ObservableComputeOrdiriComV1alpha1Api(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * create a VirtualMachine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createComputeOrdiriComV1alpha1VirtualMachine(
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.createComputeOrdiriComV1alpha1VirtualMachine(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a VirtualMachineDeployment
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createComputeOrdiriComV1alpha1VirtualMachineDeployment(
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.createComputeOrdiriComV1alpha1VirtualMachineDeployment(
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
  }

  /**
   * create a VirtualMachineReplicaSet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.createComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result =
      this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachine(
        pretty,
        _continue,
        dryRun,
        fieldSelector,
        gracePeriodSeconds,
        labelSelector,
        limit,
        orphanDependents,
        propagationPolicy,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        body,
        _options
      );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result =
      this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachineDeployment(
        pretty,
        _continue,
        dryRun,
        fieldSelector,
        gracePeriodSeconds,
        labelSelector,
        limit,
        orphanDependents,
        propagationPolicy,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        body,
        _options
      );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result =
      this.api.deleteComputeOrdiriComV1alpha1CollectionVirtualMachineReplicaSet(
        pretty,
        _continue,
        dryRun,
        fieldSelector,
        gracePeriodSeconds,
        labelSelector,
        limit,
        orphanDependents,
        propagationPolicy,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        body,
        _options
      );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1VirtualMachine(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteComputeOrdiriComV1alpha1VirtualMachine(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result =
      this.api.deleteComputeOrdiriComV1alpha1VirtualMachineDeployment(
        name,
        pretty,
        dryRun,
        gracePeriodSeconds,
        orphanDependents,
        propagationPolicy,
        body,
        _options
      );
    return result.toPromise();
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
  public deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result =
      this.api.deleteComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        name,
        pretty,
        dryRun,
        gracePeriodSeconds,
        orphanDependents,
        propagationPolicy,
        body,
        _options
      );
    return result.toPromise();
  }

  /**
   * get available resources
   */
  public getComputeOrdiriComV1alpha1APIResources(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
    const result = this.api.getComputeOrdiriComV1alpha1APIResources(_options);
    return result.toPromise();
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
  public listComputeOrdiriComV1alpha1VirtualMachine(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineList> {
    const result = this.api.listComputeOrdiriComV1alpha1VirtualMachine(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public listComputeOrdiriComV1alpha1VirtualMachineDeployment(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeploymentList> {
    const result =
      this.api.listComputeOrdiriComV1alpha1VirtualMachineDeployment(
        pretty,
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
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
  public listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSetList> {
    const result =
      this.api.listComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        pretty,
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachine(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.patchComputeOrdiriComV1alpha1VirtualMachine(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachineDeployment(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.patchComputeOrdiriComV1alpha1VirtualMachineDeployment(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        force,
        _options
      );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.patchComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        force,
        _options
      );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.patchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        force,
        _options
      );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.patchComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        force,
        _options
      );
    return result.toPromise();
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
  public patchComputeOrdiriComV1alpha1VirtualMachineStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.patchComputeOrdiriComV1alpha1VirtualMachineStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified VirtualMachine
   * @param name name of the VirtualMachine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachine(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.readComputeOrdiriComV1alpha1VirtualMachine(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified VirtualMachineDeployment
   * @param name name of the VirtualMachineDeployment
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachineDeployment(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.readComputeOrdiriComV1alpha1VirtualMachineDeployment(
        name,
        pretty,
        _options
      );
    return result.toPromise();
  }

  /**
   * read status of the specified VirtualMachineDeployment
   * @param name name of the VirtualMachineDeployment
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.readComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
        name,
        pretty,
        _options
      );
    return result.toPromise();
  }

  /**
   * read the specified VirtualMachineReplicaSet
   * @param name name of the VirtualMachineReplicaSet
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.readComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        name,
        pretty,
        _options
      );
    return result.toPromise();
  }

  /**
   * read status of the specified VirtualMachineReplicaSet
   * @param name name of the VirtualMachineReplicaSet
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.readComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
        name,
        pretty,
        _options
      );
    return result.toPromise();
  }

  /**
   * read status of the specified VirtualMachine
   * @param name name of the VirtualMachine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readComputeOrdiriComV1alpha1VirtualMachineStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.readComputeOrdiriComV1alpha1VirtualMachineStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified VirtualMachine
   * @param name name of the VirtualMachine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachine(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.replaceComputeOrdiriComV1alpha1VirtualMachine(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified VirtualMachineDeployment
   * @param name name of the VirtualMachineDeployment
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.replaceComputeOrdiriComV1alpha1VirtualMachineDeployment(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
  }

  /**
   * replace status of the specified VirtualMachineDeployment
   * @param name name of the VirtualMachineDeployment
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineDeployment> {
    const result =
      this.api.replaceComputeOrdiriComV1alpha1VirtualMachineDeploymentStatus(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
  }

  /**
   * replace the specified VirtualMachineReplicaSet
   * @param name name of the VirtualMachineReplicaSet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
  }

  /**
   * replace status of the specified VirtualMachineReplicaSet
   * @param name name of the VirtualMachineReplicaSet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineReplicaSet> {
    const result =
      this.api.replaceComputeOrdiriComV1alpha1VirtualMachineReplicaSetStatus(
        name,
        body,
        pretty,
        dryRun,
        fieldManager,
        _options
      );
    return result.toPromise();
  }

  /**
   * replace status of the specified VirtualMachine
   * @param name name of the VirtualMachine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceComputeOrdiriComV1alpha1VirtualMachineStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine> {
    const result = this.api.replaceComputeOrdiriComV1alpha1VirtualMachineStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachine(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchComputeOrdiriComV1alpha1VirtualMachine(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachineDeployment(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result =
      this.api.watchComputeOrdiriComV1alpha1VirtualMachineDeployment(
        name,
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        pretty,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result =
      this.api.watchComputeOrdiriComV1alpha1VirtualMachineDeploymentList(
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        pretty,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachineList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchComputeOrdiriComV1alpha1VirtualMachineList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result =
      this.api.watchComputeOrdiriComV1alpha1VirtualMachineReplicaSet(
        name,
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        pretty,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
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
  public watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result =
      this.api.watchComputeOrdiriComV1alpha1VirtualMachineReplicaSetList(
        allowWatchBookmarks,
        _continue,
        fieldSelector,
        labelSelector,
        limit,
        pretty,
        resourceVersion,
        resourceVersionMatch,
        timeoutSeconds,
        watch,
        _options
      );
    return result.toPromise();
  }
}

export class PromiseCoreOrdiriComApi {
  private api: ObservableCoreOrdiriComApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: CoreOrdiriComApiRequestFactory,
    responseProcessor?: CoreOrdiriComApiResponseProcessor
  ) {
    this.api = new ObservableCoreOrdiriComApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get information of a group
   */
  public getCoreOrdiriComAPIGroup(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
    const result = this.api.getCoreOrdiriComAPIGroup(_options);
    return result.toPromise();
  }
}

export class PromiseCoreOrdiriComV1alpha1Api {
  private api: ObservableCoreOrdiriComV1alpha1Api;

  public constructor(
    configuration: Configuration,
    requestFactory?: CoreOrdiriComV1alpha1ApiRequestFactory,
    responseProcessor?: CoreOrdiriComV1alpha1ApiResponseProcessor
  ) {
    this.api = new ObservableCoreOrdiriComV1alpha1Api(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * create a Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createCoreOrdiriComV1alpha1Machine(
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.createCoreOrdiriComV1alpha1Machine(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a MachineProfile
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createCoreOrdiriComV1alpha1MachineProfile(
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.createCoreOrdiriComV1alpha1MachineProfile(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a Node
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createCoreOrdiriComV1alpha1Node(
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.createCoreOrdiriComV1alpha1Node(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Machine
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
  public deleteCoreOrdiriComV1alpha1CollectionMachine(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1CollectionMachine(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of MachineProfile
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
  public deleteCoreOrdiriComV1alpha1CollectionMachineProfile(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1CollectionMachineProfile(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Node
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
  public deleteCoreOrdiriComV1alpha1CollectionNode(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1CollectionNode(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Machine
   * @param name name of the Machine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteCoreOrdiriComV1alpha1Machine(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1Machine(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a MachineProfile
   * @param name name of the MachineProfile
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteCoreOrdiriComV1alpha1MachineProfile(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1MachineProfile(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Node
   * @param name name of the Node
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteCoreOrdiriComV1alpha1Node(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteCoreOrdiriComV1alpha1Node(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * get available resources
   */
  public getCoreOrdiriComV1alpha1APIResources(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
    const result = this.api.getCoreOrdiriComV1alpha1APIResources(_options);
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Machine
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
  public listCoreOrdiriComV1alpha1Machine(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineList> {
    const result = this.api.listCoreOrdiriComV1alpha1Machine(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind MachineProfile
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
  public listCoreOrdiriComV1alpha1MachineProfile(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfileList> {
    const result = this.api.listCoreOrdiriComV1alpha1MachineProfile(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Node
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
  public listCoreOrdiriComV1alpha1Node(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeList> {
    const result = this.api.listCoreOrdiriComV1alpha1Node(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1Machine(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.patchCoreOrdiriComV1alpha1Machine(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified MachineProfile
   * @param name name of the MachineProfile
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1MachineProfile(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.patchCoreOrdiriComV1alpha1MachineProfile(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified MachineProfile
   * @param name name of the MachineProfile
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1MachineProfileStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.patchCoreOrdiriComV1alpha1MachineProfileStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update review of the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1MachineReview(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.patchCoreOrdiriComV1alpha1MachineReview(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1MachineStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.patchCoreOrdiriComV1alpha1MachineStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Node
   * @param name name of the Node
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1Node(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.patchCoreOrdiriComV1alpha1Node(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Node
   * @param name name of the Node
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchCoreOrdiriComV1alpha1NodeStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.patchCoreOrdiriComV1alpha1NodeStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Machine
   * @param name name of the Machine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1Machine(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.readCoreOrdiriComV1alpha1Machine(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified MachineProfile
   * @param name name of the MachineProfile
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1MachineProfile(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.readCoreOrdiriComV1alpha1MachineProfile(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified MachineProfile
   * @param name name of the MachineProfile
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1MachineProfileStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.readCoreOrdiriComV1alpha1MachineProfileStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read review of the specified Machine
   * @param name name of the Machine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1MachineReview(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.readCoreOrdiriComV1alpha1MachineReview(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Machine
   * @param name name of the Machine
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1MachineStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.readCoreOrdiriComV1alpha1MachineStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Node
   * @param name name of the Node
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1Node(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.readCoreOrdiriComV1alpha1Node(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Node
   * @param name name of the Node
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readCoreOrdiriComV1alpha1NodeStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.readCoreOrdiriComV1alpha1NodeStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1Machine(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.replaceCoreOrdiriComV1alpha1Machine(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified MachineProfile
   * @param name name of the MachineProfile
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1MachineProfile(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.replaceCoreOrdiriComV1alpha1MachineProfile(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified MachineProfile
   * @param name name of the MachineProfile
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1MachineProfileStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1MachineProfile> {
    const result = this.api.replaceCoreOrdiriComV1alpha1MachineProfileStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace review of the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1MachineReview(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.replaceCoreOrdiriComV1alpha1MachineReview(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Machine
   * @param name name of the Machine
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1MachineStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Machine> {
    const result = this.api.replaceCoreOrdiriComV1alpha1MachineStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Node
   * @param name name of the Node
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1Node(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.replaceCoreOrdiriComV1alpha1Node(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Node
   * @param name name of the Node
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceCoreOrdiriComV1alpha1NodeStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node> {
    const result = this.api.replaceCoreOrdiriComV1alpha1NodeStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Machine. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Machine
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
  public watchCoreOrdiriComV1alpha1Machine(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1Machine(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Machine. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchCoreOrdiriComV1alpha1MachineList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1MachineList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind MachineProfile. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the MachineProfile
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
  public watchCoreOrdiriComV1alpha1MachineProfile(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1MachineProfile(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of MachineProfile. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchCoreOrdiriComV1alpha1MachineProfileList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1MachineProfileList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Node. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Node
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
  public watchCoreOrdiriComV1alpha1Node(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1Node(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Node. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchCoreOrdiriComV1alpha1NodeList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchCoreOrdiriComV1alpha1NodeList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }
}
export class PromiseNetworkOrdiriComApi {
  private api: ObservableNetworkOrdiriComApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: NetworkOrdiriComApiRequestFactory,
    responseProcessor?: NetworkOrdiriComApiResponseProcessor
  ) {
    this.api = new ObservableNetworkOrdiriComApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get information of a group
   */
  public getNetworkOrdiriComAPIGroup(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
    const result = this.api.getNetworkOrdiriComAPIGroup(_options);
    return result.toPromise();
  }
}

export class PromiseNetworkOrdiriComV1alpha1Api {
  private api: ObservableNetworkOrdiriComV1alpha1Api;

  public constructor(
    configuration: Configuration,
    requestFactory?: NetworkOrdiriComV1alpha1ApiRequestFactory,
    responseProcessor?: NetworkOrdiriComV1alpha1ApiResponseProcessor
  ) {
    this.api = new ObservableNetworkOrdiriComV1alpha1Api(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * create a Network
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createNetworkOrdiriComV1alpha1Network(
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.createNetworkOrdiriComV1alpha1Network(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a Route
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createNetworkOrdiriComV1alpha1Route(
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.createNetworkOrdiriComV1alpha1Route(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a RouteTable
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createNetworkOrdiriComV1alpha1RouteTable(
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.createNetworkOrdiriComV1alpha1RouteTable(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a Router
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createNetworkOrdiriComV1alpha1Router(
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.createNetworkOrdiriComV1alpha1Router(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a Subnet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createNetworkOrdiriComV1alpha1Subnet(
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.createNetworkOrdiriComV1alpha1Subnet(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Network
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
  public deleteNetworkOrdiriComV1alpha1CollectionNetwork(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1CollectionNetwork(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Route
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
  public deleteNetworkOrdiriComV1alpha1CollectionRoute(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1CollectionRoute(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of RouteTable
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
  public deleteNetworkOrdiriComV1alpha1CollectionRouteTable(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1CollectionRouteTable(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Router
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
  public deleteNetworkOrdiriComV1alpha1CollectionRouter(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1CollectionRouter(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete collection of Subnet
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
  public deleteNetworkOrdiriComV1alpha1CollectionSubnet(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1CollectionSubnet(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Network
   * @param name name of the Network
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteNetworkOrdiriComV1alpha1Network(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1Network(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Route
   * @param name name of the Route
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteNetworkOrdiriComV1alpha1Route(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1Route(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a RouteTable
   * @param name name of the RouteTable
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteNetworkOrdiriComV1alpha1RouteTable(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1RouteTable(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Router
   * @param name name of the Router
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteNetworkOrdiriComV1alpha1Router(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1Router(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * delete a Subnet
   * @param name name of the Subnet
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
   * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground.
   * @param body
   */
  public deleteNetworkOrdiriComV1alpha1Subnet(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteNetworkOrdiriComV1alpha1Subnet(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * get available resources
   */
  public getNetworkOrdiriComV1alpha1APIResources(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
    const result = this.api.getNetworkOrdiriComV1alpha1APIResources(_options);
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Network
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
  public listNetworkOrdiriComV1alpha1Network(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1NetworkList> {
    const result = this.api.listNetworkOrdiriComV1alpha1Network(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Route
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
  public listNetworkOrdiriComV1alpha1Route(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteList> {
    const result = this.api.listNetworkOrdiriComV1alpha1Route(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind RouteTable
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
  public listNetworkOrdiriComV1alpha1RouteTable(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTableList> {
    const result = this.api.listNetworkOrdiriComV1alpha1RouteTable(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Router
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
  public listNetworkOrdiriComV1alpha1Router(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouterList> {
    const result = this.api.listNetworkOrdiriComV1alpha1Router(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * list or watch objects of kind Subnet
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
  public listNetworkOrdiriComV1alpha1Subnet(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1SubnetList> {
    const result = this.api.listNetworkOrdiriComV1alpha1Subnet(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Network
   * @param name name of the Network
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1Network(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.patchNetworkOrdiriComV1alpha1Network(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Network
   * @param name name of the Network
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1NetworkStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.patchNetworkOrdiriComV1alpha1NetworkStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Route
   * @param name name of the Route
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1Route(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.patchNetworkOrdiriComV1alpha1Route(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Route
   * @param name name of the Route
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1RouteStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.patchNetworkOrdiriComV1alpha1RouteStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified RouteTable
   * @param name name of the RouteTable
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1RouteTable(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.patchNetworkOrdiriComV1alpha1RouteTable(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified RouteTable
   * @param name name of the RouteTable
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1RouteTableStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.patchNetworkOrdiriComV1alpha1RouteTableStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Router
   * @param name name of the Router
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1Router(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.patchNetworkOrdiriComV1alpha1Router(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Router
   * @param name name of the Router
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1RouterStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.patchNetworkOrdiriComV1alpha1RouterStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update the specified Subnet
   * @param name name of the Subnet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1Subnet(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.patchNetworkOrdiriComV1alpha1Subnet(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * partially update status of the specified Subnet
   * @param name name of the Subnet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
   * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
   */
  public patchNetworkOrdiriComV1alpha1SubnetStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.patchNetworkOrdiriComV1alpha1SubnetStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Network
   * @param name name of the Network
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1Network(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.readNetworkOrdiriComV1alpha1Network(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Network
   * @param name name of the Network
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1NetworkStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.readNetworkOrdiriComV1alpha1NetworkStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Route
   * @param name name of the Route
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1Route(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.readNetworkOrdiriComV1alpha1Route(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Route
   * @param name name of the Route
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1RouteStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.readNetworkOrdiriComV1alpha1RouteStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified RouteTable
   * @param name name of the RouteTable
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1RouteTable(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.readNetworkOrdiriComV1alpha1RouteTable(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified RouteTable
   * @param name name of the RouteTable
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1RouteTableStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.readNetworkOrdiriComV1alpha1RouteTableStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Router
   * @param name name of the Router
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1Router(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.readNetworkOrdiriComV1alpha1Router(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Router
   * @param name name of the Router
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1RouterStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.readNetworkOrdiriComV1alpha1RouterStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Subnet
   * @param name name of the Subnet
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1Subnet(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.readNetworkOrdiriComV1alpha1Subnet(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Subnet
   * @param name name of the Subnet
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readNetworkOrdiriComV1alpha1SubnetStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.readNetworkOrdiriComV1alpha1SubnetStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Network
   * @param name name of the Network
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1Network(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1Network(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Network
   * @param name name of the Network
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1NetworkStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Network> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1NetworkStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Route
   * @param name name of the Route
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1Route(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1Route(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Route
   * @param name name of the Route
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1RouteStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Route> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1RouteStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified RouteTable
   * @param name name of the RouteTable
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1RouteTable(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1RouteTable(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified RouteTable
   * @param name name of the RouteTable
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1RouteTableStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1RouteTable> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1RouteTableStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Router
   * @param name name of the Router
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1Router(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1Router(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Router
   * @param name name of the Router
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1RouterStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Router> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1RouterStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Subnet
   * @param name name of the Subnet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1Subnet(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1Subnet(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Subnet
   * @param name name of the Subnet
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceNetworkOrdiriComV1alpha1SubnetStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1Subnet> {
    const result = this.api.replaceNetworkOrdiriComV1alpha1SubnetStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Network. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Network
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
  public watchNetworkOrdiriComV1alpha1Network(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1Network(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Network. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchNetworkOrdiriComV1alpha1NetworkList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1NetworkList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Route. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Route
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
  public watchNetworkOrdiriComV1alpha1Route(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1Route(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Route. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchNetworkOrdiriComV1alpha1RouteList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1RouteList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind RouteTable. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the RouteTable
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
  public watchNetworkOrdiriComV1alpha1RouteTable(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1RouteTable(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of RouteTable. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchNetworkOrdiriComV1alpha1RouteTableList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1RouteTableList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Router. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Router
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
  public watchNetworkOrdiriComV1alpha1Router(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1Router(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Router. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchNetworkOrdiriComV1alpha1RouterList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1RouterList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch changes to an object of kind Subnet. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
   * @param name name of the Subnet
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
  public watchNetworkOrdiriComV1alpha1Subnet(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1Subnet(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }

  /**
   * watch individual changes to a list of Subnet. deprecated: use the 'watch' parameter with a list operation instead.
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
  public watchNetworkOrdiriComV1alpha1SubnetList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchNetworkOrdiriComV1alpha1SubnetList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }
}

export class PromiseStorageOrdiriComApi {
  private api: ObservableStorageOrdiriComApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: StorageOrdiriComApiRequestFactory,
    responseProcessor?: StorageOrdiriComApiResponseProcessor
  ) {
    this.api = new ObservableStorageOrdiriComApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get information of a group
   */
  public getStorageOrdiriComAPIGroup(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIGroup> {
    const result = this.api.getStorageOrdiriComAPIGroup(_options);
    return result.toPromise();
  }
}

export class PromiseStorageOrdiriComV1alpha1Api {
  private api: ObservableStorageOrdiriComV1alpha1Api;

  public constructor(
    configuration: Configuration,
    requestFactory?: StorageOrdiriComV1alpha1ApiRequestFactory,
    responseProcessor?: StorageOrdiriComV1alpha1ApiResponseProcessor
  ) {
    this.api = new ObservableStorageOrdiriComV1alpha1Api(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * create a Volume
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createStorageOrdiriComV1alpha1Volume(
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.createStorageOrdiriComV1alpha1Volume(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * create a VolumeClaim
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public createStorageOrdiriComV1alpha1VolumeClaim(
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.createStorageOrdiriComV1alpha1VolumeClaim(
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
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
  public deleteStorageOrdiriComV1alpha1CollectionVolume(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteStorageOrdiriComV1alpha1CollectionVolume(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
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
  public deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(
    pretty?: string,
    _continue?: string,
    dryRun?: string,
    fieldSelector?: string,
    gracePeriodSeconds?: number,
    labelSelector?: string,
    limit?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteStorageOrdiriComV1alpha1CollectionVolumeClaim(
      pretty,
      _continue,
      dryRun,
      fieldSelector,
      gracePeriodSeconds,
      labelSelector,
      limit,
      orphanDependents,
      propagationPolicy,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      body,
      _options
    );
    return result.toPromise();
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
  public deleteStorageOrdiriComV1alpha1Volume(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteStorageOrdiriComV1alpha1Volume(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
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
  public deleteStorageOrdiriComV1alpha1VolumeClaim(
    name: string,
    pretty?: string,
    dryRun?: string,
    gracePeriodSeconds?: number,
    orphanDependents?: boolean,
    propagationPolicy?: string,
    body?: IoK8sApimachineryPkgApisMetaV1DeleteOptions,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1Status> {
    const result = this.api.deleteStorageOrdiriComV1alpha1VolumeClaim(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      _options
    );
    return result.toPromise();
  }

  /**
   * get available resources
   */
  public getStorageOrdiriComV1alpha1APIResources(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1APIResourceList> {
    const result = this.api.getStorageOrdiriComV1alpha1APIResources(_options);
    return result.toPromise();
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
  public listStorageOrdiriComV1alpha1Volume(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeList> {
    const result = this.api.listStorageOrdiriComV1alpha1Volume(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public listStorageOrdiriComV1alpha1VolumeClaim(
    pretty?: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaimList> {
    const result = this.api.listStorageOrdiriComV1alpha1VolumeClaim(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public patchStorageOrdiriComV1alpha1Volume(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.patchStorageOrdiriComV1alpha1Volume(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
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
  public patchStorageOrdiriComV1alpha1VolumeClaim(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.patchStorageOrdiriComV1alpha1VolumeClaim(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
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
  public patchStorageOrdiriComV1alpha1VolumeClaimStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.patchStorageOrdiriComV1alpha1VolumeClaimStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
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
  public patchStorageOrdiriComV1alpha1VolumeStatus(
    name: string,
    body: any,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    force?: boolean,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.patchStorageOrdiriComV1alpha1VolumeStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      force,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified Volume
   * @param name name of the Volume
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readStorageOrdiriComV1alpha1Volume(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.readStorageOrdiriComV1alpha1Volume(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read the specified VolumeClaim
   * @param name name of the VolumeClaim
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readStorageOrdiriComV1alpha1VolumeClaim(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.readStorageOrdiriComV1alpha1VolumeClaim(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified VolumeClaim
   * @param name name of the VolumeClaim
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readStorageOrdiriComV1alpha1VolumeClaimStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.readStorageOrdiriComV1alpha1VolumeClaimStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * read status of the specified Volume
   * @param name name of the Volume
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   */
  public readStorageOrdiriComV1alpha1VolumeStatus(
    name: string,
    pretty?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.readStorageOrdiriComV1alpha1VolumeStatus(
      name,
      pretty,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified Volume
   * @param name name of the Volume
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceStorageOrdiriComV1alpha1Volume(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.replaceStorageOrdiriComV1alpha1Volume(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace the specified VolumeClaim
   * @param name name of the VolumeClaim
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceStorageOrdiriComV1alpha1VolumeClaim(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.replaceStorageOrdiriComV1alpha1VolumeClaim(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified VolumeClaim
   * @param name name of the VolumeClaim
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceStorageOrdiriComV1alpha1VolumeClaimStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1VolumeClaim> {
    const result = this.api.replaceStorageOrdiriComV1alpha1VolumeClaimStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
  }

  /**
   * replace status of the specified Volume
   * @param name name of the Volume
   * @param body
   * @param pretty If &#39;true&#39;, then the output is pretty printed.
   * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
   */
  public replaceStorageOrdiriComV1alpha1VolumeStatus(
    name: string,
    body: ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume,
    pretty?: string,
    dryRun?: string,
    fieldManager?: string,
    _options?: Configuration
  ): Promise<ComGithubOrdiriOrdiriPkgApisStorageV1alpha1Volume> {
    const result = this.api.replaceStorageOrdiriComV1alpha1VolumeStatus(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      _options
    );
    return result.toPromise();
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
  public watchStorageOrdiriComV1alpha1Volume(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchStorageOrdiriComV1alpha1Volume(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public watchStorageOrdiriComV1alpha1VolumeClaim(
    name: string,
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchStorageOrdiriComV1alpha1VolumeClaim(
      name,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public watchStorageOrdiriComV1alpha1VolumeClaimList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchStorageOrdiriComV1alpha1VolumeClaimList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
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
  public watchStorageOrdiriComV1alpha1VolumeList(
    allowWatchBookmarks?: boolean,
    _continue?: string,
    fieldSelector?: string,
    labelSelector?: string,
    limit?: number,
    pretty?: string,
    resourceVersion?: string,
    resourceVersionMatch?: string,
    timeoutSeconds?: number,
    watch?: boolean,
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgApisMetaV1WatchEvent> {
    const result = this.api.watchStorageOrdiriComV1alpha1VolumeList(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      _options
    );
    return result.toPromise();
  }
}

export class PromiseVersionApi {
  private api: ObservableVersionApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: VersionApiRequestFactory,
    responseProcessor?: VersionApiResponseProcessor
  ) {
    this.api = new ObservableVersionApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * get the code version
   */
  public getCodeVersion(
    _options?: Configuration
  ): Promise<IoK8sApimachineryPkgVersionInfo> {
    const result = this.api.getCodeVersion(_options);
    return result.toPromise();
  }
}
