import {defineStore} from 'pinia';

import type {IUserInfo} from '@/interfaces';

/**
 * 글로벌 스토어 상태 인터페이스
 */
interface IGlobalStoreState {
  /**
   * 모바일 여부
   */
  isMobile: boolean;
  /**
   * 사이트 이름
   */
  SITE_NAME: string;
  /**
   * 액세스 토큰
   */
  accessToken?: string;
  /**
   * 리프레시 토큰
   */
  refreshToken?: string;
  /**
   * 로그인 유저 정보
   */
  user: IUserStoreState;
}

/**
 * 유저 스토어 상태 인터페이스
 */
interface IUserStoreState {
  /**
   * 로그인 여부
   */
  isLoggedIn: boolean;
  /**
   * 유저 정보
   */
  data?: IUserInfo;
}

/**
 * 글로벌 스토어 정의
 */
export const useGlobalStore = defineStore('globalStore', {
  state: (): IGlobalStoreState => ({
    isMobile: false,
    SITE_NAME: '',
    user: {
      isLoggedIn: false,
    },
  }),
  actions: {
    /**
     * 로그인 처리
     * @param payload
     */
    doLogin(payload: IUserInfo) {
      this.user.isLoggedIn = true;
      this.user.data = payload;
    },
    /**
     * 로그아웃 처리
     */
    doLogout() {
      this.user.isLoggedIn = false;
      this.user.data = undefined;
    },
  },
});
