import {computed} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import {useGlobalStore} from '@/stores';
import IndexView from '@/views/IndexView.vue';

/**
 * 라우터 목록
 */
export const routeList = {
  index: {
    name: 'index',
    path: '/',
    component: IndexView,
    meta: {needLogin: true},
    label: 'Home',
    topMenuIcon: 'pi pi-home',
  },
  login: {
    name: 'login',
    path: '/login',
    component: () => import('@/views/user/LoginView.vue'),
    label: 'Login',
  },
  invest: {
    name: 'invest',
    path: '/invest',
    meta: {needLogin: true},
    redirect: '/invest/history',
    label: 'Invest',
    topMenuIcon: 'pi pi-dollor',
  },
};

/**
 * 라우터 정의
 */
export default function () {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: routeList.index.path,
        name: routeList.index.name,
        component: routeList.index.component,
        meta: routeList.index.meta,
      },
      {
        path: routeList.login.path,
        name: routeList.login.name,
        component: routeList.login.component,
      },
      {
        path: routeList.invest.path,
        redirect: routeList.invest.redirect,
        meta: routeList.invest.meta,
      },
    ],
  });

  //set store
  const globalStore = useGlobalStore();

  //네비게이션 가드 설정
  router.beforeEach((to, from, next) => {
    const needLogin = to.matched.some((record) => record.meta.needLogin);
    const isLoggedIn = computed(() => globalStore.user.isLoggedIn);

    if (to.name == 'login' && isLoggedIn.value) {
      next({name: 'index'});
    }

    if (needLogin && !isLoggedIn.value) {
      next({name: 'login'});
    }

    next();
  });

  return router;
}
