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

import {useGlobalStore} from '@/stores';

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export class ApiBase {
  /**
   * axios 인스턴스
   * @protected
   */
  protected axios: AxiosInstance;

  protected static readonly REISSUE_TOKEN_URL = `${AUTH_BASE_URL}/auth/reissue-token`;

  /**
   * API base url
   * @protected
   */
  protected baseUrl = 'http://localhost:5000';

  /**
   * 인증 불필요한 API URL
   * @protected
   */
  protected excludeAuthUrls: string[] = [];

  protected vueRouter: Router;
  protected globalStore;

  constructor(baseUrl?: string, axiosConfig?: CreateAxiosDefaults) {
    this.vueRouter = useRouter();
    this.globalStore = useGlobalStore();

    //set props
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

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

  protected onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const {url} = config;

    if (this.excludeAuthUrls.length && url && !this.excludeAuthUrls.includes(url)) {
      const accessToken = this.globalStore.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  }

  protected onErrorRequest(error: AxiosError | Error): Promise<AxiosError> {
    return Promise.reject(error);
  }

  protected onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  protected async onErrorResponse(error: AxiosError | Error): Promise<AxiosError> {
    const _error = error as AxiosError;
    const {response} = _error;
    const originalConfig = _error?.config;

    if (response && response.status == 401) {
      const refreshToken = this.globalStore.refreshToken;

      try {
        const res = await this.axios.post(ApiBase.REISSUE_TOKEN_URL, {
          refreshToken,
        });
        if (res) {
          this.globalStore.refreshToken = res.data.data.accessToken;
          return this.axios(originalConfig as AxiosRequestConfig);
        }
      } catch (err) {
        this.globalStore.doLogout();
        await this.vueRouter.push({name: 'login'});
      }
    }

    return Promise.reject(error);
  }
}
