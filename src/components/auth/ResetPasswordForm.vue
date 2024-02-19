<template>
  <Form class="wrapper-darkMain-form" @finish="onPostResetPassword">
    <h2 class="wrapper-darkMain-title">
      {{ $t('auth.recover-password') }}
    </h2>
    <div class="modal-inputs">
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

    <Button
      :name="$t('button.get-the-code')"
      type="default-blue"
      class="modal-btn"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.do-you-have-an-account') }}</h4>
      <span>__</span>
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toLogin')"
      >
        {{ $t('button.login') }}
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'
  import formatPhone from '@/helpers/formatPhone.js'

  import { postResetPasswordGetCode } from '@/actions/auth';

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    phone: string
  }

  interface Emits {
    (event: 'update:phone', value: string): void,
    (event: 'update:token', value: string): void,
    (event: 'toCheck'): Function,
    (event: 'toLogin'): Function,
  }

  defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const loading = ref(false)

  const onPostResetPassword = async ({ phone }: { phone: string }) => {
    loading.value = true;

    try {
      const response = await postResetPasswordGetCode(formatPhone(phone))
      toast({
        message: t('message.a-confirmation-code-has-been-sent-to-your-number'),
        type: 'success'
      })
      emit('update:phone', formatPhone(phone));
      emit('update:token', response);
      emit('toCheck');
    } catch (err) {
      if (err.response.data.detail === 'This number is not registered') {
        toast({
          message: t('errors.this-number-is-not-registered'),
          type: 'warning'
        })
      }
    } finally {
      loading.value = false
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
    & span {
      color: transparent;
    }
    &-title,
    &-btn {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    &-btn {
      color: var(--accent-color);
    }
  }
}
</style>
