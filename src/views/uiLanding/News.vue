<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <section class=" landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Новости</h2>
          <NewsList />


        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import NewsList from '../../components/uiLanding/news/NewsList.vue';
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;

}

.landing-title {
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  color: #042051;
}

</style>
