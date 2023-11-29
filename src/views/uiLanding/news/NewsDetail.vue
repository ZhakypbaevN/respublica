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
  
            <div class="news-items" v-if="newsValues.isEmpty">
              Empty
            </div>
            <div class="news-items disabled" v-else-if="!newsValues.tableValues">
              Loading
            </div>
            <div class="news-items" v-else>
              <NewsItem
                v-for="news of newsValues.tableValues"
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
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'

  import { onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  import { INews, NewsValues } from '@/types/news';
  import { getNewsList, getNewsData } from '@/actions/uiLanding/news';
  
  const route = useRoute()
  
  watch(
    () => route.params,
    () => getData()
  )
  onMounted(() => getData())

  const newsData = ref<INews>(null)
  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = () => {
    onGetNewsDetail();
    onGetNewsList();
  }

  const onGetNewsDetail = async () => {
    const { data } = await getNewsData(route.params.news_id.toString());
    newsData.value = data;
  }

  const onGetNewsList = async () => {
    newsValues.isEmpty = false
    const { data, total } = await getNewsList('news', {offset: 0,limit: 4})
    data.forEach(news => {
      if (news.id.toString() !== route.params.news_id) newsValues.tableValues.push(news);
    });
    
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
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