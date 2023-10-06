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
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';
import moment from 'moment'

import formatPhone from '../../helpers/formatPhone.js'

const { toast } = useToast()
const router = useRouter()

interface Emits {
  (event: 'toReg', value: Function): void,
}

const emit = defineEmits<Emits>()

const loading = ref(false)
const token = ref();

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
      }, 300);
      
      token.value = response.data['access_token'];
      localStorage.setItem('TOKEN', token.value);

      getUserData();
      loading.value = false;
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
}

onMounted(() => {
  const dateNow = moment().format('DD.M.YYYY');
  console.log('dateNow', dateNow);
})

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
      


      localStorage.setItem('USER_ID', response.data['id']);
      // postParty(response.data)
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

// const postParty = (data) => {
//   loading.value = true;
//   const url = `https://tri.codetau.com/partyCards`;

//   axios({
//     method: "post",
//     url: url,
//     data: {
//       "userID": data['id'],
//       "dayOfAcceptance": Date.now,
//       "dayOfRegistration": Date.now,
    
//       "dayOfRequestToExitParty": null,
//       "deleted": false,
    
//       "name": data['first_name'],
//       "lastName": data['last_name'],
//       "middleName": data['middle_name'],
    
//       "iin": data['iin'],
//       "birthday": null,
//       "phone": data['phone'],
//       "email": null,
//       "gender": null,
//       "educationlevel": null,
//       "specialization": null,
//       "workPlace": null,
//       "role": null,
    
//       "region": null,
//       "city": null,
//       "streat": null,
//       "home": null,
//       "apartment": null,
    
//       status: [
//       ]
//     }
//   })
//     .then((response) => {
//       console.log('response', response);

//       token.value = response.data['access_token'];
//       localStorage.setItem('TOKEN', token.value);
      
//       getUserData();
//     })
//     .catch((err) => {
//       console.log('err', err);
//       toast({
//         message: 'Возникли ошибки при запросе'
//       })
//       loading.value = false
//     });
// }
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
