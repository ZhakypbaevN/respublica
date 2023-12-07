<template>
  <section class="respublicaJastary landing-block" id="respublica-jastary">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('about-us-page.respublica-jastary.title') }}</h2>

      <div class="respublicaJastary-inner">
        <div class="respublicaJastary-preview withZoomPreview-preview first">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img" style="background-image: url('/img/uiLanding/respublica-justary/2B7A4383.jpg');"></div>
        </div>

        <p class="respublicaJastary-text" v-html="$t('about-us-page.respublica-jastary.text-one')" />

        <div class="respublicaJastary-preview withZoomPreview-preview second">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img" style="background-image: url('/img/uiLanding/respublica-justary/Жастар (1).jpg');"></div>
        </div>

        <p class="respublicaJastary-text second" v-html="$t('about-us-page.respublica-jastary.text-two')" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.respublicaJastary {
  &-inner {
    display: grid;
    grid-template-columns: 380px 1fr 350px;
    grid-gap: 40px;
  }

  &-preview {

    &-img {
      height: 100%;
    }
    &.first {
      grid-row: 1/3;
    }
  }

  &-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;

    &.second {
      grid-column: 2/4;
    }
  }
}
</style>