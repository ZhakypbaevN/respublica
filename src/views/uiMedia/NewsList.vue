<template>
  <section class="wrapper-main">
    <div class="news wrapper">
      <div class="news-items">
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsItem from "../../components/uiMedia/news/newsItem.vue"
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding-top: 40px;
}

.news {
  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
}
</style>