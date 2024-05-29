<template>
  <section class="intro">
    <div class="intro-preview bg-cover" style="background-image: url('/img/uiLanding/home/intro/intro-bg.jpg');"></div>
    <IntroBottom />
  </section>
</template>

<script setup lang="ts">
  import IntroBottom from '@/components/uiLanding/home-page/intro/IntroBottom.vue';
</script>

<style scoped lang="scss">
.intro {
  &-preview {
    padding-bottom: 45%;
  }
}
</style>
