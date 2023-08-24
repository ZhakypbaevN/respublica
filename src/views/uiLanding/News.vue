<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <div class="wrapper">
        <h2 class="landing-title">Новости</h2>
      </div>
    </div>

    <Footer /> 
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
</script>

<style scoped lang="scss">
.intro {
  padding-top: 34%;
  background: url('/img/uiLanding/intro-preview.jpg') center no-repeat;
  background-size: cover;

  position: relative;

  &-btns {
    display: flex;
    grid-gap: 30px;

    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
  }
}
</style>
