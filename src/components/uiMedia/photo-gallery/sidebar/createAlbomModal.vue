<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Создание альбома"
  >
    <Form
      @finish="createAlbom"
    >
      <div class="feedbackModal-inputs">
        <Input
          name="name"
          placeholder="Введите название"
          required
        />

        <Input
          name="date"
          type="date"
          placeholder="Введите дату"
          required
        />
        
        <Select
          name="region"
          placeholder="Укажите область"
          :options="regionList"
          v-model="region"
          required
        />
      </div>
      

      <Button
        name="Отправить заявку"
        :loading="loading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

// Modules
import { useToast } from '../../../../modules/toast'

const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish', value: any): void
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const token = localStorage.getItem('TOKEN');

const loading = ref(false);
const regionList = ref([]);
const region = ref(null);

onMounted(() => {

const url = `https://api.respublica.codetau.com/api/v1/parties/locations?offset=0&limit=100`;
axios({
  method: "get",
  url: url,
})
  .then((response) => {
    response.data.forEach(location => {
      regionList.value.push(
        {
          label: location.name,
          value: location.name
        }
      );
    });
  })
  .catch((err) => {
    console.log('err', err);

    toast({
      message: 'Возникли ошибки при запросе'
    })
    
  });
})

const createAlbom = (
    { name, date, region }: { name: string, date: string, date: string }
  ) => {

  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/galleries/albums`;

  axios({
    method: "post",
    url: url,
    data: {
      title: name,
      date: date,
      place: region
    },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Альбом успешно создан!',
        type: 'success'
      })
      
      emits('finish', response.data)
      setTimeout(() => {
        emits('hide')
      }, 300);

      loading.value = false
    })
    .catch((err) => {

      toast({
        message: 'Возникли ошибки при запросе'
      })

      console.log('err', err);
      loading.value = false
    });
}
</script>