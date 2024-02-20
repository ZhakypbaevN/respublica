<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper litle">
          <h2 class="landing-title center">{{ $t('meeting-with-voters.title') }}</h2>
          
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
          <h4 class="meetingWithVoters-bottomTitle" v-html="$t('meeting-with-voters.bottom-title')" />


          <h2 class="landing-title">{{ $t('meeting-with-voters.january-2024.title') }}</h2>
          <div class="meetingWithVoters-photoItems">
            <div
              class="meetingWithVoters-preview withZoomPreview-preview"
              v-for="photo of january2024_photoList"
              :key="photo"
            >
              <div
                class="meetingWithVoters-preview-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${photo});`"
              ></div>
            </div>
          </div>
          <div class="meetingWithVoters-text" v-html="$t('meeting-with-voters.january-2024.content')" />
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const photoList = [
  '/img/uiLanding/meeting-with-voters/6.jpg',
  '/img/uiLanding/meeting-with-voters/2.jpg',
  '/img/uiLanding/meeting-with-voters/3.jpg',
  '/img/uiLanding/meeting-with-voters/4.jpg',
  '/img/uiLanding/meeting-with-voters/5.jpg',
  '/img/uiLanding/meeting-with-voters/1.jpeg',
]

const january2024_photoList = [
  '/img/uiLanding/meeting-with-voters/january2024/1.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/2.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/3.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/4.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/5.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/6.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/7.jpg',
  '/img/uiLanding/meeting-with-voters/january2024/8.jpg',
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
    margin-bottom: 30px;
  }

  &-bottomTitle {
    font-size: 24px;
    font-weight: 600;

    margin-bottom: 100px;
  }

  // Adaptation
  @media (max-width: 992px) {
    &-photoItems {
      grid-gap: 26px 20px;
      margin-bottom: 28px;
    }

    &-text {
      font-size: 20px;
      margin-bottom: 28px;
    }

    &-bottomTitle {
      font-size: 22px;
    }
  }

  @media (max-width: 768px) {
    &-photoItems {
      grid-gap: 22px 16px;
      margin-bottom: 26px;
    }

    &-text {
      font-size: 18px;
      margin-bottom: 26px;
    }

    &-bottomTitle {
      font-size: 20px;
      margin-bottom: 80px;
    }
  }

  @media (max-width: 576px) {&-photoItems {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px 14px;
      margin-bottom: 24px;
    }

    &-text {
      font-size: 16px;
      margin-bottom: 24px;
    }

    &-bottomTitle {
      font-size: 18px;
      margin-bottom: 60px;
    }
  }
}
</style>
