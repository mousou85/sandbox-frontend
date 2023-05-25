<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

import {useGlobalStore} from '@/stores';

const globalStore = useGlobalStore();
const router = useRouter();

//set vars: constants
const siteName = globalStore.siteName;
const isMobile = globalStore.isMobile;
const isLogin = globalStore.user.isLoggedIn;

//set vars: menu
const menus = ref([
  {
    key: 'home',
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/',
  },
]);
</script>

<template>
  <template v-if="!isMobile">
    <Menubar></Menubar>
  </template>
  <template v-else> </template>
</template>
