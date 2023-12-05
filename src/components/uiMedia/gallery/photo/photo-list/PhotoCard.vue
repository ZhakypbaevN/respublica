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

    <!-- Delete Button -->
    <div class="photoItem-delete">
      <Button
        type="default-light-grey"
        @click="onDelete"
      >
        <SvgIcon
          name="trash-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>
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

    & .photoItem-delete {
      right: 10px;
    }
  }

  &-preview {
    width: 100%;

    &-img {
      padding-bottom: 68.75%;
    }
  }

  &-delete {
    height: 40px;
    
    position: absolute;
    right: -120px;
    top: 10px;
    z-index: 2;

    padding: 3px;
    border-radius: 10px;
    background-color: white;

    transition: all .3s ease-in-out;

    & button {
      height: 34px;
      width: 34px;
      padding: 0px !important;
      margin: 0px !important;

      &:hover {
        background-color: var(--red-color-op10) !important;
  
        & svg {
          stroke: var(--red-color);
        }
      }
    }
    
    & svg {
      height: 34px;
      width: 34px;
      stroke: var(--light-gray-color);

      transition: all .3s ease-in-out;
    }

  }
}
</style>