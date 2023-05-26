import type {CreateAxiosDefaults} from 'axios';

import {ApiBase} from './apiBase';
import type {ILoginResponse, INeedOtpVerifyResponse, IReissueTokenResponse} from './interfaces';

/**
 * 인증 API class
 */
export class AuthApi extends ApiBase {
  /**
   * 인증 불필요한 API URL
   * @protected
   */
  protected excludeAuthUrls = ['/auth/login', '/auth/verify-otp', '/auth/reissue-token'];

  constructor(axiosConfig?: CreateAxiosDefaults) {
    super(axiosConfig);
  }

  /**
   * 로그인 API
   * @param userId
   * @param password
   */
  async login(userId: string, password: string) {
    return await this.post<ILoginResponse | INeedOtpVerifyResponse>('/auth/login', {
      userId,
      password,
    });
  }

  /**
   * OTP 인증 API
   * @param userId
   * @param password
   * @param token
   */
  async verifyOTP(userId: string, password: string, token: string) {
    return await this.post<ILoginResponse>('/auth/verify-otp', {userId, password, token});
  }

  /**
   * 액세스 토큰 재발급 API
   * @param refreshToken
   */
  async reissueToken(refreshToken: string) {
    return await this.post<IReissueTokenResponse>('/auth/reissue-token', {refreshToken});
  }
}
