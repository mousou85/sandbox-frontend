import {defineStore} from 'pinia';

interface IGlobalState {
  isMobile: boolean;
  SITE_NAME: string;
  user: IUserState;
}

interface IUserState {
  isLoggedIn: boolean;
  data: {
    userIdx: number;
    id: string;
    name: string;
    useOtp: 'y' | 'n';
  };
}

export const useGlobalStore = defineStore('globalStore', {
  state: (): IGlobalState => ({
    isMobile: false,
    SITE_NAME: '',
    user: {
      isLoggedIn: false,
      data: {
        userIdx: 0,
        id: '',
        name: '',
        useOtp: 'n',
      },
    },
  }),
  actions: {},
});
