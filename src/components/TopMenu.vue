<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import SplitButton from 'primevue/splitbutton';
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';

import {routeList} from '@/router';
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
    key: routeList.index.name,
    label: routeList.index.label,
    icon: routeList.index.topMenuIcon,
    to: routeList.index.path,
  },
  {
    key: routeList.invest.name,
    label: routeList.invest.label,
    icon: routeList.invest.topMenuIcon,
    to: '/',
  },
]);

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
  <template v-else></template>
</template>

<style scoped>
.p-menubar.gnb {
  border-radius: 0 0 6px 6px;
}

.p-menubar.gnb .p-menubar-root-list .p-menuitem .router-link-active {
  border: 1px solid #c0c0c0;
}
</style>
