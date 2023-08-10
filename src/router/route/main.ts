import type {RouteRecordRaw} from 'vue-router';

import IndexView from '@/views/IndexView.vue';

export default <RouteRecordRaw[]>[
  {
    name: 'index',
    path: '/',
    component: IndexView,
    meta: {needLogin: true},
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/user/LoginView.vue'),
  },
];
