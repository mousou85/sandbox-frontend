import {computed} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import {useGlobalStore} from '@/stores';
import IndexView from '@/views/IndexView.vue';

/**
 * 라우터 정의
 */
export default function () {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'index',
        component: IndexView,
        meta: {
          needLogin: true,
        },
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AboutView.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/LoginView.vue'),
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
