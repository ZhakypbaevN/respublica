<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Заказать звонок"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <Input
          name="position"
          placeholder="Введите тему званка"
          staticPlaceholder
          required
        />
        
        <Input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          autofocus
        />

        <Select
          name="region"
          placeholder="Выберите регион"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        />

        <Input
          type="tel"
          name="phone"
          placeholder="Ваш номер телефона"
          validation="phone"
          required
        />
      </div>
      
      <p class="feedbackModal-description">
        Продолжая, Вы выражаете согласие на сбор и обработку своих персональных данных не противоречащими законодательству Республики Казахстан способами, как на бумажных носителях, так и в электронном формате, в той мере, насколько это необходимо.
      </p>

      <div>
        <Button
          name="Заказать обратный звонок"
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
  &-description {
    color: var(--light-gray-color);
    margin-bottom: 50px;
  }
}

</style>
