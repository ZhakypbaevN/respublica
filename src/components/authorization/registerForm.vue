<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">Регистрация</h2>
    <div class="modal-inputs">
      <Input
        type="tel"
        light
        name="phone"
        placeholder="Ваш номер телефона"
        :min="17"
        required
      />
    </div>

    <div class="modal-btn">
      <Button
        name="Получить код"
        type="default-blue"
        :loading="loading"
        htmlType="submit"
      />
    </div>

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
  (event: 'toLogin', value: Function): void,
  (event: 'toCheck'): Function,
}

defineProps<IProps>()
const emit = defineEmits<Emits>()

const loading = ref(false)

const postRegister = ({ phone }: { phone: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/register`;
    
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
      emit('update:phone', phone);
      emit('update:token', response.token);
      emit('toCheck');
      loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })

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
    margin-bottom: 30px;
  }

  &-btn {
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
