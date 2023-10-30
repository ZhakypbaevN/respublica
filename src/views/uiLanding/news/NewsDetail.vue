<template>
    <div class="wrapper-main">
      <div class="content">
        <Header />
        <section class="landing-block">
          <div class="wrapper landing-wrapper litle">
            <div class="news" v-if="newsData">
              <div class="news-title">{{ newsData.title }}</div>
  
              <div class="news-preview withZoomPreview-preview">
                <div class="news-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(https://api.respublica.codetau.com/${newsData.preview_image});`"></div>
              </div>

              <div class="news-subtitle">{{ newsData.preview_text }}</div>
  
              <div class="news-text ck-content" v-html="newsData.content"></div>
            </div>
  
            <div class="news-items" v-if="newsList">
              <NewsItem
                v-for="news of newsList"
                :key="news.title"
                :data="news"
                litle
              />
            </div>
  
          </div>
        </section>
      </div>
      <Footer />
    </div>
</template>

<script setup lang="ts">
// import convertDateTime from '../../../helpers/convertDateTime.js';

import NewsItem from '../../../components/uiLanding/news/newsItem.vue';

import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const newsData = ref(null);
const newsList = ref(null);

onMounted(() => getData())

const getData = () => {
  getNewsData();
  getNewsList();
}

watch(
  () => route.params.announce_id,
  getData
)

const getNewsData = () => {
const url = `https://api.respublica.codetau.com/api/v1/articles/${route.params.news_id}`;
axios({
  method: "get",
  url: url,
})
  .then((response) => {
    newsData.value = response.data;
  })
  .catch((err) => {
    console.log('err', err);
    toast({
        message: 'Возникли ошибки при запросе'
    })
  });
}

const getNewsList = () => {
const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=3&category_id=1`;
axios({
    method: "get",
    url: url,
})
  .then((response) => {
    newsList.value = [];

    response.data.forEach(news => {
        if (news.id.toString() !== route.params.news_id) newsList.value.push(news);
    });
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
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news {
  margin-bottom: 100px;

  &-title {
    color: var(--primary-color);
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  &-subtitle {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  &-text {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 30px;
  }

  &-preview {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;

    &-img {
      padding-bottom: 56.36%;
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
}
</style>