<template>
  <Form class="wrapper-darkMain-form" @finish="$emit('toNext')">
    <h2 class="wrapper-darkMain-title">Введите код</h2>

    <div class="modal-message">
      <h4 class="modal-message-title">Мы отправили код подтверждения на номер <br> {{ phone }}</h4>
      
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toBack')"
      >
        <span> 
          Изменить
        </span>
      </button>
    </div>

    <div class="modal-inputs">
      <Input
        light
        name="code"
        placeholder="Введите код"
        validation="sameAs"
        :sameAs="checkCode"
        mask="######"
        :min="4"
        required
      />
    </div>

    <div class="modal-message">
      <TransitionGroup>
        <div v-if="time > 0">
          <h4 class="modal-message-title">Получить новый код можно через </h4>
          <span>{{ timeLeft }}</span>
        </div>
        <button
          v-else
          @click="newCode"
        >
          <span>Отправить еще раз</span>
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
// import axios from 'axios'
// import { useToast } from '../../modules/toast'

// const { toast } = useToast()

interface IProps {
  phone: string,
  checkCode: string,
}
interface Emits {
  (event: 'toBack', value: Function): void,
  (event: 'toLogin', value: Function): void,
  (event: 'toNext', value: Function): void,
}

withDefaults(defineProps<IProps>(), {})
defineEmits<Emits>()

const timeLeft = ref('01:00')
const loading = ref(false)

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
