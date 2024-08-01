import {AxiosRequestConfig} from 'axios';
import {CountryDataDTO} from '../types.ts';

export type HttpClient = {
  get: <T>(
    url: string,
    params?: RequestQueryParams
  ) => Promise<HttpResponse<T>>;
  post: <T, B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig
  ) => Promise<HttpResponse<T>>;
  put: <T, B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig
  ) => Promise<HttpResponse<T>>;
};

export type HttpResponse<T> = {
  status: number;
  data: T;
};

export type RequestQueryParams = Record<string, string>;

export type ActivitiesFiltersRequest = {
  preferences: string[];
};

export type ActivitiesFiltersResponse = {
  title: string;
  date: string;
  type: string;
  city: string;
  country: string;
};

export type ActivitiesTitlesResponse = string[];

export type CountriesCitiesResponse = {
  error: boolean;
  msg: string;
  data: CountryDataDTO[];
};
