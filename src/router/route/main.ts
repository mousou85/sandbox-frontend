import type {RouteRecordRaw} from 'vue-router';

import IndexView from '@/views/IndexView.vue';

export const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: IndexView,
    meta: {needLogin: true},
    children: [],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/user/LoginView.vue'),
  },
];
