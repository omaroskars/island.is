/* tslint:disable */
/* eslint-disable */
/**
 * Application backend
 * This is provided as a reference to implement other backends.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    AddAttachmentDto,
    AddAttachmentDtoFromJSON,
    AddAttachmentDtoToJSON,
    Application,
    ApplicationFromJSON,
    ApplicationToJSON,
    CreateApplicationDto,
    CreateApplicationDtoFromJSON,
    CreateApplicationDtoToJSON,
    DeleteAttachmentDto,
    DeleteAttachmentDtoFromJSON,
    DeleteAttachmentDtoToJSON,
    UpdateApplicationDto,
    UpdateApplicationDtoFromJSON,
    UpdateApplicationDtoToJSON,
} from '../models';

export interface ApplicationControllerAddAttachmentRequest {
    id: string;
    addAttachmentDto: AddAttachmentDto;
}

export interface ApplicationControllerCreateRequest {
    createApplicationDto: CreateApplicationDto;
}

export interface ApplicationControllerDeleteAttachmentRequest {
    id: string;
    deleteAttachmentDto: DeleteAttachmentDto;
}

export interface ApplicationControllerFindAllRequest {
    typeId: string;
}

export interface ApplicationControllerFindOneRequest {
    id: string;
}

export interface ApplicationControllerUpdateRequest {
    id: string;
    updateApplicationDto: UpdateApplicationDto;
}

/**
 * 
 */
export class ApplicationApi extends runtime.BaseAPI {

    /**
     */
    async applicationControllerAddAttachmentRaw(requestParameters: ApplicationControllerAddAttachmentRequest): Promise<runtime.ApiResponse<Application>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling applicationControllerAddAttachment.');
        }

        if (requestParameters.addAttachmentDto === null || requestParameters.addAttachmentDto === undefined) {
            throw new runtime.RequiredError('addAttachmentDto','Required parameter requestParameters.addAttachmentDto was null or undefined when calling applicationControllerAddAttachment.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/application/{id}/attachments`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AddAttachmentDtoToJSON(requestParameters.addAttachmentDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplicationFromJSON(jsonValue));
    }

    /**
     */
    async applicationControllerAddAttachment(requestParameters: ApplicationControllerAddAttachmentRequest): Promise<Application> {
        const response = await this.applicationControllerAddAttachmentRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async applicationControllerCreateRaw(requestParameters: ApplicationControllerCreateRequest): Promise<runtime.ApiResponse<Application>> {
        if (requestParameters.createApplicationDto === null || requestParameters.createApplicationDto === undefined) {
            throw new runtime.RequiredError('createApplicationDto','Required parameter requestParameters.createApplicationDto was null or undefined when calling applicationControllerCreate.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/application`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateApplicationDtoToJSON(requestParameters.createApplicationDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplicationFromJSON(jsonValue));
    }

    /**
     */
    async applicationControllerCreate(requestParameters: ApplicationControllerCreateRequest): Promise<Application> {
        const response = await this.applicationControllerCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async applicationControllerDeleteAttachmentRaw(requestParameters: ApplicationControllerDeleteAttachmentRequest): Promise<runtime.ApiResponse<Application>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling applicationControllerDeleteAttachment.');
        }

        if (requestParameters.deleteAttachmentDto === null || requestParameters.deleteAttachmentDto === undefined) {
            throw new runtime.RequiredError('deleteAttachmentDto','Required parameter requestParameters.deleteAttachmentDto was null or undefined when calling applicationControllerDeleteAttachment.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/application/{id}/attachments`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: DeleteAttachmentDtoToJSON(requestParameters.deleteAttachmentDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplicationFromJSON(jsonValue));
    }

    /**
     */
    async applicationControllerDeleteAttachment(requestParameters: ApplicationControllerDeleteAttachmentRequest): Promise<Application> {
        const response = await this.applicationControllerDeleteAttachmentRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async applicationControllerFindAllRaw(requestParameters: ApplicationControllerFindAllRequest): Promise<runtime.ApiResponse<Array<Application>>> {
        if (requestParameters.typeId === null || requestParameters.typeId === undefined) {
            throw new runtime.RequiredError('typeId','Required parameter requestParameters.typeId was null or undefined when calling applicationControllerFindAll.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.typeId !== undefined) {
            queryParameters['typeId'] = requestParameters.typeId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/application`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ApplicationFromJSON));
    }

    /**
     */
    async applicationControllerFindAll(requestParameters: ApplicationControllerFindAllRequest): Promise<Array<Application>> {
        const response = await this.applicationControllerFindAllRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async applicationControllerFindOneRaw(requestParameters: ApplicationControllerFindOneRequest): Promise<runtime.ApiResponse<Application>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling applicationControllerFindOne.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/application/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplicationFromJSON(jsonValue));
    }

    /**
     */
    async applicationControllerFindOne(requestParameters: ApplicationControllerFindOneRequest): Promise<Application> {
        const response = await this.applicationControllerFindOneRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async applicationControllerUpdateRaw(requestParameters: ApplicationControllerUpdateRequest): Promise<runtime.ApiResponse<Application>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling applicationControllerUpdate.');
        }

        if (requestParameters.updateApplicationDto === null || requestParameters.updateApplicationDto === undefined) {
            throw new runtime.RequiredError('updateApplicationDto','Required parameter requestParameters.updateApplicationDto was null or undefined when calling applicationControllerUpdate.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/application/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateApplicationDtoToJSON(requestParameters.updateApplicationDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApplicationFromJSON(jsonValue));
    }

    /**
     */
    async applicationControllerUpdate(requestParameters: ApplicationControllerUpdateRequest): Promise<Application> {
        const response = await this.applicationControllerUpdateRaw(requestParameters);
        return await response.value();
    }

}
