<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <section class="news landing-block" id="newsList">
        <div class="wrapper">
          <h2 class="landing-title center">
            Новости
          </h2>
          
          <div class="landing-items">
            <NewsItem
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
import NewsItem from '../../../components/uiLanding/news/newsItem.vue'

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

const newsList = ref();
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getNews();
})

const getNews = () => {
  const url = `https://api.respublica.codetau.com/api/v1/articles?offset=0&limit=100&category_id=1`;

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