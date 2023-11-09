<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <!-- <RouterLink to="/news">
        <Button name="Назад" type="outline-grey-light">
          <SvgIcon name="arrow-left" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </RouterLink> -->

      <section class="news landing-block" id="pressAboutUS">
        <div class="wrapper">
          <h2 class="landing-title">
            Пресса о нас
          </h2>
          
          <div class="landing-items">
            <NewsItem
              v-for="news of newsPressAboutUsList"
              :key="news.title"
              :data="news"
              pressAboutUs
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

const newsPressAboutUsList = ref();
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getNewsPressAboutUs();
})


const getNewsPressAboutUs = () => {
  const url = `https://api.respublica.codetau.com/api/v1/articles?offset=0&limit=6&category_id=3`;

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

      newsPressAboutUsList.value = response.data;
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