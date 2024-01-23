<template>
  <div class="loginForm-inner">
    <Form class="wrapper-darkMain-form" @finish="onPostLoginData" :ignores="loginWithPhone ? ['iin'] : ['phone']">
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
          validation="password"
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
        :loading="isLoading"
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

  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n'

  import api from '@/modules/api'
  import { useAuth } from '@/modules/auth';
  import { useToast } from '@/modules/toast'

  import { postLogin, getUserData } from '@/actions/auth';
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

  const { setUser } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const isLoading = ref(false)

  const onPostLoginData = async ({ phone, iin, password }: { phone: string, iin: string, password: string }) => {
    const formData = new FormData();
    formData.append("username", props.loginWithPhone ? formatPhone(phone) : iin);
    formData.append("password", password);

    isLoading.value = true;
    try {
      const response = await postLogin(formData);
      setUser({
        access_token: response
      })
      localStorage.setItem('access_token', response);
      sessionStorage.setItem('access_token', response);
  
      api.defaults.headers.common.Authorization =
        'Bearer' + ' ' + response;
  
      onGetUserData();
    } catch (err) {
      if (err.response.data.detail === 'Incorrect username or password') {
        toast({
          message: t('errors.invalid-username-or-password'),
          type: 'warning'
        })
      } 
      isLoading.value = false;
    }
  }

  const onGetUserData = async () => {
    try {
      const response = await getUserData();
  
      toast({
        message: t('message.you-have-been-successfully-logged-in'),
        type: 'success'
      })

      setTimeout(() => {
        if (response.role === 'admin') router.push('/admin')
        else if (response.role === 'manager') router.push('/manager')
        else if (response.role === 'editor') router.push('/media')
        else router.push('/client')
      }, 300);
    } finally {
      isLoading.value = false;
    }
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
