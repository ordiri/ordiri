export * from './apisApi';
import { ApisApi } from './apisApi';
export * from './computeOrdiriComApi';
import { ComputeOrdiriComApi } from './computeOrdiriComApi';
export * from './computeOrdiriComV1alpha1Api';
import { ComputeOrdiriComV1alpha1Api } from './computeOrdiriComV1alpha1Api';
export * from './coreOrdiriComApi';
import { CoreOrdiriComApi } from './coreOrdiriComApi';
export * from './coreOrdiriComV1alpha1Api';
import { CoreOrdiriComV1alpha1Api } from './coreOrdiriComV1alpha1Api';
export * from './customObjectsApi';
import { CustomObjectsApi } from './customObjectsApi';
export * from './networkOrdiriComApi';
import { NetworkOrdiriComApi } from './networkOrdiriComApi';
export * from './networkOrdiriComV1alpha1Api';
import { NetworkOrdiriComV1alpha1Api } from './networkOrdiriComV1alpha1Api';
export * from './storageOrdiriComApi';
import { StorageOrdiriComApi } from './storageOrdiriComApi';
export * from './storageOrdiriComV1alpha1Api';
import { StorageOrdiriComV1alpha1Api } from './storageOrdiriComV1alpha1Api';
export * from './versionApi';
import { VersionApi } from './versionApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [ApisApi, ComputeOrdiriComApi, ComputeOrdiriComV1alpha1Api, CoreOrdiriComApi, CoreOrdiriComV1alpha1Api, CustomObjectsApi, NetworkOrdiriComApi, NetworkOrdiriComV1alpha1Api, StorageOrdiriComApi, StorageOrdiriComV1alpha1Api, VersionApi];
