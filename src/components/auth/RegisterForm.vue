<template>
  <Form class="wrapper-darkMain-form" @finish="onPostRegister">
    <h2 class="wrapper-darkMain-title">{{ $t('auth.registration') }}</h2>
    <div class="modal-inputs">
      <Input
        light
        :min="17"
        type="tel"
        name="phone"
        :placeholder="$t('formdata.your-phone-number')"
        validation="phone"
        required
      />
    </div>

    <div class="modal-btn">
      <Button
        :name="$t('button.get-the-code')"
        type="default-blue"
        :loading="isLoading"
        htmlType="submit"
      />
    </div>

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.do-you-have-an-account') }}  </h4>
      <span>__</span>
      <RouterLink class="modal-message-btn" to="/auth/login">
        {{ $t('button.login') }}
      </RouterLink>
    </div>

    <div class="modal-doc" v-html="$t('agreement.registration-confirm')" />
  </Form>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from 'vue-i18n'

  import { useToast } from "@/modules/toast";
  import formatPhone from "@/helpers/formatPhone.js";

  import { postRegisterGetCode } from '@/actions/auth';

  const { t } = useI18n()
  const { toast } = useToast();

  interface IProps {
    phone: string;
  }

  interface Emits {
    (event: "update:phone", value: string): void;
    (event: "update:token", value: string): void;
    (event: "toCheck"): Function;
  }

  defineProps<IProps>();
  const emit = defineEmits<Emits>();

  const isLoading = ref(false);

  const onPostRegister = async ({ phone }: { phone: string }) => {
    isLoading.value = true;
    try {
      const response = await postRegisterGetCode(formatPhone(phone))

      toast({
        message: t('message.a-confirmation-code-has-been-sent-to-your-number'),
        type: "success"
      });
      emit("update:phone", formatPhone(phone));
      emit("update:token", response);
      emit("toCheck");
    } catch (err) {
      if (err.response.data.detail === "Phone number is already registered") {
        toast({
          message: t('errors.the-phone-number-is-already-registered'),
          type: 'warning'
        });
      }
    } finally {
      isLoading.value = false;
    }
  };
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
    margin-bottom: 20px;

    & span {
      color: transparent;
    }

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
  &-doc {
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
