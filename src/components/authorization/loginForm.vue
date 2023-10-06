<template>
  <Form class="wrapper-darkMain-form" @finish="postLogin">
    <h2 class="wrapper-darkMain-title">Войти</h2>
    <div class="modal-inputs">
      <Input
        type="tel"
        light
        name="phone"
        placeholder="Ваш номер телефона"
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
      <div class="modal-helperBtns-checkbox">
        <input type="checkbox" name="remember" id="remember" />
        <label for="remember">Запомнить меня</label>
      </div>
      <RouterLink to="">
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
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toReg')"
      >
        <span>Зарегистрироваться</span>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';

import formatPhone from '../../helpers/formatPhone.js'

const { toast } = useToast()
const router = useRouter()

interface Emits {
  (event: 'toReg', value: Function): void,
}

const emit = defineEmits<Emits>()

const loading = ref(false)

const postLogin = ({ phone, password }: { phone: string, password: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/login`;
  const formData = new FormData();
  formData.append("username", formatPhone(phone));
  formData.append("password", password);

  axios({
    method: "post",
    url: url,
    data: formData
  })
    .then((response) => {
      console.log('response', response);

      toast({
        message: 'Вы успешно авторизованы',
        type: 'success'
      })
      
      setTimeout(() => {
        router.push('/client')
      }, 5000);
      loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
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

    &-checkbox {
      display: inline-flex;
      grid-gap: 10px;
    }
  }

  &-btn {
    width: 100%;
    margin-bottom: 50px;
  }

  &-message {
    &-title,
    & span {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & span {
      color: var(--accent-color);
    }
  }
}
</style>
