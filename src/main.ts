import {createPinia} from 'pinia';
import PrimeVue from 'primevue/config';
import {createApp} from 'vue';

import App from '@/App.vue';
import locale_ko from '@/i18n/ko.json';
import router from '@/router';
import {useGlobalStore} from '@/stores/global.store';

import 'primevue/resources/primevue.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/assets/main.css';

//create app
const app = createApp(App);
app.use(createPinia());
app.use(router());
app.use(PrimeVue, {
  ripple: true,
  locale: locale_ko.ko,
  // locale: {
  //   dateFormat: 'yy-mm-dd',
  //   dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  //   dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  //   dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  //   monthNames: [
  //     '1월',
  //     '2월',
  //     '3월',
  //     '4월',
  //     '5월',
  //     '6월',
  //     '7월',
  //     '8월',
  //     '9월',
  //     '10월',
  //     '11월',
  //     '12월',
  //   ],
  //   monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  //   today: '오늘',
  //   weekHeader: '주',
  // },
});

//set store: global store
const globalStore = useGlobalStore();
const SITE_NAME = import.meta.env.VITE_SITE_NAME;
globalStore.siteName = SITE_NAME;

//mount app
app.mount('#app');
