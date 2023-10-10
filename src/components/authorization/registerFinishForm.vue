<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">Введите ваши данные</h2>

    <div class="modal-inputs">
      <Input
        light
        name="iin"
        placeholder="ИИН*"
        mask="############"
        required
      />

      <Input
        light
        name="lastname"
        placeholder="Фамилия*"
        required
      />

      <Input
        light
        name="name"
        placeholder="Имя*"
        required
      />

      <Input
        light
        name="middleName"
        placeholder="Отчество*"
        required
      />

      <Input
        light
        type="email"
        name="email"
        placeholder="Email*"
        validation="email"
        required
      />

     
      <Input
        light
        type="password"
        name="password"
        validation="password"
        v-model="firstPassword"
        placeholder="Придумайте пароль"
        required
      />

      <Input
        light
        type="password"
        validation="sameAs"
        :sameAs="firstPassword"
        placeholder="Повторите пароль"
        required
      />
    </div>

    <Button
      class="modal-btn"
      name="Зарегистрироваться"
      type="default-blue"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">У вас есть аккаунт? </h4>
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toLogin')"
      >
        <span>Войти</span>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'

const { toast } = useToast()

interface IProps {
  phone: string,
  token: string
}
interface Emits {
  (event: 'toLogin', value: Function): void,
}

const props = defineProps<IProps>()
const emit = defineEmits<Emits>()

const loading = ref(false)
const firstPassword = ref('');

const postRegister = (
    { iin, name, lastname, middleName, password }:
    {
      iin: string,
      name: string,
      lastname: string,
      middleName: string,
      password: string,
    }
  ) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/register/extra`;
  axios({
    method: "post",
    url: url,
    data: {
      "token": props.token,
      "password": password,
      "first_name": name,
      "last_name": lastname,
      "middle_name": middleName,
      "iin": iin
    }
  })
  .then((response) => {
      console.log('response', response);

      toast({
        message: 'Вы успешно зарегистрировались',
        type: 'success'
      })
      
      emit('toLogin')
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
    margin-bottom: 30px;
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
