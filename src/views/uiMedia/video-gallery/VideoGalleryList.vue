<template>
  <section class="wrapper-main">
    <div class="news wrapper">

      <div class="news-header">
        <Input
          placeholder="Поиск по проекту"
          staticPlaceholder
        />
        <RouterLink to="/media/video-gallery/create">
          <Button
            class="news-header-addNewsBtn"
            type="default-blue"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </RouterLink>
      </div>
      <div class="news-items">
        <YoutubeItem
          v-for="vidoeData of youTubeData"
          :key="vidoeData"
          :vidoeData="vidoeData"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

import YoutubeItem from '@/components/uiMedia/gallery/video/YoutubeItem.vue'
import { useToast } from '@/modules/toast'

const { toast } = useToast()

const isLoading = ref(false)
const token = localStorage.getItem('TOKEN');
const youTubeData = ref([]);

onMounted(() => getPhotos());
const getPhotos = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=100&category_id=4`;

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

      youTubeData.value = response.data;
      isLoading.value = false;
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
      isLoading.value = false;
    });
}

</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-header {
    max-width: 1160px;

    display: grid;
    grid-template-columns: 1fr 60px;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-addNewsBtn {
      width: 60px;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px !important;

      & svg {
        height: 40px;
        width: 40px;

        fill: white;
      }
    }
  }
  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
}
</style>