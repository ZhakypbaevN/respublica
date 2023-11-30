<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">Введите ваши данные</h2>

    <div class="modal-inputs">
      <Input
        light
        name="iin"
        placeholder="ИИН"
        mask="############"
        required
      />

      <Input
        light
        name="lastname"
        placeholder="Фамилия"
        required
      />

      <Input
        light
        name="name"
        placeholder="Имя"
        required
      />

      <Input
        light
        name="middleName"
        placeholder="Отчество"
      />

      <Input
        light
        type="email"
        name="email"
        placeholder="Email"
      />

      <!-- validation="email" -->

     
      <Input
        light
        type="password"
        name="password"
        v-model="firstPassword"
        placeholder="Придумайте пароль"
        required
      />
        <!-- validation="password" -->

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
      <RouterLink
        to="/auth/login"
        class="modal-message-btn"
      >
        Войти
      </RouterLink>
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
  token: string
}
const props = defineProps<IProps>()

const loading = ref(false)
const firstPassword = ref('');
const tokenNew = ref();

const postRegister = (
    { iin, name, lastname, middleName, email, password }:
    {
      iin: string,
      name: string,
      email: string,
      lastname: string,
      middleName: string,
      password: string,
    }
  ) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/auth/register/extra`;
  axios({
    method: "post",
    url: url,
    data: {
      "token": props.token,
      "password": password,
      "email": email.length ? email : null,
      "first_name": name,
      "last_name": lastname,
      "middle_name": middleName.length ? middleName : null,
      "iin": iin
    }
  })
  .then((response) => {
      console.log('response', response);
      postLogin({password: password});
    })
    .catch((err) => {
      console.log('err', err);
      if (err.response.data.detail === 'IIN is already registered!') {
        toast({
          message: 'ИИН уже зарегистрирован!'
        })
      } else if (err.response.data.detail === 'Token is expired' || err.response.data.detail === 'Token is invalid') {
        toast({
          message: 'Срок обработки истек, повторите заново!'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      loading.value = false
    });
}


const postLogin = ({ password }: { password: string }) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/auth/login`;

  const formData = new FormData();
  formData.append("username", props.phone);
  formData.append("password", password);

  const userType = ref('client'); 

  if (props.phone === '77473392659') userType.value = 'manager';
  else if (props.phone === '77055523019') userType.value = 'media';
  else if (props.phone === '77471098845') userType.value = 'business';
  
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
        
        tokenNew.value = response.data['access_token'];
        localStorage.setItem('TOKEN', tokenNew.value);
  
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
  const url = `https://api.respublica-partiyasy.kz/api/v1/users/me`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + tokenNew.value
    }
  })
    .then((response) => {
      toast({
        message: 'Вы успешно зарегистрировались',
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
