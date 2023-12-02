<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">{{ $t('auth.new-password') }}</h2>

    <div class="modal-inputs">
      <Input
        light
        type="password"
        name="password"
        v-model="firstPassword"
        :placeholder="$t('formdata.come-up-with-a-password')"
        required
      />
        <!-- validation="password" -->

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
      :name="$t('button.save-the-password')"
      type="default-blue"
      :loading="loading"
      htmlType="submit"
    />
  </Form>
</template>

<script setup lang="ts">
import axios from 'axios'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';

import { useToast } from '@/modules/toast'

const { t } = useI18n()
const { toast } = useToast()

const router = useRouter()

interface IProps {
  phone: string,
  token: string
}

const props = defineProps<IProps>()

const loading = ref(false)
const firstPassword = ref('');

const postRegister = (
    { password }:
    {
      password: string,
    }
  ) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/auth/password/reset`;
  axios({
    method: "post",
    url: url,
    data: {
      "token": props.token,
      "password": password,
    }
  })
  .then((response) => {
      console.log('response', response);

      toast({
        message: t('message.the-password-has-been-successfully-changed'),
        type: 'success'
      })

      setTimeout(() => {
        router.push('/auth/login')
      }, 300);
      
      loading.value = false
    })
    .catch((err) => {
      
      console.log('err', err);
      if (err.response.data.detail === 'Token is expired' || err.response.data.detail === 'Token is invalid') {
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
}
</style>
