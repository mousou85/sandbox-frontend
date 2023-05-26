import type {ISuccessResponse} from './baseResponse.interface';

/**
 * 로그인 응답 인터페이스
 */
export interface ILoginResponse extends ISuccessResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    userIdx: number;
    id: string;
    name: string;
    useOtp: 'y' | 'n';
  };
}

/**
 * OTP 인증 필요 여부 응답 인터페이스
 */
export interface INeedOtpVerifyResponse extends ISuccessResponse {
  data: {needOTPVerify: boolean};
}

/**
 * 액세스 토큰 재발급 응답 인터페이스
 */
export interface IReissueTokenResponse {
  data: {accessToken: string};
}
