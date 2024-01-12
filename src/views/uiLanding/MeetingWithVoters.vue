<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper litle">
          <div class="landing-title center">{{ $t('meeting-with-voters.title') }}</div>
          
          <div class="meetingWithVoters-photoItems">
            <div
              class="meetingWithVoters-preview withZoomPreview-preview"
              v-for="photo of photoList"
              :key="photo"
            >
              <div
                class="meetingWithVoters-preview-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${photo});`"
              ></div>
            </div>
          </div>

          <div class="meetingWithVoters-text" v-html="$t('meeting-with-voters.content')" />
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const photoList = [
  '/img/uiLanding/trips-to-regions/6.jpg',
  '/img/uiLanding/trips-to-regions/2.jpg',
  '/img/uiLanding/trips-to-regions/3.jpg',
  '/img/uiLanding/trips-to-regions/4.jpg',
  '/img/uiLanding/trips-to-regions/5.jpg',
  '/img/uiLanding/trips-to-regions/1.jpeg',
]
</script>

<style scoped lang="scss">
.meetingWithVoters {
  &-photoItems {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px 30px;

    margin-bottom: 30px;
  }

  &-preview {
    &-img {
      padding-bottom: 60%;
    }
  }

  &-text {
    font-size: 22px;
    line-height: 1.2;
  }

  // Adaptation
  @media (max-width: 992px) {
    &-photoItems {
      grid-gap: 26px 20px;
      margin-bottom: 28px;
    }

    &-text {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    &-photoItems {
      grid-gap: 22px 16px;
      margin-bottom: 26px;
    }

    &-text {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {&-photoItems {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px 14px;
      margin-bottom: 24px;
    }

    &-text {
      font-size: 16px;
    }
  }
}
</style>
