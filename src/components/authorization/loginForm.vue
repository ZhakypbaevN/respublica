<template>
  <div class="loginForm-inner">
    <Form class="wrapper-darkMain-form" @finish="postLogin" :ignores="loginWithPhone ? ['iin'] : ['phone']">
      <h2 class="wrapper-darkMain-title">Войти</h2>

      <div  class="loginForm-inputs">
        <Transition>
          <div v-if="loginWithPhone">
            <Input
              type="tel"
              light
              name="phone"
              placeholder="Ваш номер телефона"
              validation="phone"
              :min="17"
              required
            />
          </div>

          <div v-else>
            <Input
              light
              name="iin"
              placeholder="Ваш ИИН"
              mask="############"
              required
            />
          </div>
        </Transition>

        <Input
          light
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
      </div>

      <div class="loginForm-helperBtns">
        <Checkbox light name="remember">Запомнить меня</Checkbox>
        <RouterLink to="/auth/reset-password">
          Забыли пароль? 
        </RouterLink>
      </div>

      <Button
        name="Войти в систему"
        type="default-blue"
        class="loginForm-btn"
        :loading="loading"
        htmlType="submit"
        :ignoreValidate="loginWithPhone ? ['iin'] : ['phone']"
      />
    </Form>

    <div class="loginForm-bottom">
      <h3 class="loginForm-or">
        <span>или</span>
      </h3>

      <button
        type="button"
        class="loginForm-message-btn switch"
        @click="() => $emit('changeMethod')"
      >
        {{ loginWithPhone ? 'Войти с помощью ИИН' : 'Войти с помощью номера'}}
      </button>

      <div class="loginForm-message">
        <h4 class="loginForm-message-title">У вас нет аккаунта?  </h4>
        <RouterLink
          to="/auth/register"
          class="loginForm-message-btn"
        >
          Зарегистрироваться
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';

import formatPhone from '../../helpers/formatPhone.js'
import Checkbox from '../common/Checkbox.vue';

interface IProps {
  loginWithPhone: boolean,
}
interface Emits {
  (event: 'changeMethod'): Function
}

const props = defineProps<IProps>()
defineEmits<Emits>()


const { toast } = useToast()
const router = useRouter()

const loading = ref(false)
const token = ref();

const postLogin = ({ phone, iin, password }: { phone: string, iin: string, password: string }) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/auth/login`;

  const formData = new FormData();
  formData.append("username", props.loginWithPhone ? formatPhone(phone) : iin);
  formData.append("password", password);

  axios({
    method: "post",
    url: url,
    data: formData
  })
    .then((response) => {
      
      token.value = response.data['access_token'];
      localStorage.setItem('TOKEN', token.value);

      getUserData();
    })
    .catch((err) => {
      console.log('err', err);
      
      if (err.response.data.detail === 'Incorrect username or password') {
        toast({
          message: 'Неверный логин или пароль!'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      loading.value = false
    });
}

const getUserData = () => {
  const url = `https://api.respublica-partiyasy.kz/api/v1/users/me`;
  console.log('token.value', token.value);
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token.value
    }
  })
    .then((response) => {
      toast({
        message: 'Вы успешно авторизованы',
        type: 'success'
      })

      localStorage.setItem('USER_TYPE', 'client');
      localStorage.setItem('USER_ID', response.data['id']);
      localStorage.setItem('USER_DATA', JSON.stringify(response.data));
      loading.value = false;

      setTimeout(() => {
        router.push('/client')
      }, 300);
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

</script>

<style scoped lang="scss">
.wrapper-darkMain-form {
  margin-bottom: 40px;
}

.loginForm {
  &-inner {
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  &-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    margin-bottom: 14px;
  }

  &-or {
    margin-bottom: 30px;
    overflow: hidden;
    
    & span {
      display: inline-block;
      font-size: 20px;
      font-weight: 500;
      position: relative;
  
      &::after,
      &::before {
        content: '';
  
        display: block;
        width: 500px;
        height: 0;
  
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
  
        border-bottom: 1px solid rgba(white, .3);
      }
  
      &::before {
        right: 80px;
      }
  
      &::after {
        left: 80px;
      }
    }
  }

  &-helperBtns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &-btn {
    width: 100%;
  }

  &-message {
    &-title,
    &-btn {
      display: inline;
      font-size: 18px;
      font-weight: 500;

      &.switch {
        margin-bottom: 20px;
      }
    }

    &-btn {
      color: var(--accent-color);
    }
  }
}
</style>
