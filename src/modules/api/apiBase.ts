import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import * as qs from 'qs';
import type {Router} from 'vue-router';
import {useRouter} from 'vue-router';

import {ApiError} from '@/modules/api/apiError';
import type {IReissueTokenResponse} from '@/modules/api/interfaces';
import {useGlobalStore} from '@/stores';

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * API base class
 */
export class ApiBase {
  /**
   * axios 인스턴스
   * @protected
   */
  public axios: AxiosInstance;

  /**
   * access token 재발급 API URL
   * @protected
   */
  protected static readonly REISSUE_TOKEN_URL = `${AUTH_BASE_URL}/auth/reissue-token`;

  /**
   * API base url
   * @protected
   */
  protected baseUrl = AUTH_BASE_URL;

  /**
   * 인증 불필요한 API URL
   * @protected
   */
  protected excludeAuthUrls: string[] = [];

  /**
   * vue router
   * @protected
   */
  protected vueRouter: Router;

  /**
   * vue global store
   * @protected
   */
  protected globalStore;

  constructor(axiosConfig?: CreateAxiosDefaults) {
    this.vueRouter = useRouter();
    this.globalStore = useGlobalStore();

    //create axios instance
    let config: CreateAxiosDefaults = {
      baseURL: this.baseUrl,
      responseType: 'json',
      responseEncoding: 'utf8',
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    };
    if (axiosConfig) {
      config = {...config, ...axiosConfig};
    }

    this.axios = axios.create(config);

    //request interceptor
    this.axios.interceptors.request.use(this.onRequest, this.onErrorRequest);

    //response interceptor
    this.axios.interceptors.response.use(this.onResponse, this.onErrorResponse);
  }

  /**
   * request interceptor
   * @param config
   */
  protected onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const {url} = config;

    if (this.excludeAuthUrls.length && url && !this.excludeAuthUrls.includes(url)) {
      const accessToken = this.globalStore.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  };

  /**
   * request interceptor error
   * @param error
   */
  protected onErrorRequest = (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  /**
   * response interceptor
   * @param response
   */
  protected onResponse = (response: AxiosResponse): AxiosResponse<any> => {
    return response.data;
  };

  /**
   * response interceptor error
   * @param error
   */
  protected onErrorResponse = async (error: AxiosError | Error): Promise<ApiError> => {
    const _error = error as AxiosError;
    const {response} = _error;
    const originalConfig = _error?.config;
    const url = originalConfig ? originalConfig.url : undefined;

    if (response && response.status == 401 && url && !this.excludeAuthUrls.includes(url)) {
      const refreshToken = this.globalStore.refreshToken;

      try {
        const res = await this.axios.post(ApiBase.REISSUE_TOKEN_URL, {
          refreshToken,
        });
        if (res) {
          const {accessToken} = (res.data as IReissueTokenResponse).data;
          this.globalStore.accessToken = accessToken;
          return this.axios(originalConfig as AxiosRequestConfig);
        }
      } catch (err) {
        this.globalStore.doLogout();
        await this.vueRouter.push({name: 'login'});
      }
    }

    return Promise.reject(new ApiError(_error));
  };

  /**
   * method: get
   * @param url
   * @param params url query string
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.axios.get(url, {params});
  }

  /**
   * method: post
   * @param url
   * @param data form data
   */
  async post<T>(url: string, data?: Record<string, any>): Promise<T> {
    return this.axios.post(url, data);
  }

  /**
   * method: put
   * @param url
   * @param data form data
   */
  async put<T>(url: string, data?: Record<string, any>): Promise<T> {
    return this.axios.put(url, data);
  }

  /**
   * method: patch
   * @param url
   * @param data form data
   */
  async patch<T>(url: string, data?: Record<string, any>): Promise<T> {
    return this.axios.patch(url, data);
  }

  /**
   * method: delete
   * @param url
   * @param data form data
   */
  async delete<T>(url: string, data?: Record<string, any>): Promise<T> {
    return this.axios.delete(url, {data});
  }
}
