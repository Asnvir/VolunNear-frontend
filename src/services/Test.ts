/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {ICheckStatusData, IGetDatasourceUrlData} from '../data-contracts.ts';
import {HttpClient, RequestParams} from '../api/types.ts/httpClient-client.ts';

export class Test<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags test-controller
   * @name GetDatasourceUrl
   * @request GET:/test/datasource-url
   * @response `200` `IGetDatasourceUrlData` OK
   */
  getDatasourceUrl = (params: RequestParams = {}) =>
    this.http.request<IGetDatasourceUrlData, any>({
      path: `/test/datasource-url`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags test-controller
   * @name CheckStatus
   * @request GET:/test/check-status
   * @response `200` `ICheckStatusData` OK
   */
  checkStatus = (params: RequestParams = {}) =>
    this.http.request<ICheckStatusData, any>({
      path: `/test/check-status`,
      method: 'GET',
      ...params,
    });
}
