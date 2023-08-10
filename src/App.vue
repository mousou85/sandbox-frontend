<script setup lang="ts">
import {onMounted} from 'vue';
import {RouterView, useRoute} from 'vue-router';

import TopMenu from '@/components/TopMenu.vue';
import {useGlobalStore} from '@/stores';
import LoginView from '@/views/user/LoginView.vue';

//set store, router
const globalStore = useGlobalStore();
const route = useRoute();

/*
 * life cycle hook
 */
onMounted(() => {
  /*
   * load/resize 이벤트에 모바일 여부 설정 메소드 설정
   */
  window.addEventListener('load', () => {
    setMobileFlag();
  });

  window.addEventListener('resize', () => {
    setMobileFlag();
  });
});

const setMobileFlag = () => {
  globalStore.isMobile = window.innerWidth <= 1024;
};
</script>

<template>
  <template v-if="route.name == 'login'">
    <main class="block h-screen">
      <LoginView />
    </main>
  </template>
  <template v-else>
    <header class="block"><TopMenu /></header>
    <main id="contents" class="block"><RouterView /></main>
  </template>

  <!--<header>
    <img alt="Vue logo" class="logo" src="assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>-->
</template>
