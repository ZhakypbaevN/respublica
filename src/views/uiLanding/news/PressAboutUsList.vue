<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <RouterLink to="/news">
        <Button name="Назад" type="outline-grey-light">
          <SvgIcon name="arrow-left" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </RouterLink>

      <section class="news landing-block" id="pressAboutUS">
        <div class="wrapper">
          <h2 class="landing-title">
            Пресса о нас
          </h2>
          
          <div class="landing-items">
            <NewsItem pressAboutUs />
            <NewsItem pressAboutUs />
            <NewsItem pressAboutUs />

            <NewsItem pressAboutUs />
            <NewsItem pressAboutUs />
            <NewsItem pressAboutUs />
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