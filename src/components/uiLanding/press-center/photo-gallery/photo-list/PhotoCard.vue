<template>
  <button
    class="photoItem withZoomPreview"
  >
    <div class="photoItem-preview withZoomPreview-preview">
      <div
        class="photoItem-preview-img bg-cover withZoomPreview-preview-img"
        :style="`background-image:url('${getFileUrl(data.preview_image)}');`"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref } from "vue";
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'
  import getFileUrl from '@/helpers/getFileUrlByDate'

  import { IAlbomImage } from '@/types/photo-gallery';

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    data: IAlbomImage,
  }

  const props = defineProps<IProps>()

  const isLoading = ref(false);
  const token = localStorage.getItem('access_token');

  // Delete Photo
  const onDelete = () => {
    isLoading.value = true;
    const url = `https://api.respublica-partiyasy.kz/api/v1/admin/galleries/images/${props.data.id}`;
    console.log('props', props.data.id);
    axios({
      method: "delete",
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log('response', response);

        toast({
          message: t('message.the-photo-has-been-deleted'),
          type: 'success'
        })

        isLoading.value = false;
      })
      .catch((err) => {
        console.log('err', err);

        toast({
          message: 'Возникли ошибки при запросе'
        })
        isLoading.value = false;
      });
  }
</script>

<style scoped lang="scss">
.photoItem {
  border-radius: 10px;
  border: 2px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  padding: 0px !important;
  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
  }

  &-preview {
    width: 100%;

    &-img {
      padding-bottom: 68.75%;
    }
  }
}
</style>