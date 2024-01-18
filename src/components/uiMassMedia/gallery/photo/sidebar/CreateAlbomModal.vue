<template>
  <Modal
    @hide="emits('hide')"
    class="feedbackModal"
    big
    :maxInner="990"
    :title="
      edit
        ? $t('gallery.editing-an-album')
        : $t('gallery.creating-an-album')
    "
  >
    <Form @finish="createAlbom" class="feedbackModal-form">
      <div class="feedbackModal-inner">
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
        
        <div class="feedbackModal-inputs">
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
      </div>

      <Button
        type="default-blue"
        :name="
          edit
            ? $t('button.edit')
            : $t('button.create')
        "
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
  import { IAlbom } from '@/types/photo-gallery';

  import { postAlbom, putAlbom } from '@/actions/uiMedia/photo-gallery';
  import { getLocationsList } from '@/actions/uiAdmin/locations';
  import getFileUrl from '@/helpers/getFileUrlByDate';

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    edit?: IAlbom
  }
  
  interface Emits {

    (event: 'update'): Function,
    (event: 'hide'): Function,
    (event: 'finish', value: any): void
    (event: 'update:edit', value: any): void
  }

  const emits = defineEmits<Emits>()
  const props = defineProps<IProps>()

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

    if (props.edit) {
      albomData.title = props.edit.title;
      albomData.date = moment(props.edit.date).format('YYYY-MM-DD');
      albomData.place = props.edit.place;
      albomData.preview = getFileUrl(props.edit.preview_image);
    }

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

      let dataEdit = {
        album: {
          title: albomData.title,
          place: albomData.place,
          date: moment(albomData.date).format('YYYY-MM-DD')
        },
        preview_image: albomData.newPhotoFile
      }
      
      const response = props.edit
        ? await putAlbom(props.edit.id, JSON.stringify(dataEdit))
        : await postAlbom(formData);

      if (response.data['id']) {
        toast({
          message: props.edit
            ? t('message.the-album-has-been-successfully-edited')
            : t('message.the-album-has-been-successfully-created'),
          type: 'success'
        })
        
        emits('finish', response.data);
        emits('update:edit', response.data);
        
        setTimeout(() => {
          emits('hide')
        }, 300);
      }

    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped lang="scss">
.feedbackModal {
  &-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-inner {
    width: 100%;

    display: flex;
    grid-gap: 30px;
    margin-bottom: 40px;
  }

  &-preview {
    width: 300px;
  }
}
</style>