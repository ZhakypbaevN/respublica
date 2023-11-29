<template>
  <div class="wrapper-main dark">
    <Header withoutNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <TransitionGroup>
          <LoginForm
            v-if="showForm.login && loginWithPhone"
            :loginWithPhone="true"
            @changeMethod="() => loginWithPhone = !loginWithPhone"
          />

          <LoginForm
            v-else-if="showForm.login"
            :loginWithPhone="false"
            @changeMethod="() => loginWithPhone = !loginWithPhone"
          />

          <!-- Check Code Form -->
          <CheckCodeForm
            v-if="showForm.checkCode"
            :phone="checkData.phone"
            :token="checkData.token"
            :fromResetPassword="fromResetPassword"
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

  import LoginForm from '@/components/authorization/LoginForm.vue';
  import RegisterForm from '@/components/authorization/RegisterForm.vue';
  import RegisterFinishForm from '@/components/authorization/RegisterFinishForm.vue';
  import CheckCodeForm from '@/components/authorization/CheckingCodeForm.vue';

  import ResetPasswordForm from '@/components/authorization/ResetPasswordForm.vue';
  import ResetPasswordFinishForm from '@/components/authorization/ResetPasswordFinishForm.vue';

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
