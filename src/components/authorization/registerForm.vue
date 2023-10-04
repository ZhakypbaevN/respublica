<template>
  <Form class="wrapper-darkMain-form" @finish="postFeedback">
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
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'

const { toast } = useToast()

interface IProps {
  phone: string,
  code: string
}

interface Emits {
  (event: 'update:phone', value: string): void,
  (event: 'update:code', value: string): void,
  (event: 'toLogin', value: Function): void,
  (event: 'toCheck'): Function,
}

defineProps<IProps>()
const emit = defineEmits<Emits>()

const loading = ref(false)

function generateVerificationCode() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}

const postFeedback = ({ phone }: { phone: string }) => {
  const url = `http://localhost:3000/users`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      console.log('url', url);
      console.log('response', response);

      let finded = false;

      response.data.forEach(userData => {
        if (userData.phone === phone) finded = true;
      });

      if (finded) {
        toast({
          message: 'Этот номер уже зарегистрирован!',
          type: 'warning'
        })
      } else {
        toast({
          message: 'На ваш номер был отправлен код для подтверждение',
          type: 'success'
        })

        const code = generateVerificationCode();
        emit('update:phone', phone);
        emit('update:code', code);
        emit('toCheck');

        setTimeout(() => {
          alert('Код для подтверждения ' + code)
        }, 5000);
      }
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
