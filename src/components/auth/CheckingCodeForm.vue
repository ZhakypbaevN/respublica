<template>
  <Form class="wrapper-darkMain-form" @finish="onPostCheckCode">
    <h2 class="wrapper-darkMain-title">{{ $t('auth.enter-the-code') }}</h2>

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.we-have-sent-a-confirmation-code-to-the-number') }} <br> {{ formatPhoneNumber(phone) }}</h4>
      
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
          <h4 class="modal-message-title">{{ $t('auth.you-can-get-a-new-code-via') }}</h4>
          <span class="space">_</span>
          <span>{{ timeLeft }}</span>
        </div>
        <Button
          v-else
          loadingName="sk"
          :loading="isLoading.newCode"
          @click="onGetNewCode"
          class="modal-btn-newCode"
        >
          <span>{{ $t('button.send-it-again') }}</span>
        </Button>
      </TransitionGroup>
    </div>

    <Button
      class="modal-btn"
      name="Готово"
      type="default-blue"
      htmlType="submit"
      :loading="isLoading.form"
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
  import { ref, reactive, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'
  import { postCheckCode, postResetPasswordGetCode, postRegisterGetCode } from '@/actions/auth';

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
    (event: 'update:token', value: string): void,
  }

  const props = withDefaults(defineProps<IProps>(), {})
  const emit = defineEmits<Emits>()

  const verificationCode = ref('')
  const timeLeft = ref('01:00')
  const isLoading = reactive({
    form: false,
    newCode: false
  })

  const tokenValue = computed({
    get: () => props.token,
    set: (val) => emit('update:token', val)
  })

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

  const onPostCheckCode = async () => {
    isLoading.form = true;
    const url = props.fromResetPassword
      ? '/api/v1/auth/password/verify-sms'
      : '/api/v1/auth/register/phone-confirm';
    
    try {
      await postCheckCode(url, verificationCode.value, tokenValue.value)

      toast({
        message: t('message.the-code-has-been-successfully-confirmed'),
        type: 'success'
      })

      emit('toNext')
    } catch (err) {
      if (err.response.data.detail === 'Code is invalid') {
        toast({
          message: t('errors.invalid-code'),
          type: 'warning'
        })

      } else if (err.response.data.detail === 'Token is expired' || err.response.data.detail === 'Token is invalid') {
        toast({
          message: t('errors.the-processing-period-has-expired-repeat-again'),
          type: 'warning'
        })
      }
    } finally {
      isLoading.form = false
    }
  }

  const onGetNewCode = async () => {
    time.value = 60;
    // isLoading.newCode = true;

    // try {
    //   const response =
    //     props.fromResetPassword
    //       ? await postResetPasswordGetCode(props.phone)
    //       : await postRegisterGetCode(props.phone)
    //   tokenValue.value = response;
    //   toast({
    //     message: t('message.a-confirmation-code-has-been-sent-to-your-number'),
    //     type: "success"
    //   });
    //   clearInterval(timer);
    // } catch (err) {
    //   if (err.response.data.detail === 'This number is not registered') {
    //     toast({
    //       message: t('errors.this-number-is-not-registered'),
    //       type: 'warning'
    //     })
    //     emit('toBack')
    //   }
    //   if (err.response.data.detail === "Phone number is already registered") {
    //     toast({
    //       message: t('errors.the-phone-number-is-already-registered'),
    //       type: 'warning'
    //     });
    //     emit('toBack')
    //   }
    // } finally {
    //   isLoading.newCode = false;
    // }
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

    &-newCode {
      padding: 0px !important;
      
      &:hover {
        background-color: transparent !important;
      }
    }
  }

  &-message {
    margin-bottom: 50px;

    &-title,
    & span {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & span.space {
      color: transparent;
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
<style>
.modal-btn-newCode .sk-chase-dot:before {
  background: var(--accent-color) !important;
}
</style>
