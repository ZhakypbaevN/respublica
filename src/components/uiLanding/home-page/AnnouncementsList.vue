<template>
  <section class="news landing-block">
    <div class="wrapper landing-wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          {{ $t('page.announcements') }}
        </h2>

        <RouterLink to="/news-all" class="itemsList-viewAll">
          <span>{{ $t('button.view-all') }}</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      <div class="landing-items" v-if="newsValues.isEmpty">
        Empty
      </div>
      <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
        Loading
      </div>
      <div class="landing-items" v-else>
        <AnnounceItem
          v-for="news of newsValues.tableValues"
          :key="news.title"
          :data="news"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import AnnounceItem from '@/components/uiLanding/press-center/announces/AnnounceItem.vue';

  import { onMounted, reactive, ref } from 'vue';

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
    const { data, total } = await getNewsList('announcements', {offset: 0,limit: 3})
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.tableValues = [];
      newsValues.isEmpty = true
    }
  }
</script>