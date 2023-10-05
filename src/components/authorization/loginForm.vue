<template>
  <Form class="wrapper-darkMain-form" @finish="postFeedback">
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

const { toast } = useToast()
const router = useRouter()

interface IProps {
  phone: string,
  code: string
}

interface Emits {
  (event: 'update:phone', value: string): void,
  (event: 'update:code', value: string): void,
  (event: 'toReg', value: Function): void,
  (event: 'toCheck'): Function,
}

console.log('window.location.hostname', window.location.hostname);
console.log('window.location.protocol', window.location.protocol);

defineProps<IProps>()
const emit = defineEmits<Emits>()

const loading = ref(false)

const postFeedback = ({ phone, password }: { phone: string, password: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/login`;
  // const url = `${window.location.protocol}//${window.location.hostname}:3000/users`;

  console.log('phone', phone);
    
  axios({
    method: "post",
    url: url,
    data: {
      "phone": phone,
      "password": password
    }
  })
    .then((response) => {
      console.log('url', url);
      console.log('response', response);

      toast({
        message: 'Успешно авторизованы',
        type: 'success'
      })
      
      setTimeout(() => {
        router.push('/main-db')
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
