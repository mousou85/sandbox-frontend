import {defineStore} from 'pinia';

interface IGlobalState {
  isMobile: boolean;
  SITE_NAME: string;
}

export const useGlobalStore = defineStore('global', {
  state: (): IGlobalState => ({
    isMobile: false,
    SITE_NAME: '',
  }),
  actions: {
    setMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
  },
});
