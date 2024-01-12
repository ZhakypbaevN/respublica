<template>
  <section class="intro">
    <IntroList />
    <IntroSlider />

    <IntroBottom />
  </section>
</template>

<script setup lang="ts">
import IntroList from '@/components/uiLanding/home-page/intro/IntroList.vue';
import IntroBottom from '@/components/uiLanding/home-page/intro/IntroBottom.vue';
import IntroSlider from '@/components/uiLanding/home-page/intro/IntroSlider.vue';
</script>

<style scoped lang="scss">
.intro {
  overflow: hidden;

  // Adaptation
  @media (max-width: 1600px) {
  }

  @media (max-width: 1400px) {
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 992px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}

@keyframes spinAndZoom {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(360deg);
  }
  40% {
  }
  45% {
  }
}
</style>
