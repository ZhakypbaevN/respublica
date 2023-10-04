<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <section class="news landing-block" id="newsList">
        <div class="wrapper">
          <h2 class="landing-title center">
            Новости
          </h2>
          
          <div class="landing-items">
            <NewsItem />
            <NewsItem />
            <NewsItem />

            <NewsItem />
            <NewsItem />
            <NewsItem />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsItem from '../../../components/uiLanding/news/newsItem.vue'
</script>

<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;
}
</style>