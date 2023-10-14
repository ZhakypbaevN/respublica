<template>
  <LogInFirstModal
    title="Чтобы записаться на прием Вам необходимо авторизоваться на портале или пройти регистрацию"
    @hide="emits('hide')"
    :show="props.show && !userType"
  />

  <Modal
    v-if="props.show && userType"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Записаться на прием"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <div>
          <label for="position">Тема звонка</label>
          <Input
            name="position"
            placeholder="Введите тему званка"
            staticPlaceholder
            required
          />
        </div>

        <div>
          <label for="position">Принимающее должностное лицо</label>
          <Select
            name="position"
            placeholder="Выберите из списка принимающее должностное лицо"
            staticPlaceholder
            :options="[
              {label: 'Алматы', value: 'Алматы'},
              {label: 'Астана', value: 'Астана'},
              {label: 'Караганда', value: 'Караганда'},
            ]"
            required
          />
        </div>

        <div>
          <label for="category">Категория вопроса/обращения</label>
          <Select
            name="category"
            placeholder="Выберите категорию вопроса/обращения"
            staticPlaceholder
            :options="[
              {label: 'Алматы', value: 'Алматы'},
              {label: 'Астана', value: 'Астана'},
              {label: 'Караганда', value: 'Караганда'},
            ]"
            required
          />
        </div>
      </div>
      
      <p class="feedbackModal-description">
        Мы Вам направим точную дату и время за 3 рабочих дня до даты проведения приема.
      </p>

      <div>
        <Button
          name="Записаться на прием"
          :loading="loading"
          htmlType="submit"
        />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import LogInFirstModal from './logInFirstModal.vue';

import { ref } from 'vue'

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()


const loading = ref(false);
const userType = localStorage.getItem('USER_TYPE');

const postFeedback = ({ name, phone, comment }: { name: string, phone: string, comment: string }) => {
  console.log('name', name);
  console.log('name', phone);
  console.log('name', comment);
}
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    & label {
      display: block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }

  &-description {
    font-size: 20px;
    font-weight: 500;
    color: var(--accent-color);
    margin-bottom: 44px;
  }
}

</style>
