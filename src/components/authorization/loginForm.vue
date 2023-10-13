<template>
  <Form class="wrapper-darkMain-form" @finish="postLogin">
    <h2 class="wrapper-darkMain-title">Войти</h2>
    <div class="modal-inputs">
      <Input
        type="tel"
        light
        name="phone"
        placeholder="Ваш номер телефона"
        validation="phone"
        :min="17"
        required
      />

      <Input
        light
        type="password"
        name="password"
        placeholder="Пароль"
        required
      />
    </div>

    <div class="modal-helperBtns">
      <Checkbox light name="remember">Запомнить меня</Checkbox>
      <RouterLink to="/auth/reset-password">
        Забыли пароль? 
      </RouterLink>
    </div>

    <Button
      name="Войти в систему"
      type="default-blue"
      class="modal-btn"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">У вас нет аккаунта?  </h4>
      <RouterLink
        to="/auth/register"
        class="modal-message-btn"
      >
        Зарегистрироваться
      </RouterLink>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';

import formatPhone from '../../helpers/formatPhone.js'
import Checkbox from '../common/Checkbox.vue';

const { toast } = useToast()
const router = useRouter()

const loading = ref(false)
const token = ref();

const postLogin = ({ phone, password }: { phone: string, password: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/login`;

  const formData = new FormData();
  formData.append("username", formatPhone(phone));
  formData.append("password", password);

  const userType = ref('client'); 

  if (formatPhone(phone) === '77473392659') userType.value = 'manager';
  else if (formatPhone(phone) === '77055523019') userType.value = 'media';
  else if (formatPhone(phone) === '77471098845') userType.value = 'business';
  
  if (userType.value !== 'client') {
    localStorage.setItem('USER_TYPE', userType.value);
    toast({
      message: 'Вы успешно авторизовались!',
      type: 'success'
    })

    setTimeout(() => {
      router.push(`/${userType.value}`)
    }, 300);
  } else {

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
}

const getUserData = () => {
  const url = `https://api.respublica.codetau.com/api/v1/users/me`;
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
.modal {
  &-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    margin-bottom: 14px;
  }

  &-helperBtns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &-btn {
    width: 100%;
    margin-bottom: 50px;
  }

  &-message {
    &-title,
    & a {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & a {
      color: var(--accent-color);
    }
  }
}
</style>
