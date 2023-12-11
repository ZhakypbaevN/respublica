<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />

      <section class="landing-block">
        <div class="wrapper">
          <h2 class="landing-title center">{{ $t('page.photo-gallery') }}</h2>

          <PhotoGallery />
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import PhotoGallery from '@/components/uiLanding/press-center/photo-gallery/PhotoGallery.vue';

</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}
</style>