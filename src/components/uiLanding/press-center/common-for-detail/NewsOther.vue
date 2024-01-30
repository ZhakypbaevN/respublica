<template>
  <div class="news">
    <div class="newsItems" v-if="newsValues.isEmpty">
      <Empty />
    </div>
    <div class="newsItems disabled" v-else-if="!newsValues.tableValues">
      <NewsItemSkeleton
        v-for="news in 3"
        :key="news"
        litle
      />
    </div>
    <div class="newsItems" v-else>
      <NewsItem
        v-for="news of newsValues.tableValues"
        :key="news.title"
        :data="news"
        litle
        :toClient="toClient"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
  import NewsItemSkeleton from '@/components/uiLanding/press-center/news/NewsItemSkeleton.vue';

  import { onMounted, reactive } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  interface IProps {
    newsID: string,
    category: string,
    toClient?: boolean
  }

  const props = defineProps<IProps>()
  
  onMounted(() => getData());

  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = () => {
    onGetNewsList();
  }

  const onGetNewsList = async () => {
    newsValues.isEmpty = false
    const { data, total } = await getNewsList(props.category, {offset: 0,limit: 4})
    newsValues.tableValues = [];
    data.forEach(news => {
      if (news.id.toString() !== props.newsID) newsValues.tableValues.push(news);
    });
    
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }
</script>

<style scoped lang="scss">
.newsItems {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  // Adaptation
  @media (max-width: 576px) {
    grid-gap: 30px;
  }
}
</style>