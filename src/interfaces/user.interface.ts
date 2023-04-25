/**
 * 유저 정보 인터페이스
 */
export interface IUserInfo {
  /**
   * 유저 IDX
   */
  userIdx: number;
  /**
   * 유저 ID(이메일)
   */
  id: string;
  /**
   * 유저 이름
   */
  name: string;
  /**
   * OTP 사용 여부
   */
  useOtp: 'y' | 'n';
}
