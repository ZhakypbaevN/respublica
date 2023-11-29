<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
       
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
  const { data, total } = await getNewsList('news', {offset: 0,limit: 100})
  newsValues.tableValues = data;
  newsValues.total = total;
  if (!total) {
    newsValues.isEmpty = true
  }
}
</script>

<style scoped lang="scss">
.wrapper-main {
  padding: 40px 0 80px;
  background-color: var(--accent-color-op05);
}
</style>
