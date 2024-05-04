<template>
  <section class="news landing-block" id="newsList">
    <div class="wrapper">
      
      <div class="landing-header withBackBtn">
        <BackButton outlined />

        <h2 class="landing-title center">
          {{ $t('page.video-gallery') }}
        </h2>
      </div>
      
      <div class="landing-items empty" v-if="newsValues.isEmpty">
        <Empty />
      </div>
      <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
        <div
          class="skeleton dark-gray"
          style="padding-bottom: 56.25%;"
          v-for="news in 5"
          :key="news"
        ></div>
      </div>
      <div class="landing-items" v-else>
        <YoutubeVideo
          v-for="(vidoe, idx) of newsValues.tableValues"
          :key="idx"
          :src="vidoe.content"
          :createdAt="vidoe.created_at"
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
  import YoutubeVideo from '@/components/uiLanding/press-center/youtube/YoutubeVideo.vue';

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

    const { data, total } = await getNewsList('video-gallery', {offset: showMore.offset, limit: 20})
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
</style>