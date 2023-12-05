<template>
  <Modal
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
          v-model="albomData.newPhotoFile"
          :preview="albomData.preview"
          :aspectRatio="6 / 6"
          :height="200"
          :width="200"
          :previewBottom="100"
          required
        />
        
        <Input
          v-model="albomData.title"
          name="name"
          :placeholder="$t('formdata.enter-a-name')"
          required
        />

        <Input
          v-model="albomData.date"
          name="date"
          type="date"
          :placeholder="$t('formdata.enter-the-date')"
          required
        />
        
        <Select
          v-model="albomData.place"
          name="region"
          :placeholder="$t('formdata.specify-the-area')"
          :options="locationsList"
          required
        />
      </div>
      

      <Button
        :name="$t('button.send-a-request')"
        :loading="isLoading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import moment from 'moment';

  import { useToast } from '@/modules/toast'

  import { postAlbom } from '@/actions/uiMedia/photo-gallery';
  import { getLocationsList } from '@/actions/uiAdmin/locations';

  const { t } = useI18n()
  const { toast } = useToast()

  interface Emits {
    (event: 'hide'): Function,
    (event: 'finish', value: any): void
  }

  const emits = defineEmits<Emits>()

  const isLoading = ref(false);
  const locationsList = ref(null);

  const albomData = reactive({
    title: null,
    date: null,
    place: null,
    preview: null,
    newPhotoFile: null
  })

  onMounted(async () => {
    const response = await getLocationsList()
    if (response) {
      locationsList.value = [];
      response.data.data.forEach(location => {
        locationsList.value.push(
          {
            label: location.name,
            value: location.name
          }
        )
      });
    }
  })

  const createAlbom = async () => {
    isLoading.value = true;

    try {
      const formData = new FormData();
      formData.append("title", albomData.title);
      formData.append("place", albomData.place);
      formData.append("date", moment(albomData.date).format('YYYY-MM-DD'));

      if (albomData.newPhotoFile) formData.append("preview_image", albomData.newPhotoFile);
      
      const response = await postAlbom(formData);

      toast({
        message: t('message.the-album-has-been-successfully-created'),
        type: 'success'
      })
      
      emits('finish', response.data);
      
      setTimeout(() => {
        emits('hide')
      }, 300);

      isLoading.value = false;

    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped lang="scss">
.feedbackModal-preview {
  width: 300px;
}
</style>