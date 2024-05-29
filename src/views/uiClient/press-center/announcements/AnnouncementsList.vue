<template>
  <section class="news landing-block" id="newsList">
    <div class="wrapper">
      
      <div class="landing-header withBackBtn">
        <BackButton outlined />

        <h2 class="landing-title center">
          {{ $t('page.announcements') }}
        </h2>
      </div>
      
      <div class="landing-items empty" v-if="newsValues.isEmpty">
        <Empty />
      </div>
      <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
        <NewsItemSkeleton
          v-for="news in 5"
          :key="news"
        />
      </div>
      <div class="landing-items" v-else>
        <NewsItem
          v-for="news of newsValues.tableValues"
          :key="news.title"
          :data="news"
        />

        <ShowMoreBtn
          v-model:offset="showMore.offset"
          :loading="showMore.loading"
          :total="newsValues.total"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
  import NewsItemSkeleton from '@/components/uiLanding/press-center/news/NewsItemSkeleton.vue';

  import { onMounted, reactive, watch } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  const showMore = reactive({
    offset: 0,
    loading: false
  })
  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = async () => {
    showMore.loading = true;
    newsValues.isEmpty = false;

    const { data, total } = await getNewsList('announcements', {offset: showMore.offset, limit: 20})
    showMore.loading = false
    newsValues.total = total;
    if (!newsValues.tableValues) newsValues.tableValues = [];
    data.forEach(item => newsValues.tableValues.push(item));

    if (!total) {
      newsValues.isEmpty = true
    }
  }

  onMounted(() => {
    getData();
  })
  
  watch(
    () => showMore.offset,
    () => getData()
  );
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}
</style>