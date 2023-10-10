<template>
  <div class="wrapper-main dark">
    <Header withoutTopAndNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <TransitionGroup>
          <LoginForm
            v-if="showForm.login"
            @toReg="showRegistrationForm"
          />


          <RegisterForm
            v-if="showForm.register"
            v-model:phone="checkData.phone"
            v-model:token="checkData.token"
            @toLogin="showLoginForm"
            @toCheck="showCheckForm"
          />


          <CheckCodeForm
            v-if="showForm.checkCode"
            :token="checkData.token"
            @toBack="() => {fromLogin ? showLoginForm() : showRegistrationForm()}"
            @toLogin="showLoginForm"
            @toNext="() => {fromLogin ? loginFinish() : showFinishRegistrationForm()}"
          />


          <RegisterFinishForm
            v-if="showForm.registerFinish"
            v-model:phone="checkData.phone"
            :token="checkData.token"
            @toLogin="showLoginForm"
          />
        </TransitionGroup>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import LoginForm from '../components/authorization/loginForm.vue';
import RegisterForm from '../components/authorization/registerForm.vue';
import RegisterFinishForm from '../components/authorization/registerFinishForm.vue';
import CheckCodeForm from '../components/authorization/checkCodeForm.vue';

const router = useRouter()
const route = useRoute()

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
  token: ''
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

onMounted(() => {
  if (route.params.logOrReg === 'login') showLoginForm()
  else if (route.params.logOrReg === 'register') showRegistrationForm()
})
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
