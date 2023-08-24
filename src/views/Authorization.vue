<template>
  <div class="wrapper-main dark">
    <Header withoutTopAndNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <TransitionGroup>
          <LoginForm
            v-if="showForm.login"
            @toReg="showRegistrationForm"
            @toCheck="showCheckForm"
          />


          <RegisterForm
            v-if="showForm.register"
            @toLogin="showLoginForm"
            @toCheck="showCheckForm"
          />


          <CheckCodeForm
            v-if="showForm.checkCode"
            :phone="phoneForCheckCode"
            :fromLogin="fromLogin"
            @toLogin="showLoginForm"
            @toReplace="() => {}"
          />
        </TransitionGroup>
      </div>
    </div>

    <FooterMini />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/uiLanding/layouts/header.vue';
import FooterMini from '../components/uiLanding/layouts/footer-mini.vue';

import LoginForm from '../components/authorization/loginForm.vue';
import RegisterForm from '../components/authorization/registerForm.vue';
import CheckCodeForm from '../components/authorization/checkCodeForm.vue';
import { reactive, ref } from 'vue';

const showForm = reactive({
  login: true,
  checkCode: false,

  register: false,
})

const phoneForCheckCode = ref('');
const fromLogin = ref(false);

const objElementsToFalse = () => {
  for (const key in showForm) {
  if (Object.prototype.hasOwnProperty.call(showForm, key)) {
      showForm[key] = false;
    }
  }
}

const showRegistrationForm = () => {
  objElementsToFalse();
  showForm.register = true;
}

const showLoginForm = () => {
  objElementsToFalse();
  showForm.login = true;
}

const showCheckForm = (phone) => {
  fromLogin.value = showForm.login === true;
  objElementsToFalse();
  phoneForCheckCode.value = phone;
  showForm.checkCode = true;
}
</script>

<style scoped lang="scss">
.intro {
  padding-top: 34%;
  background: url('/img/uiLanding/intro-preview.jpg') center no-repeat;
  background-size: cover;

  position: relative;

  &-btns {
    display: flex;
    grid-gap: 30px;

    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
  }
}
</style>
