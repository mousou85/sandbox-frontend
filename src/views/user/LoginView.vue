<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

import {ApiError, AuthApi} from '@/modules/api';
import {useGlobalStore} from '@/stores';

//set vars: store, router
const globalStore = useGlobalStore();
const router = useRouter();

//set vars: api module
const authApi = new AuthApi();

const siteName = globalStore.siteName;

//set vars: login form data
const formData = reactive({
  id: '',
  password: '',
  authToken: '',
  validate: {
    id: {
      valid: true,
      msg: '',
    },
    password: {
      valid: true,
      msg: '',
    },
    authToken: {
      valid: true,
      msg: '',
    },
  },
});

//set vars: use OTP flag
const otpFormFlag = ref(false);

//set vars: error message box
const messageBox = ref('');

//set func: 로그인 처리
const doLogin = async () => {
  let isValid = true;
  messageBox.value = '';

  //폼 데이터 체크
  if (!formData.id) {
    isValid = false;
    formData.validate.id.valid = false;
    formData.validate.id.msg = 'ID를 입력해주세요.';
  } else {
    formData.validate.id.valid = true;
    formData.validate.id.msg = '';
  }
  if (!formData.password) {
    isValid = false;
    formData.validate.password.valid = false;
    formData.validate.password.msg = 'PASSWORD를 입력해주세요.';
  } else {
    formData.validate.password.valid = true;
    formData.validate.password.msg = '';
  }

  if (!isValid) return;

  try {
    const response = await authApi.login(formData.id, formData.password);
    const data = response.data;

    if ('needOTPVerify' in data) {
      otpFormFlag.value = true;
    } else {
      globalStore.doLogin({
        userIdx: data.userIdx,
        id: data.id,
        name: data.name,
        useOtp: data.useOtp,
      });
      globalStore.accessToken = data.accessToken;
      globalStore.refreshToken = data.refreshToken;

      await router.push({name: 'index'});
    }
  } catch (error) {
    messageBox.value = error instanceof ApiError ? error.message : String(error);
  }
};

//set func: OTP 인증
const verifyOTP = async () => {
  let isValid = true;
  messageBox.value = '';

  if (!formData.authToken) {
    isValid = false;
    formData.validate.authToken.valid = false;
    formData.validate.authToken.msg = 'OTP코드를 입력해주세요.';
  } else {
    formData.validate.authToken.valid = true;
    formData.validate.authToken.msg = '';
  }
  if (!isValid) return;

  try {
    const response = await authApi.verifyOTP(formData.id, formData.password, formData.authToken);
    const data = response.data;

    globalStore.doLogin({
      userIdx: data.userIdx,
      id: data.id,
      name: data.name,
      useOtp: data.useOtp,
    });
    globalStore.accessToken = data.accessToken;
    globalStore.refreshToken = data.refreshToken;

    await router.push({name: 'index'});
  } catch (error) {
    messageBox.value = error instanceof ApiError ? error.message : String(error);
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-content-center align-items-center">
    <template v-if="!otpFormFlag">
      <Card class="w-11 md:w-4">
        <template #title>
          <div class="text-center">{{ siteName }}</div>
        </template>
        <template #content>
          <form @submit.prevent="doLogin">
            <div class="field mb-5">
              <div class="p-float-label">
                <InputText
                  id="id"
                  v-model="formData.id"
                  class="w-full"
                  maxlength="100"
                  :class="{'p-invalid': !formData.validate.id.valid}"></InputText>
                <label for="id">ID</label>
              </div>
              <small v-if="!formData.validate.id.valid" class="p-error">{{
                formData.validate.id.msg
              }}</small>
            </div>
            <div class="field">
              <div class="p-float-label">
                <Password
                  id="password"
                  v-model="formData.password"
                  class="w-full"
                  inputClass="w-full"
                  :feedback="false"
                  :class="{'p-invalid': !formData.validate.password.valid}"></Password>
                <label for="password">PASSWORD</label>
              </div>
              <small v-if="!formData.validate.password.valid" class="p-error">{{
                formData.validate.password.msg
              }}</small>
            </div>
            <Message v-if="messageBox.length > 0" severity="error" :closable="false"
              >{{ messageBox }}
            </Message>
            <Button type="submit" label="LOGIN" icon="pi pi-check-circle" class="w-full"></Button>
          </form>
        </template>
      </Card>
    </template>
    <template v-else>
      <Card class="w-11 md:w-3">
        <template #title>
          <div class="text-center">{{ siteName }}</div>
        </template>
        <template #content>
          <form @submit.prevent="verifyOTP">
            <div class="field mb-3">Authentication code</div>
            <div class="field mb-3">
              <div class="p-normal-label">
                <InputText
                  v-model="formData.authToken"
                  class="w-full text-xl text-center"
                  maxlength="6"
                  placeholder="OTP 코드 입력"
                  :class="{'p-invalid': !formData.validate.authToken.valid}"></InputText>
              </div>
              <small v-if="!formData.validate.authToken.valid" class="p-error">{{
                formData.validate.authToken.msg
              }}</small>
            </div>
            <Message
              v-if="messageBox.length > 0"
              id="otpMessage"
              severity="error"
              :closable="false"
              class="text-xs"
              >{{ messageBox }}
            </Message>
            <Button type="submit" label="Verify" class="w-full"></Button>
          </form>
        </template>
      </Card>
    </template>
  </div>
</template>

<style scoped>
.p-card {
  -webkit-box-shadow: 3px 10px 10px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 10px 10px 5px rgba(0, 0, 0, 0.2);
}

.p-card :deep(.p-card-footer) {
  padding: 0;
}

.p-message#otpMessage :deep(.p-message-wrapper) {
  padding: 0.8rem 1rem;
}
</style>
