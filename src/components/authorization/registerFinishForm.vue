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
        type="password"
        name="password"
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
import moment from 'moment'

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
const token = ref()

console.log('iin', Number('030905-501046'));
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

      postLogin();
      // toast({
      //   message: 'Вы успешно зарегистрировались',
      //   type: 'success'
      // })
      
      // emit('toLogin')
      // loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
}

const postLogin = () => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/login`;

  const formData = new FormData();
  formData.append("username", props.phone);
  formData.append("password", firstPassword.value);

  axios({
    method: "post",
    url: url,
    data: formData
  })
    .then((response) => {
      console.log('response', response);

      token.value = response.data['access_token'];
      localStorage.setItem('TOKEN', token.value);
      
      getUserData();
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
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
      console.log('response', response);

      postParty(response.data)
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

const postParty = (data) => {
  loading.value = true;
  const url = `https://tri.codetau.com/partyCards`;
  const dateNow = moment().format('DD.M.YYYY');

  axios({
    method: "post",
    url: url,
    data: {
      "userID": data['id'],
      "dayOfAcceptance": dateNow,
      "dayOfRegistration": dateNow,
    
      "dayOfRequestToExitParty": null,
      "deleted": false,
    
      "name": data['first_name'],
      "lastName": data['last_name'],
      "middleName": data['middle_name'],
    
      "iin": data['iin'],
      "birthday": null,
      "phone": data['phone'],
      "email": null,
      "gender": null,
      "educationlevel": null,
      "specialization": null,
      "workPlace": null,
      "role": null,
    
      "region": null,
      "city": null,
      "streat": null,
      "home": null,
      "apartment": null,
    
      status: [
      ]
    }
  })
    .then((response) => {
      console.log('response', response);

      token.value = response.data['access_token'];
      localStorage.setItem('TOKEN', token.value);
      
      getUserData();
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
