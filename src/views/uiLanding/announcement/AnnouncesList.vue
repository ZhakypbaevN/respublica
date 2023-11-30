<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <section class="news landing-block" id="newsList">
        <div class="wrapper">
          <h2 class="landing-title center">
            {{ $t('home-announcements') }}
          </h2>
          
          <div class="landing-items">
            <AnnounceItem
              v-for="news of newsList"
              :key="news.title"
              :data="news"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnnounceItem from '@/components/uiLanding/press-center/announces/AnnounceItem.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '@/modules/toast'

const { toast } = useToast()

const newsList = ref();
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getNews();
})

const getNews = () => {
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/articles?offset=0&limit=100&category_id=6`;

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

      newsList.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);

      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

</script>

<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;
}
</style>