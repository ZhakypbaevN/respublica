<template>
  <Form class="wrapper-darkMain-form" @finish="postCheckCode">
    <h2 class="wrapper-darkMain-title">{{ $t('auth.enter-the-code') }}</h2>

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.we-have-sent-a-confirmation-code-to-the-number') }} <br> {{ formatPhoneNumber('7' + phone) }}</h4>
      
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toBack')"
      >
        <span> 
          {{ $t('button.to-change') }}
        </span>
      </button>
    </div>

    <div class="modal-inputs">
      <input
        type="tel"
        name="code"
        maxlength="1"
        @input="inputHandler(i)"
        v-for="i in 6" :key="i"
        :class="'input-code-' + i"
        autocomplete="off"
      >
    </div>

    <div class="modal-message">
      <TransitionGroup>
        <div v-if="time > 0">
          <h4 class="modal-message-title">{{ $t('auth.you-can-get-a-new-code-via') }} </h4>
          <span>{{ timeLeft }}</span>
        </div>
        <button
          v-else
          @click="newCode"
        >
          <span>{{ $t('button.send-it-again') }}</span>
        </button>
      </TransitionGroup>
    </div>

    <Button
      class="modal-btn"
      name="Готово"
      type="default-blue"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.do-you-have-an-account') }}  </h4>
      <button
      type="button"
        class="modal-message-btn"
        @click="() => $emit('toLogin')"
      >
        <span>{{ $t('button.login') }}</span>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'

  import formatPhoneNumber from '@/helpers/formatPhoneNumber.js'

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    phone: string,
    token: string,
    fromResetPassword: boolean
  }
  interface Emits {
    (event: 'toBack'): Function,
    (event: 'toLogin'): Function,
    (event: 'toNext'): Function,
  }

  const props = withDefaults(defineProps<IProps>(), {})
  const emit = defineEmits<Emits>()

  const verificationCode = ref('')
  const timeLeft = ref('01:00')
  const loading = ref(false)

  const inputHandler = (inputId: number) => {
    const previousInput = document.querySelector(`.input-code-${inputId - 1}`)
    const currentInput = document.querySelector(`.input-code-${inputId}`)
    const nextInput = document.querySelector(`.input-code-${inputId + 1}`)
    verificationCode.value = ''
    const inputs = document.querySelectorAll('input[name="code"]')
    for (const i of inputs) {
      verificationCode.value = verificationCode.value + i.value;
    }
    const btn = document.querySelectorAll('button[type="submit"]')
    if (verificationCode.value.length === 6) {
      for (const el of btn) {
        el.classList.remove('disabled')
      }
    } else {
      document.querySelectorAll('button[type="submit"]')
      for (const el of btn) {
        el.classList.add('disabled')
      }
    }
    if (currentInput.value.length > 0 && inputId !== 6) {
      nextInput.focus()
    }
    const backSpace = event => {
      if (event.keyCode === 8) {
        currentInput.value = null
        if (inputId !== 1) {
          previousInput.focus()
        }
      }
      if (verificationCode.value.length === 6) {
        for (const el of btn) {
          el.classList.remove('disabled')
        }
      } else {
        document.querySelectorAll('button[type="submit"]')
        for (const el of btn) {
          el.classList.add('disabled')
        }
      }
    }
    currentInput.addEventListener('keydown', backSpace)
  }

  const time = ref(60);
  const timer = setInterval(() => {
    time.value--;
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    timeLeft.value = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);

  const newCode = () => {
    clearInterval(timer);
  }

  const postCheckCode = () => {
    loading.value = true;
    const url = props.fromResetPassword
      ? 'https://api.respublica-partiyasy.kz/api/v1/auth/password/verify-sms'
      : 'https://api.respublica-partiyasy.kz/api/v1/auth/register/phone-confirm';
      
    axios({
      method: "post",
      url: url,
      data: {
        "code": verificationCode.value,
        "token": props.token
      }
    })
      .then((response) => {
        console.log('response', response);

        toast({
          message: t('message.the-code-has-been-successfully-confirmed'),
          type: 'success'
        })

        emit('toNext')
        loading.value = false
      })
      .catch((err) => {
        console.log('err', err);
        if (err.response.data.detail === 'Code is invalid') {
          toast({
            message: 'Неверный код!'
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
</script>

<style scoped lang="scss">
.modal {
  &-inputs {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-bottom: 40px;

    & input[name="code"] {
      display: block;
      width: 72px;
      height: 60px;

      padding: 10px;
      font-size: 3em;

      border-radius: 10px;
      border: 1px solid white;
      background-color: transparent;
    }
  }

  &-btn {
    width: 100%;
    margin-bottom: 50px;
  }

  &-message {
    margin-bottom: 50px;

    &-title,
    & span {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    &-btn {
      display: inline-block;
      margin-left: 5px;
    }

    & span{
      color: var(--accent-color);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
