# .ComputeOrdiriComApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getComputeOrdiriComAPIGroup**](ComputeOrdiriComApi.md#getComputeOrdiriComAPIGroup) | **GET** /apis/compute.ordiri.com/ | 


# **getComputeOrdiriComAPIGroup**
> IoK8sApimachineryPkgApisMetaV1APIGroup getComputeOrdiriComAPIGroup()

get information of a group

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ComputeOrdiriComApi(configuration);

let body:any = {};

apiInstance.getComputeOrdiriComAPIGroup(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**IoK8sApimachineryPkgApisMetaV1APIGroup**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


