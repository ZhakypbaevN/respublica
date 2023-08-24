<template>
  <Form class="wrapper-darkMain-form" @finish="postFeedback">
    <h2 class="wrapper-darkMain-title">Введите код</h2>

    <div class="modal-message">
      <h4 class="modal-message-title">Мы отправили код подтверждения на номер <br> {{ phone }}  </h4>
      <button
        type="button"
        @click="() => $emit('toReplace')"
      >
        <span> 
          Изменить
        </span>
      </button>
    </div>

    <div class="modal-inputs">
      <Input
        type="number"
        light
        name="code"
        placeholder="Введите код"
        required
      />
    </div>

    <div class="modal-message">
      <h4 class="modal-message-title">Получить новый код можно через </h4>
      <span>00:16</span>
    </div>

    <Button
      class="modal-btn"
      name="Готово"
      type="default-blue"
      :loading="loading"
      htmlType="submit"
    />

    <div class="modal-message">
      <h4 class="modal-message-title">У вас есть аккаунт?  </h4>
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
  phone: String,
}
interface Emits {
  (event: 'toLogin', value: Function): void,
  (event: 'toReplace', value: Function): void,
}

withDefaults(defineProps<IProps>(), {})
defineEmits<Emits>()

const loading = ref(false)

const postFeedback = ({ code }) => {
  // const url = "https://admin.passepartout.kz/message?token=AZ8uZkEqwncL5fm";
  // const bodyFormData = {
  //   title: name,
  //   message: `Телефон номер: ${phone},\r\nКомментарий: ${comment}`,
  //   priority: 5,
  // };

  // const formData = new FormData();
  // Object.keys(bodyFormData).forEach(key => formData.append(key, bodyFormData[key]));

  // loading.value = true
  // // Simple POST request with a JSON body using axios
  // axios({
  //   method: "post",
  //   url: url,
  //   data: formData,
  // })
  //   .then((response) => {
  //     toast({
  //       message: 'Ваша заявка успешно отправлена'
  //     })
  //     loading.value = false
  //     emits('hide')
  //   })
  //   .catch((err) => {
  //     toast({
  //       message: 'Возникли ошибки при запросе'
  //     })
  //     loading.value = false
  //   });
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

  &-message {
    margin-bottom: 50px;

    &-title,
    & span {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & span{
      color: var(--accent-color);
    }
  }
}
</style>
