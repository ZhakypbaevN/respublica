<template>
  <div class="createPhoto">
    <label
      for="upload-files"
    >
      <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
      <h3 class="createPhoto-title">Загрузите снимок</h3>

      <input
        type="file"
        id="upload-files"
        multiple
        style="display: none"
        @change="uploadFiles"
      />
    </label>

    <ImageCrop
      :show="isShowModal"
      :file="fileUrl"
      :width="880"
      :height="605"
      :aspectRatio="16/11"
      @newFile="(newCrop) => postPhoto(newCrop)"
      @hide="() => isShowModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';

// Components
import ImageCrop from '@/components/common/ImageCrop.vue'

// Module
import { useToast } from '@/modules/toast'

interface IProps {
  albomID: number
}

interface Emits {
  (event: 'newPhoto', value: any): void
}

const props = defineProps<IProps>()
const emit = defineEmits<Emits>()

const { toast } = useToast()
const isLoading = ref(false)
const token = localStorage.getItem('TOKEN');

const isShowModal = ref(false)
const fileUrl = ref()

const uploadFiles = (e) => {
  console.log('e', typeof e);
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    if (isImage(file.name)) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        fileUrl.value = String(reader.result)
        isShowModal.value = true;
      }
    }
  }
}

const isImage = (fileName) => {
  const type = fileName.slice(fileName.length - 4)
  const imageTypes = ['.png', '.jpg', 'jpeg', '.gif', '.JPG']
  return imageTypes.includes(type)
}

// Send Send Photo
const postPhoto = (photo) => {
  isLoading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/galleries/albums/${props.albomID}/images`;

  const formData = new FormData();
  formData.append("image", photo!);

  axios({
    method: "post",
    url: url,
    data: formData,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);

      toast({
        message: 'Фотография загружена',
        type: 'success'
      })

      emit('newPhoto', response.data)
      
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
.createPhoto {
  & label {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 20px;

    border-radius: 10px;
    border: 2px dashed var(--accent-color-op50);
    background-color: var(--accent-color-op05);

    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  &:hover {
    & label {
      border-color: var(--accent-color);
      background-color: var(--accent-color-op10);
    }

    & .createPhoto-title {
      color: var(--accent-color);
    }

    & svg {
      fill: var(--accent-color);
    }
  }

  &-title {
    font-size: 22px;
    color: var(--accent-color-op50);
    transition: all .3s ease-in-out;
  }

  & svg {
    height: 60px;
    width: 60px;

    fill: var(--accent-color-op50);
    transition: all .3s ease-in-out;
  }
}
</style>