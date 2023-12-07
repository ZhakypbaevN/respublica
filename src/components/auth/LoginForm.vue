<template>
  <div class="loginForm-inner">
    <Form class="wrapper-darkMain-form" @finish="postLogin" :ignores="loginWithPhone ? ['iin'] : ['phone']">
      <h2 class="wrapper-darkMain-title">{{ $t('button.login') }}</h2>

      <div  class="loginForm-inputs">
        <Transition>
          <div v-if="loginWithPhone">
            <Input
              type="tel"
              light
              name="phone"
              :placeholder="$t('formdata.your-phone-number')"
              validation="phone"
              :min="17"
              required
            />
          </div>

          <div v-else>
            <Input
              light
              name="iin"
              :placeholder="$t('formdata.your-iin')"
              mask="############"
              required
            />
          </div>
        </Transition>

        <Input
          light
          type="password"
          name="password"
          :placeholder="$t('formdata.password')"
          required
        />
      </div>

      <div class="loginForm-helperBtns">
        <Checkbox light name="remember">
          {{ $t('auth.remember-me') }}
        </Checkbox>
        <RouterLink to="/auth/reset-password">
          {{ $t('auth.forgot-your-password') }}
        </RouterLink>
      </div>

      <Button
        :name="$t('button.log-in-to-the-system')"
        type="default-blue"
        class="loginForm-btn"
        :loading="loading"
        htmlType="submit"
        :ignoreValidate="loginWithPhone ? ['iin'] : ['phone']"
      />
    </Form>

    <div class="loginForm-bottom">
      <h3 class="loginForm-or">
        <span>{{ $t('auth.or') }}</span>
      </h3>

      <button
        type="button"
        class="loginForm-message-btn switch"
        @click="() => $emit('changeMethod')"
      >
        {{
          loginWithPhone
            ? $t('auth.log-in-using-the-iin')
            : $t('auth.log-in-using-the-phone')
        }}
      </button>

      <div class="loginForm-message">
        <h4 class="loginForm-message-title">{{ $t('auth.don-not-you-have-an-account') }}</h4>
        <span>__</span>
        <RouterLink
          to="/auth/register"
          class="loginForm-message-btn"
        >
          {{ $t('auth.register') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/common/Checkbox.vue';

import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'

import api from '@/modules/api'
import { useToast } from '@/modules/toast'
import { useAuth } from '@/modules/auth'
import formatPhone from '@/helpers/formatPhone.js'

const { t } = useI18n()

interface IProps {
  loginWithPhone: boolean,
}
interface Emits {
  (event: 'changeMethod'): Function
}

const props = defineProps<IProps>()
defineEmits<Emits>()


// const { setUser } = useAuth()
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
      
      // setUser({
      //   access_token: response.data.access_token
      // })
      token.value = response.data.access_token;
      localStorage.setItem('access_token', response.data.access_token)
      sessionStorage.setItem('access_token', response.data.access_token)

      api.defaults.headers.common.Authorization =
        'Bearer' + ' ' + response.data.access_token

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
        message: t('message.you-have-been-successfully-logged-in'),
        type: 'success'
      })

      localStorage.setItem('USER_TYPE', response.data.role);
      localStorage.setItem('USER_ID', response.data['id']);
      localStorage.setItem('USER_DATA', JSON.stringify(response.data));
      loading.value = false;

      setTimeout(() => {
        if (response.data.role === 'admin') router.push('/admin')
        else if (response.data.role === 'manager') router.push('/manager')
        else if (response.data.role === 'editor') router.push('/media')
        else router.push('/client')
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
    & span {
      color: transparent;
    }
    
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
