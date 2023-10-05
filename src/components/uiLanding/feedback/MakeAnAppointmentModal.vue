<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Записаться на прием"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <div>
          <label for="position">Принимающее должностное лицо</label>
          <Select
            name="position"
            placeholder="Выберите из списка принимающее должностное лицо"
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
import { ref } from 'vue'
// import axios from 'axios'
// import { useToast } from '../../../modules/toast'
// const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()


const loading = ref(false)

const postFeedback = ({ name, phone, comment }: { name: string, phone: string, comment: string }) => {
  console.log('name', name);
  console.log('name', phone);
  console.log('name', comment);
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
