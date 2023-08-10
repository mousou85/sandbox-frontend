import {createPinia} from 'pinia';
import PrimeVue from 'primevue/config';
import {createApp} from 'vue';

import App from '@/App.vue';
import locale_ko from '@/i18n_test/ko.json';
import {router} from '@/router';
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
});

//set store: global store
const globalStore = useGlobalStore();
const SITE_NAME = import.meta.env.VITE_SITE_NAME;
globalStore.siteName = SITE_NAME;

//mount app
app.mount('#app');
