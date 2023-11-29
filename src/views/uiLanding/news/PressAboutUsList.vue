<template>
  <main class="wrapper-main">
    <div class="content">
    
      <Header />
      <section class="news landing-block" id="newsList">
        <div class="wrapper">
          <h2 class="landing-title center">
            Пресса о нас
          </h2>
          
          <div class="landing-items" v-if="newsValues.isEmpty">
            Empty
          </div>
          <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
            Loading
          </div>
          <div class="landing-items" v-else>
            <NewsItem
              v-for="news of newsValues.tableValues"
              :key="news.title"
              :data="news"
              pressAboutUs
            />
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'

  import { onMounted, reactive } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  onMounted(() => {
    getData();
  })

  const getData = async () => {
    newsValues.isEmpty = false
    const { data, total } = await getNewsList('press-about-us', {offset: 0,limit: 100})
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}
</style>