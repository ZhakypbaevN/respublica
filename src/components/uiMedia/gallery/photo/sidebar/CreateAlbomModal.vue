<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    :title="$t('gallery.creating-an-album')"
  >
    <Form
      @finish="createAlbom"
    >
      <div class="feedbackModal-inputs">
        <Upload
          class="feedbackModal-preview"
          v-model="formData.newPhotoFile"
          :preview="formData.preview"
          :aspectRatio="6 / 6"
          :height="200"
          :width="200"
          :previewBottom="100"
          required
        />
        
        <Input
          v-model="formData.title"
          name="name"
          :placeholder="$t('formdata.enter-a-name')"
          required
        />

        <Input
          v-model="formData.date"
          name="date"
          type="date"
          :placeholder="$t('formdata.enter-the-date')"
          required
        />
        
        <Select
          v-model="formData.place"
          name="region"
          :placeholder="$t('formdata.specify-the-area')"
          :options="regionList"
          required
        />
      </div>
      

      <Button
        :name="$t('button.send-a-request')"
        :loading="loading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import axios from 'axios'
import moment from 'moment';

import { onMounted, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useToast } from '@/modules/toast'

const { t } = useI18n()
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

const token = localStorage.getItem('access_token');

const loading = ref(false);
const regionList = ref([]);

const formData = reactive({
  title: null,
  date: null,
  place: null,
  preview: null,
  newPhotoFile: null
})

onMounted(() => {

const url = `https://api.respublica-partiyasy.kz/api/v1/parties/locations?offset=0&limit=100`;
axios({
  method: "get",
  url: url,
})
  .then((response) => {
    response.data.data.forEach(location => {
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

const createAlbom = () => {

  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/galleries/albums`;

  const data = new FormData();

  data.append("title", formData.title);
  data.append("place", formData.place);
  data.append("date", moment(formData.date).format('YYYY-MM-DD'));

  if (formData.newPhotoFile) data.append("preview_image", formData.newPhotoFile);

  axios({
    method: "post",
    url: url,
    data: data,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: t('message.the-album-has-been-successfully-created'),
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

<style scoped lang="scss">
.feedbackModal-preview {
  width: 300px;
}
</style>