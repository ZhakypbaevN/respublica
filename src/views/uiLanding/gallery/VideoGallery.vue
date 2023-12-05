<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title center">
            {{ $t('page.video-gallery') }}
          </h2>

          <div class="landing-items" v-if="newsValues.isEmpty">
            Empty
          </div>
          <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
            Loading
          </div>
          <div class="landing-items" v-else>
            <YoutubeVideo
              v-for="(vidoe, idx) of newsValues.tableValues"
              :key="idx"
              :src="vidoe.content"
            ></YoutubeVideo>
          </div>

        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
  import YoutubeVideo from '@/components/uiLanding/press-center/youtube/YoutubeVideo.vue'

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
    const { data, total } = await getNewsList('video-gallery', {offset: 0,limit: 100})
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