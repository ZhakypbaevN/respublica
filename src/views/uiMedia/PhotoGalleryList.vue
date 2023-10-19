<template>
  <section class="wrapper-main">
    <div class="news wrapper">
      <div class="news-items">
        <label
          for="upload-files"
          class="news-addBlock"
        >
          <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          <h3 class="news-addBlock-title">Загрузите снимок</h3>

          <input
            type="file"
            id="upload-files"
            multiple
            style="display: none"
            @change="uploadFiles"
          />
        </label>


        <!-- <PhotoItem
          v-for="(file, key) of newPhotos"
          :key="file"
          :data="renderedImages[file.name]"
          @delete="deleteNewFile(key)"
        /> -->

        <PhotoItem
          v-for="(file, key) of photos"
          :key="file"
          :data="file"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, reactive } from "vue";
import { useToast } from '../../modules/toast'

import PhotoItem from "../../components/uiMedia/photoItem.vue"
import { onMounted } from 'vue';

const { toast } = useToast()

const newPhotos = ref([])
const isLoading = reactive({
  btn: false,
  page: true
})
const renderedImages = ref([])
const token = localStorage.getItem('TOKEN');

const photos = ref([
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg',
  'https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg'
])

// const deleteFile = (fileID) => {
//   photos.value = photos.value.filter(
//     (file) => file.id !== fileID
//   )
// }
const deleteNewFile = (file) => {
  newPhotos.value = [...newPhotos.value].filter(
    (item, index) => index !== file
  )
}

const uploadFiles = (event) => {
  if (event.target.files.length > 0) {
    newPhotos.value = [...newPhotos.value, ...event.target.files]
    renderedImages.value = []
    for (const file of newPhotos.value) {
      if (isImage(file.name)) {
        renderImg(file)
        postPhoto(file)
      }
    }
  }
}

const isImage = (fileName) => {
  const type = fileName.slice(fileName.length - 4)
  const imageTypes = ['.png', '.jpg', 'jpeg', '.gif', '.JPG']
  return imageTypes.includes(type)
}

const renderImg = async (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (event) => {
    renderedImages.value[file.name] = event.target.result
  }
}
onMounted(() => getPhotos());
const getPhotos = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles/images`;
  // const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=100&category_id=5`;

  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);

      photos.value = response.data;
      isLoading.page = false;
    })
    .catch((err) => {
      console.log('err', err);

      if (err.response.data.detail === 'Pending resignation request already exists.') {
        toast({
          message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      isLoading.page = false;
    });
}

// Send Send Photo
const postPhoto = (photo) => {
  isLoading.btn = true;
  // const url = `https://api.respublica.codetau.com/api/v1/admin/articles`;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles/images`;

  const formData = new FormData();
  // const data = {
  //   category_id: 5, 
  //   title: photo.name, 
  //   published: true
  // }
  // formData.append("article", JSON.stringify(data));

  formData.append("image", photo!);
  // formData.append("preview_image", photo!);

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

      photos.value.push(response.data)
      
      isLoading.btn = false;
    })
    .catch((err) => {
      console.log('err', err);

      if (err.response.data.detail === 'Pending resignation request already exists.') {
        toast({
          message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      isLoading.btn = false;
    });
}
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }

  &-addBlock {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 10px;
    border: 2px dashed var(--accent-color-op50);
    background-color: var(--accent-color-op05);

    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      border-color: var(--accent-color);
      background-color: var(--accent-color-op10);

      & .news-addBlock-title {
        color: var(--accent-color);
      }

      & svg {
        fill: var(--accent-color);
      }
    }

    &-title {
      font-size: 28px;
      color: var(--accent-color-op50);
      transition: all .3s ease-in-out;
    }

    & svg {
      height: 90px;
      width: 90px;

      fill: var(--accent-color-op50);
      transition: all .3s ease-in-out;
    }
  }
}
</style>