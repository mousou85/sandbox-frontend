<script lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import {useToast} from 'primevue/usetoast';
import {computed, defineComponent, ref} from 'vue';

import {ApiError, UserApi} from '@/modules/api';
import {useGlobalStore} from '@/stores';

export default defineComponent({
  components: {
    Button,
    InputText,
    Toast,
    Dialog,
  },
  setup(props, {expose}) {
    //set vars: store, toast
    const globalStore = useGlobalStore();
    const toast = useToast();

    //set vars: user api
    const userApi = new UserApi();

    //set vars: otp use flag
    const isUseOtp = computed(() => globalStore.user.data.useOtp);

    //set vars: dialog visible flag
    const dialogVisible = ref(false);

    //set vars: otp 관련
    const otpSecret = ref('');
    const qrCodeURL = ref('');
    const inputVerifyToken = ref('');
    const invalidVerifyToken = ref('');

    //set func: OTP 설정 dialog 토글
    const toggleDialog = async (flag: 'show' | 'hide') => {
      try {
        if (flag == 'show') {
          //OTP 사용여부에 따라 처리 분리
          if (!isUseOtp.value) {
            const rsOtpQRCode = await userApi.requestRegisterOtpInfo();
            otpSecret.value = rsOtpQRCode.data.secret;
            qrCodeURL.value = rsOtpQRCode.data.qrCodeImage;
          }

          dialogVisible.value = true;
        } else {
          dialogVisible.value = false;
          inputVerifyToken.value = '';
          invalidVerifyToken.value = '';
        }
      } catch (err) {
        toast.add({
          severity: 'error',
          detail: err,
          life: 3000,
        });
        return false;
      }
    };

    //set func: OTP 등록 처리
    const OtpRegister = async () => {
      invalidVerifyToken.value = '';

      if (!inputVerifyToken.value) {
        invalidVerifyToken.value = 'OTP 코드를 입력해주세요.';
        return false;
      }

      //OTP 등록
      try {
        await userApi.registerOtp(otpSecret.value, inputVerifyToken.value);
      } catch (error) {
        invalidVerifyToken.value = error instanceof ApiError ? error.message : String(error);
        return false;
      }

      //회원 정보 갱신
      try {
        const userInfo = await userApi.getUserInfo();

        globalStore.setUserInfo({
          userIdx: userInfo.data.userIdx,
          id: userInfo.data.id,
          name: userInfo.data.name,
          useOtp: userInfo.data.useOtp,
        });

        await toggleDialog('hide');

        toast.add({
          severity: 'success',
          summary: 'OTP 등록 완료',
          life: 3000,
        });
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : String(err);
        toast.add({
          severity: 'error',
          detail: errorMessage,
          life: 3000,
        });
      }
    };

    //set func: OTP 해지 처리
    const OtpUnregister = async () => {
      invalidVerifyToken.value = '';

      if (!inputVerifyToken.value) {
        invalidVerifyToken.value = 'OTP 코드를 입력해주세요.';
        return false;
      }

      //OTP 해지
      try {
        await userApi.unregisterOtp(inputVerifyToken.value);
      } catch (error) {
        invalidVerifyToken.value = error instanceof ApiError ? error.message : String(error);
        return false;
      }

      //회원 정보 갱신
      try {
        const userInfo = await userApi.getUserInfo();

        globalStore.setUserInfo({
          userIdx: userInfo.data.userIdx,
          id: userInfo.data.id,
          name: userInfo.data.name,
          useOtp: userInfo.data.useOtp,
        });

        await toggleDialog('hide');

        toast.add({
          severity: 'success',
          summary: 'OTP 해지 완료',
          life: 3000,
        });
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : String(err);
        toast.add({
          severity: 'error',
          detail: errorMessage,
          life: 3000,
        });
      }
    };

    expose({toggleDialog});

    return {
      isUseOtp,
      dialogVisible,
      qrCodeURL,
      inputVerifyToken,
      invalidVerifyToken,
      OtpRegister,
      OtpUnregister,
    };
  },
});
</script>
<!--
<script setup lang="ts">
import {useToast} from 'primevue/usetoast';

import {ApiError, UserApi} from '@/modules/api';
import {useGlobalStore} from '@/stores';

//set vars: store, toast
const globalStore = useGlobalStore();
const toast = useToast();

//set vars: user api
const userApi = new UserApi();

//set vars: otp use flag
const isUseOtp = computed(() => globalStore.user.data.useOtp);

//set vars: dialog visible flag
const dialogVisible = ref(false);

//set vars: otp 관련
const otpSecret = ref('');
const qrCodeURL = ref('');
const inputVerifyToken = ref('');
const invalidVerifyToken = ref('');

//set func: OTP 설정 dialog 토글
const toggleDialog = async (flag: 'show' | 'hide') => {
  try {
    if (flag == 'show') {
      //OTP 사용여부에 따라 처리 분리
      if (!isUseOtp.value) {
        const rsOtpQRCode = await userApi.requestRegisterOtpInfo();
        otpSecret.value = rsOtpQRCode.data.secret;
        qrCodeURL.value = rsOtpQRCode.data.qrCodeImage;
      }

      dialogVisible.value = true;
    } else {
      dialogVisible.value = false;
      inputVerifyToken.value = '';
      invalidVerifyToken.value = '';
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      detail: err,
      life: 3000,
    });
    return false;
  }
};

//set func: OTP 등록 처리
const OtpRegister = async () => {
  invalidVerifyToken.value = '';

  if (!inputVerifyToken.value) {
    invalidVerifyToken.value = 'OTP 코드를 입력해주세요.';
    return false;
  }

  //OTP 등록
  try {
    await userApi.registerOtp(otpSecret.value, inputVerifyToken.value);
  } catch (error) {
    invalidVerifyToken.value = error instanceof ApiError ? error.message : String(error);
    return false;
  }

  //회원 정보 갱신
  try {
    const userInfo = await userApi.getUserInfo();

    globalStore.setUserInfo({
      userIdx: userInfo.data.userIdx,
      id: userInfo.data.id,
      name: userInfo.data.name,
      useOtp: userInfo.data.useOtp,
    });

    await toggleDialog('hide');

    toast.add({
      severity: 'success',
      summary: 'OTP 등록 완료',
      life: 3000,
    });
  } catch (err) {
    const errorMessage = err instanceof ApiError ? err.message : String(err);
    toast.add({
      severity: 'error',
      detail: errorMessage,
      life: 3000,
    });
  }
};

//set func: OTP 해지 처리
const OtpUnregister = async () => {
  invalidVerifyToken.value = '';

  if (!inputVerifyToken.value) {
    invalidVerifyToken.value = 'OTP 코드를 입력해주세요.';
    return false;
  }

  //OTP 해지
  try {
    await userApi.unregisterOtp(inputVerifyToken.value);
  } catch (error) {
    invalidVerifyToken.value = error instanceof ApiError ? error.message : String(error);
    return false;
  }

  //회원 정보 갱신
  try {
    const userInfo = await userApi.getUserInfo();

    globalStore.setUserInfo({
      userIdx: userInfo.data.userIdx,
      id: userInfo.data.id,
      name: userInfo.data.name,
      useOtp: userInfo.data.useOtp,
    });

    await toggleDialog('hide');

    toast.add({
      severity: 'success',
      summary: 'OTP 해지 완료',
      life: 3000,
    });
  } catch (err) {
    const errorMessage = err instanceof ApiError ? err.message : String(err);
    toast.add({
      severity: 'error',
      detail: errorMessage,
      life: 3000,
    });
  }
};

defineExpose({
  toggleDialog,
});
</script>
-->

<template>
  <Dialog
    header="OTP Setting"
    position="center"
    v-model:visible="dialogVisible"
    :dismissableMask="false"
    :closeOnEscape="false"
    :modal="true"
    :closable="true"
    :breakpoints="{'960px': '75vw', '640px': '95vw'}">
    <template v-if="isUseOtp">
      <div class="max-w-max">OTP를 해제하시겠습니까?</div>
      <div class="p-normal-label mt-3">
        <InputText
          v-model="inputVerifyToken"
          class="block w-full text-center text-xl"
          placeholder="OTP 코드 입력"
          maxlength="6"
          :class="{'p-invalid': invalidVerifyToken}"
          @keyup.enter="OtpUnregister"></InputText>
      </div>
      <small v-if="invalidVerifyToken" class="p-error">{{ invalidVerifyToken }}</small>

      <Button
        label="해제하기"
        class="block w-full mt-3 p-button-danger"
        @click="OtpUnregister"></Button>
    </template>
    <template v-else>
      <div class="max-w-max">아래 QR코드를 OTP 앱으로 촬영하여 등록하세요.</div>
      <img :src="qrCodeURL" alt="otp QR code" class="block mx-auto" />

      <div class="p-normal-label">
        <InputText
          v-model="inputVerifyToken"
          class="block w-full text-center text-xl"
          placeholder="OTP 코드 입력"
          maxlength="6"
          :class="{'p-invalid': invalidVerifyToken}"
          @keyup.enter="OtpRegister"></InputText>
      </div>
      <small v-if="invalidVerifyToken" class="p-error">{{ invalidVerifyToken }}</small>

      <Button label="등록" class="block w-full mt-3" @click="OtpRegister"></Button>
    </template>
  </Dialog>
  <Toast :breakpoints="{'960px': {width: '100%', right: '0', left: '0'}}"></Toast>
</template>
