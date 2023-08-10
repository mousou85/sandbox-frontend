<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import PanelMenu from 'primevue/panelmenu';
import Sidebar from 'primevue/sidebar';
import SplitButton from 'primevue/splitbutton';
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';

import {useGlobalStore} from '@/stores';

const globalStore = useGlobalStore();
const router = useRouter();

//set vars: constants
const siteName = computed(() => globalStore.siteName);
const isMobile = computed(() => globalStore.isMobile);
const isLogin = computed(() => globalStore.user.isLoggedIn);

//set vars: menu
const topMenuList = ref([
  {
    key: 'home',
    label: 'Home',
    icon: 'pi pi-home',
    to: '/',
  },
  {
    key: 'invest',
    label: 'Invest',
    icon: 'pi pi-dollar',
    items: [
      {key: 'invest-history', label: 'history', to: '/invest/history'},
      {key: 'invest-group', label: 'group', to: '/invest/group'},
      {key: 'invest-item', label: 'item', to: '/invest/item'},
      {key: 'invest-unit', label: 'unit', to: '/invest/unit'},
    ],
  },
]);

//set vars: sidebar flag
const showSidebar = ref(false);

//set vars: logout menu
const logoutMenuList = ref([]);

//set func: login
const login = () => {
  router.push({name: routeList.login.name});
};

//set func: logout
const logout = () => {
  globalStore.doLogout();
  router.push({name: routeList.login.name});
};
</script>

<template>
  <template v-if="!isMobile">
    <Menubar :model="topMenuList" class="gnb">
      <template #end>
        <template v-if="isLogin">
          <SplitButton
            label="LOGOUT"
            icon="pi pi-sign-out"
            class="p-button-sm p-button-outlined p-button-rounded p-button-danger"
            :model="logoutMenuList"
            @click="logout" />
        </template>
        <template v-else>
          <Button
            label="LOGIN"
            class="p-button-sm p-button-outlined p-button-rounded p-button-info"
            icon="pi pi-sign-in"
            @click="login" />
        </template>
      </template>
    </Menubar>
  </template>
  <template v-else>
    <div class="p-menubar gnb">
      <a class="p-menubar-button" @click="showSidebar = !showSidebar">
        <i class="pi pi-bars"></i>
      </a>
      <div class="flex flex-grow-1 align-content-center">
        <h1 class="text-base flex-grow-1 text-center">{{ siteName }}</h1>
      </div>
    </div>
    <Sidebar v-model:visible="showSidebar" position="left">
      <template #header>
        <template v-if="isLogin">
          <SplitButton
            label="LOGOUT"
            icon="pi pi-sign-out"
            class="p-button-sm p-button-outlined p-button-rounded p-button-danger"
            :model="logoutMenuList"
            @click="logout"></SplitButton>
        </template>
        <template v-else>
          <Button
            label="LOGIN"
            class="p-button-sm p-button-outlined p-button-rounded p-button-info"
            icon="pi pi-sign-in"
            @click="login"></Button>
        </template>
      </template>
      <PanelMenu :model="topMenuList"> </PanelMenu>
    </Sidebar>
  </template>
</template>

<style scoped>
.p-menubar.gnb {
  border-radius: 0 0 6px 6px;
}

.p-menubar.gnb .p-menubar-root-list .p-menuitem .router-link-active {
  border: 1px solid #c0c0c0;
}
</style>
