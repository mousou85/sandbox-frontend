import type {ISuccessResponse} from './baseResponse.interface';

/**
 * 사용자 정보 조회 응답 인터페이스
 */
export interface IUserInfoResponse extends ISuccessResponse {
  data: {
    userIdx: number;
    id: string;
    name: string;
    useOtp: 'y' | 'n';
  };
}

/**
 * OTP 등록을 위한 정보 응답 인터페이스
 */
export interface IRequestRegisterOtpInfo extends ISuccessResponse {
  data: {
    secret: string;
    qrCodeImage: string;
  };
}

/**
 * OTP 등록 응답 인터페이스
 */
export interface IRegisterOtpResponse extends Pick<ISuccessResponse, 'isSuccessful'> {}
