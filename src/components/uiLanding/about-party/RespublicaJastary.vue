<template>
  <section class="respublicaJastary landing-block" id="respublica-jastary">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('about-us-page.respublica-jastary.title') }}</h2>

      <div class="respublicaJastary-inner">
        <div class="respublicaJastary-preview withZoomPreview-preview first">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img" style="background-image: url('/img/uiLanding/respublica-justary/2B7A4383.jpg');"></div>
        </div>

        <p class="respublicaJastary-text first" v-html="$t('about-us-page.respublica-jastary.text-one')" />

        <div class="respublicaJastary-preview withZoomPreview-preview second">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img" style="background-image: url('/img/uiLanding/respublica-justary/Жастар (1).jpg');"></div>
        </div>

        <p class="respublicaJastary-text second" v-html="$t('about-us-page.respublica-jastary.text-two')" />
        <p class="respublicaJastary-text three" v-html="$t('about-us-page.respublica-jastary.text-three')" />
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
    grid-template-columns: 380px 1fr 320px;
    grid-gap: 30px;
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
    &.three {
      grid-column: 1/4;
    }
  }

  // Adaptation
  @media (max-width: 1800px) {
    &-inner {
      grid-template-columns: 380px 1fr 350px;
    }

    &-preview {
      &.first {
        grid-row: 1/2;
      }

      &.second {
        grid-row: 3/4;
        grid-column: 3/4;
      }
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;

      &.first {
        grid-column: 2/4;
      }

      &.second {
        grid-column: 1/4;
      }

      &.three {
        grid-column: 1/3;
      }
    }
  }

  @media (max-width: 1600px) {
    &-inner {
      grid-template-columns: 280px 1fr 240px;
      grid-gap: 18px;
    }

    &-preview {
      &-img {
        height: 100%;
      }
      
      &.first {
        grid-row: 1/2;
      }

      &.second {
        grid-row: 3/4;
        grid-column: 3/4;
      }
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;

      &.first {
        grid-column: 2/4;
      }

      &.second {
        grid-column: 1/4;
      }

      &.three {
        grid-column: 1/3;
      }
    }
  }

  @media (max-width: 1400px) {
    &-inner {
      grid-template-columns: 280px 1fr 240px;
      grid-gap: 18px;
    }

    &-preview {
      &-img {
        height: 100%;
      }
      
      &.first {
        grid-row: 2/3;
      }

      &.second {
        grid-row: 3/4;
        grid-column: 3/4;
      }
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;

      &.first {
        grid-column: 1/4;
      }

      &.second {
        grid-column: 2/4;
      }

      &.three {
        grid-column: 1/3;
      }
    }
  }

  @media (max-width: 1200px) {
    &-inner {
      grid-template-columns: 1fr 1fr;
      grid-gap: 18px;
    }

    &-preview {
      &-img {
        height: auto;
        padding-bottom: 70%;
      }
      
      &.first {
        grid-row: 2/3;
        grid-column: 1/2;
      }

      &.second {
        grid-row: 2/3;
        grid-column: 2/3;
      }
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;

      &.first {
        grid-column: 1/3;
      }

      &.second {
        grid-column: 1/3;
      }

      &.three {
        grid-column: 1/3;
      }
    }
  }

  @media (max-width: 576px) {
    &-inner {
      grid-template-columns: 1fr;
      grid-gap: 18px;
    }

    &-preview {
      &-img {
        padding-bottom: 70%;
      }
      
      &.first {
        grid-row: 2/3;
        grid-column: auto;
      }

      &.second {
        grid-row: 4/5;
        grid-column: auto;
      }
    }

    &-text {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;

      &.first {
        grid-column: auto;
      }

      &.second {
        grid-column: auto;
      }

      &.three {
        grid-column: auto;
      }
    }
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}
</style>