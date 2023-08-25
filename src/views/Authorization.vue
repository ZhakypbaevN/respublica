<template>
  <div class="wrapper-main dark">
    <Header withoutTopAndNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <TransitionGroup>
          <LoginForm
            v-if="showForm.login"
            v-model:phone="checkData.phone"
            v-model:code="checkData.code"
            @toReg="showRegistrationForm"
            @toCheck="showCheckForm"
          />


          <RegisterForm
            v-if="showForm.register"
            v-model:phone="checkData.phone"
            v-model:code="checkData.code"
            @toLogin="showLoginForm"
            @toCheck="showCheckForm"
          />


          <CheckCodeForm
            v-if="showForm.checkCode"
            :phone="checkData.phone"
            :checkCode="checkData.code"
            @toBack="() => {fromLogin ? showLoginForm() : showRegistrationForm()}"
            @toLogin="showLoginForm"
            @toNext="() => {fromLogin ? loginFinish() : showFinishRegistrationForm()}"
          />


          <RegisterFinishForm
            v-if="showForm.registerFinish"
            v-model:phone="checkData.phone"
            @toLogin="showLoginForm"
          />
        </TransitionGroup>
      </div>
    </div>

    <FooterMini />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import Header from '../components/uiLanding/layouts/header.vue';
import FooterMini from '../components/uiLanding/layouts/footer-mini.vue';

import LoginForm from '../components/authorization/loginForm.vue';
import RegisterForm from '../components/authorization/registerForm.vue';
import RegisterFinishForm from '../components/authorization/registerFinishForm.vue';
import CheckCodeForm from '../components/authorization/checkCodeForm.vue';


const router = useRouter()

interface ShowForm {
  [key: string]: boolean;
}

const showForm = reactive<ShowForm>({
  login: true,
  checkCode: false,

  register: false,
  registerFinish: false,
})

const checkData = reactive({
  phone: '',
  code: ''
});
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

const showCheckForm = () => {
  fromLogin.value = showForm.login === true;
  objElementsToFalse();
  showForm.checkCode = true;
}

const showFinishRegistrationForm = () => {
  objElementsToFalse();
  showForm.registerFinish = true;
}

const loginFinish = () => {
  router.push('/main-db')
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
