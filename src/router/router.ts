import {computed} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import {useGlobalStore} from '@/stores';

import {investRoute, mainRoute} from './route';

/**
 * 라우터 정의
 */
export default function () {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...mainRoute, ...investRoute],
  });

  //set store
  const globalStore = useGlobalStore();

  //네비게이션 가드 설정
  router.beforeEach((to, from, next) => {
    const needLogin = to.matched.some((record) => record.meta.needLogin);
    const isLoggedIn = computed(() => globalStore.user.isLoggedIn);

    if (to.name == 'login' && isLoggedIn.value) {
      next({name: 'index'});
      return;
    }

    if (needLogin && !isLoggedIn.value) {
      next({name: 'login'});
      return;
    }

    next();
    return;
  });

  return router;
}
