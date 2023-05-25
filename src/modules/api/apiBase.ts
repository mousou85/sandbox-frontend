import type {AxiosInstance} from 'axios';
import axios from 'axios';
import * as qs from 'qs';
import {useRouter} from 'vue-router';

import {useGlobalStore} from '@/stores/global.store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export class ApiBase {
  /**
   * axios 인스턴스
   * @protected
   */
  protected axios: AxiosInstance;
  protected static readonly LOGIN_URL = '/auth/login';
  protected static readonly REISSUE_TOKEN_URL = '/auth/reissue-token';
  /**
   * 인증 불필요한 API URL
   * @protected
   */
  protected static readonly EXCLUDE_AUTH_URL = ['/user/login', '/user/refreshToken'];

  constructor() {
    const router = useRouter();
    const globalStore = useGlobalStore();

    this.axios = axios.create({
      baseURL: BASE_URL,
      responseType: 'json',
      responseEncoding: 'utf8',
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
  }
}
