<template>
  <Form class="wrapper-darkMain-form" @finish="postResetPassword">
    <h2 class="wrapper-darkMain-title">Восстановить пароль</h2>
    <div class="modal-inputs">
      <Input
        type="tel"
        light
        name="phone"
        placeholder="Ваш номер телефона"
        validation="phone"
        :min="17"
        required
      />
    </div>

    <Button
      name="Получить код"
      type="default-blue"
      class="modal-btn"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">У вас есть аккаунт?  </h4>
      <RouterLink
        class="modal-message-btn"
        to="/auth/login"
      >
        Войти
      </RouterLink>
    </div>
  </Form>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

// Modules
import { useToast } from '../../modules/toast'

// Helpers
import formatPhone from '../../helpers/formatPhone.js'

const { toast } = useToast()

interface IProps {
  phone: string
}

interface Emits {
  (event: 'update:phone', value: string): void,
  (event: 'update:token', value: string): void,
  (event: 'toCheck'): Function,
}

defineProps<IProps>()
const emit = defineEmits<Emits>()

const loading = ref(false)

const postResetPassword = ({ phone }: { phone: string }) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/auth/password/send-sms`;
    
  axios({
    method: "post",
    url: url,
    data: {
      "phone": formatPhone(phone),
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'На ваш номер был отправлен код для подтверждение',
        type: 'success'
      })
      emit('update:phone', formatPhone(phone));
      emit('update:token', response.data.token);
      emit('toCheck');

      loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      if (err.response.data.detail === 'This number is not registered') {
        toast({
          message: 'Этот номер не зарегистрирован!'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }

      // toast({
      //     message: 'Этот номер уже зарегистрирован!',
      //     type: 'warning'
      //   })
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
  }

  &-btn {
    width: 100%;
    margin-bottom: 50px;
  }

  &-message {
    &-title,
    & a {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & a {
      color: var(--accent-color);
    }
  }
}
</style>
