<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">{{ $t('auth.registration') }}</h2>
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

    <div class="modal-btn">
      <Button
        name="Получить код"
        type="default-blue"
        :loading="loading"
        htmlType="submit"
      />
    </div>

    <div class="modal-message">
      <h4 class="modal-message-title">{{ $t('auth.do-you-have-an-account') }}  </h4>
      <RouterLink class="modal-message-btn" to="/auth/login">
        {{ $t('button.login') }}
      </RouterLink>
    </div>

    <div class="modal-doc" v-html="$t('agreement.registration-confirm')" />
  </Form>
</template>

<script setup lang="ts">
  import axios from "axios";

  import { ref } from "vue";
  import { useI18n } from 'vue-i18n'

  import { useToast } from "@/modules/toast";
  import formatPhone from "@/helpers/formatPhone.js";

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

  const loading = ref(false);

  const postRegister = ({ phone }: { phone: string }) => {
    loading.value = true;
    const url = `https://api.respublica-partiyasy.kz/api/v1/auth/register`;

    axios({
      method: "post",
      url: url,
      data: {
        phone: formatPhone(phone),
      },
    })
      .then((response) => {
        console.log("response", response);
        toast({
          message: t('message.a-confirmation-code-has-been-sent-to-your-number'),
          type: "success",
        });
        emit("update:phone", formatPhone(phone));
        emit("update:token", response.data.token);
        emit("toCheck");

        loading.value = false;
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.data.detail === "Phone number is already registered") {
          toast({
            message: "Номер телефона уже зарегистрирован!",
          });
        } else {
          toast({
            message: "Возникли ошибки при запросе",
          });
        }
        loading.value = false;
      });
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
