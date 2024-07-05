import {HttpResponse, HttpClient} from './types.ts';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {iLocalStorageHelper} from '../helpers/types.ts';
import {AUTH_TOKEN} from '../utils/constants.ts';

export class HttpClientImpl implements HttpClient {
    private axios: AxiosInstance;

    constructor(private localStorageHelper: iLocalStorageHelper) {
        this.axios = axios.create({
            // baseURL: import.meta.env.VITE_BACKEND_URL,
            baseURL: 'http://localhost:3000',
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

    get<T>(url: string): Promise<HttpResponse<T>> {
        return axios.get<T>(url);
    }

    post<T, B>(url: string, body: B, options: AxiosRequestConfig = {}): Promise<HttpResponse<T>> {
        return axios.post<T>(url, body, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
    }
}
