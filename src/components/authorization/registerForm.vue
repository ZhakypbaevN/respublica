<template>
  <Form class="wrapper-darkMain-form" @finish="postRegister">
    <h2 class="wrapper-darkMain-title">Регистрация</h2>
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

    <div class="modal-btn">
      <Button
        name="Получить код"
        type="default-blue"
        :loading="loading"
        htmlType="submit"
      />
    </div>

    <div class="modal-message">
      <h4 class="modal-message-title">У вас есть аккаунт?</h4>
      <RouterLink class="modal-message-btn" to="/auth/login"> Войти </RouterLink>
    </div>
    <div class="modal-doc">
      <span
        >Отправляя нам ваши контактные данные, вы соглашаетесь с
        <a href="/public/doc/ru/Политика конфиденциальности партии.pdf" target="_blank">политикой конфиденциалности</a> и
        <a href="/public/doc/ru/Соглашение .pdf" target="_blank">соглашением</a></span
      >
    </div>
  </Form>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

// Modules
import { useToast } from "../../modules/toast";

// Helpers
import formatPhone from "../../helpers/formatPhone.js";

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
  const url = `https://api.respublica.codetau.com/api/v1/auth/register`;

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
        message: "На ваш номер был отправлен код для подтверждение",
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
