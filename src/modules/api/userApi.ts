import type {CreateAxiosDefaults} from 'axios';

import {ApiBase} from './apiBase';
import type {IRegisterOtpResponse, IRequestRegisterOtpInfo, IUserInfoResponse} from './interfaces';

/**
 * 유저 API class
 */
export class UserApi extends ApiBase {
  /**
   * 인증 불필요한 API URL
   * @protected
   */
  protected excludeAuthUrls = [];

  constructor(axiosConfig?: CreateAxiosDefaults) {
    super(axiosConfig);
  }

  /**
   * 사용자 정보 조회 API
   */
  async getUserInfo() {
    return this.get<IUserInfoResponse>('/user/info');
  }

  /**
   * 사용자 정보 수정 API
   * @param data
   */
  async editUserInfo(data: {name?: string; newPassword?: string; currentPassword?: string} = {}) {
    return this.patch<IUserInfoResponse>('/user/info', data);
  }

  /**
   * OTP 등록을 위한 정보 요청 API
   */
  async requestRegisterOtpInfo() {
    return this.get<IRequestRegisterOtpInfo>('/user/otp/register');
  }

  /**
   * OTP 등록 API
   * @param secret
   * @param token
   */
  async registerOtp(secret: string, token: string) {
    return this.post<IRegisterOtpResponse>('/user/otp/register', {secret, token});
  }

  /**
   * OTP 해제 API
   * @param token
   */
  async unregisterOtp(token: string) {
    return this.delete<IRegisterOtpResponse>('/user/otp', {otpToken: token});
  }
}
