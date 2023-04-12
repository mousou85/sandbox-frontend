import {createPinia} from 'pinia';
import {createApp} from 'vue';

import App from '@/App.vue';

import router from '@/router';
import {useGlobalStore} from '@/stores/global.store';

import '@/assets/main.css';

//create app
const app = createApp(App);
app.use(createPinia());
app.use(router);

//set vars: store
const SITE_NAME = import.meta.env.VITE_SITE_NAME;
useGlobalStore().SITE_NAME = SITE_NAME;

//mount app
app.mount('#app');
