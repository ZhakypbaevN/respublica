<template>
  <div class="wrapper-main dark">
    <Header withoutNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <TransitionGroup>
          <!-- Login with Phone -->
          <LoginForm
            v-if="showForm.login && loginWithPhone"
            :loginWithPhone="true"
            @toResetPassword="showResetPasswordForm"
            @changeMethod="() => loginWithPhone = !loginWithPhone"
          />

          <!-- Login with IIN -->
          <LoginForm
            v-else-if="showForm.login"
            :loginWithPhone="false"
            @toResetPassword="showResetPasswordForm"
            @changeMethod="() => loginWithPhone = !loginWithPhone"
          />

          <!-- Check Code Form -->
          <CheckCodeForm
            v-if="showForm.checkCode"
            :phone="checkData.phone"
            :fromResetPassword="fromResetPassword"
            v-model:token="checkData.token"
            @toLogin="showLoginForm"
            @toBack="() => {fromResetPassword ? showResetPasswordForm() : showRegistrationForm()}"
            @toNext="() => {fromResetPassword ? showFinishResetPasswordForm() : showFinishRegistrationForm()}"
          />
          

          <!-- Register Form -->
          <RegisterForm
            v-if="showForm.register"
            v-model:phone="checkData.phone"
            v-model:token="checkData.token"
            @toCheck="showCheckForm"
          />

          <RegisterFinishForm
            v-if="showForm.registerFinish"
            v-model:phone="checkData.phone"
            :token="checkData.token"
          />


          <!-- Reset Pssword -->
          <ResetPasswordForm
            v-if="showForm.resetPassword"
            v-model:phone="checkData.phone"
            v-model:token="checkData.token"
            @toCheck="showCheckForm"
            @toLogin="showLoginForm"
          />

          <ResetPasswordFinishForm
            v-if="showForm.resetPasswordFinish"
            v-model:phone="checkData.phone"
            :token="checkData.token"
          />
        </TransitionGroup>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import LoginForm from '@/components/auth/LoginForm.vue';
  import RegisterForm from '@/components/auth/RegisterForm.vue';
  import RegisterFinishForm from '@/components/auth/RegisterFinishForm.vue';
  import CheckCodeForm from '@/components/auth/CheckingCodeForm.vue';

  import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue';
  import ResetPasswordFinishForm from '@/components/auth/ResetPasswordFinishForm.vue';

  const route = useRoute()

  interface ShowForm {
    [key: string]: boolean;
  }

  const showForm = reactive<ShowForm>({
    login: true,
    checkCode: false,

    register: false,
    registerFinish: false,

    resetPassword: false,
    resetPasswordFinish: false
  })
  const loginWithPhone = ref(true);
  const checkData = reactive({
    phone: '',
    token: ''
  });
  const fromResetPassword = ref(false);

  const objElementsToFalse = () => {
    for (const key in showForm) {
    if (Object.prototype.hasOwnProperty.call(showForm, key)) {
        showForm[key] = false;
      }
    }
  }

  const showCheckForm = () => {
    console.log('checkData', checkData.token);
    fromResetPassword.value = showForm.resetPassword === true;
    objElementsToFalse();
    showForm.checkCode = true;
  }

  const showLoginForm = () => {
    objElementsToFalse();
    showForm.login = true;
  }

  const showRegistrationForm = () => {
    objElementsToFalse();
    showForm.register = true;
  }

  const showFinishRegistrationForm = () => {
    objElementsToFalse();
    showForm.registerFinish = true;
  }

  const showResetPasswordForm = () => {
    objElementsToFalse();
    showForm.resetPassword = true;
  }

  const showFinishResetPasswordForm = () => {
    objElementsToFalse();
    showForm.resetPasswordFinish = true;
  }

  const checkRoute = () => {
    objElementsToFalse();
    if (route.params.logOrReg === 'register') showForm.register = true;
    else if (route.params.logOrReg === 'reset-password') showForm.resetPassword = true;
    else showForm.login = true;
  }

  onMounted(checkRoute)

  watch(
    () => route.params.logOrReg,
    checkRoute
  )
</script>

<style scoped lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-leave-active {
    position: absolute;
  }
</style>
