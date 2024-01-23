<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">{{ $t('enter-your-details') }}</h2>

    <div class="modal-inputs">
      <Input
        light
        name="iin"
        :placeholder="$t('formdata.iin')"
        mask="############"
        required
      />

      <Input
        light
        name="lastname"
        :placeholder="$t('formdata.surname')"
        required
      />

      <Input
        light
        name="name"
        :placeholder="$t('formdata.name')"
        required
      />

      <Input
        light
        name="middleName"
        :placeholder="$t('formdata.middle-name')"
      />

      <Input
        light
        type="email"
        name="email"
        validation="email"
        placeholder="Email"
      />
     
      <Input
        light
        type="password"
        name="password"
        validation="password"
        v-model="firstPassword"
        :placeholder="$t('formdata.come-up-with-a-password')"
        required
      />

      <Input
        light
        type="password"
        validation="sameAs"
        :sameAs="firstPassword"
        :placeholder="$t('formdata.repeat-the-password')"
        required
      />
    </div>

    <Button
      class="modal-btn"
      :name="$t('auth.register')"
      type="default-blue"
      :loading="isLoading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.do-you-have-an-account') }} </h4>
      <RouterLink
        to="/auth/login"
        class="modal-message-btn"
      >
        {{ $t('button.login') }}
      </RouterLink>
    </div>
  </Form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n'

  import api from '@/modules/api'
  import { useToast } from '@/modules/toast'
  import { useAuth } from '@/modules/auth';

  import { postRegisterFinish, postLogin, getUserData } from '@/actions/auth';

  const { t } = useI18n()
  const { toast } = useToast()
  const { setUser } = useAuth()

  const router = useRouter()

  interface IProps {
    phone: string,
    token: string
  }
  const props = defineProps<IProps>()

  const isLoading = ref(false)
  const firstPassword = ref('');

  const postRegister = async (
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
    isLoading.value = true;

    try {
      await postRegisterFinish({
        "token": props.token,
        "password": password,
        "email": email.length ? email : null,
        "first_name": name,
        "last_name": lastname,
        "middle_name": middleName.length ? middleName : null,
        "iin": iin
      })
      onPostLoginData({password: password});
    } catch (err) {
      if (err.response.data.detail === 'IIN is already registered!') {
        toast({
          message: t('errors.message.the-iin-is-already-registered'),
          type: 'warning'
        })
      } else if (err.response.data.detail === 'Token is expired' || err.response.data.detail === 'Token is invalid') {
        toast({
          message: t('errors.the-processing-period-has-expired-repeat-again'),
          type: 'warning'
        })
      }
      isLoading.value = false
    }
  }

  const onPostLoginData = async ({ password }: { password: string }) => {
    const formData = new FormData();
    formData.append("username", props.phone);
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
        message: t('message.you-have-successfully-registered'),
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
