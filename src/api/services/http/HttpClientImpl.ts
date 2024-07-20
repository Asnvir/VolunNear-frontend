import {HttpResponse, RequestQueryParams} from '../../types.ts';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {LocalStorageHelper} from '../../../helpers/types.ts';
import {AUTH_TOKEN} from '../../../utils/constants/routes.ts';
import {HttpClientService} from './types.ts';

export class HttpClientImpl implements HttpClientService {
  private static instance: HttpClientImpl | null = null;
  private axios: AxiosInstance;

  private constructor(private localStorageHelper: LocalStorageHelper) {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });
    this.axios.interceptors.request.use(
      config => {
        const token = this.localStorageHelper.getItem(AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(
    localStorageHelper: LocalStorageHelper
  ): HttpClientImpl {
    if (!HttpClientImpl.instance) {
      HttpClientImpl.instance = new HttpClientImpl(localStorageHelper);
    }
    return HttpClientImpl.instance;
  }

  get<T>(
    url: string,
    queryParams?: RequestQueryParams
  ): Promise<HttpResponse<T>> {
    return this.axios.get<T>(url, {params: queryParams});
  }

  post<T, B>(
    url: string,
    body: B,
    options: AxiosRequestConfig = {}
  ): Promise<HttpResponse<T>> {
    return this.axios.post<T>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }
}
