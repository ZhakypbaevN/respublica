<template>
  <div class="introSlider">
    <div class="introSlider-preview bg-cover"></div>

    <IntroContent />

    <div class="introSlider-teams">
      <div
        class="introSlider-teams-item"
        v-for="(people, idx) of teamList"
        :key="people.zIndex"
        :style="{zIndex: people.zIndex}"
        :data-aos="people.aos"
        :data-aos-delay="people.aosDelay"
        data-aos-duration="1200"
      >
        <div class="introSlider-teams-item-preview">
          <img
            class="introSlider-teams-item-preview-img"
            :src="people.img"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import IntroContent from '@/components/uiLanding/home-page/intro/IntroContent.vue';

  const teamList = [
    {
      zIndex: 3,
      img: '/img/uiLanding/home/intro/team/people-1.png',
      aos: 'zoom-out-right',
      aosDelay: '900'
    },
    {
      zIndex: 4,
      img: '/img/uiLanding/home/intro/team/people-2.png',
      aos: 'zoom-out-right',
      aosDelay: '700'
    },
    {
      zIndex: 5,
      img: '/img/uiLanding/home/intro/team/people-3.png',
      aos: 'zoom-out-right',
      aosDelay: '500'
    },
    {
      zIndex: 10,
      img: '/img/uiLanding/home/intro/team/people-4.png',
      aos: 'zoom-out',
      aosDelay: '200'
    },
    {
      zIndex: 9,
      img: '/img/uiLanding/home/intro/team/people-5.png',
      aos: 'zoom-out-left',
      aosDelay: '400'
    },
    {
      zIndex: 8,
      img: '/img/uiLanding/home/intro/team/people-6.png',
      aos: 'zoom-out-left',
      aosDelay: '600'
    },
    {
      zIndex: 7,
      img: '/img/uiLanding/home/intro/team/people-7.png',
      aos: 'zoom-out-left',
      aosDelay: '800'
    },
    {
      zIndex: 6,
      img: '/img/uiLanding/home/intro/team/people-8.png',
      aos: 'zoom-out-left',
      aosDelay: '1000'
    },
  ]
</script>

<style scoped lang="scss">
.introSlider {
  display: none;
  padding-top: 90px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';

    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(31, 76, 154, 0.34);
  }

  &-preview {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    bottom: 0;

    background-image: url('/img/uiLanding/home/intro/intro-banner-3.jpg');

    &::before,
    &::after {
      content: '';
  
      display: block;
      width: 100%;
      height: 100%;
  
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &-teams {
    display: flex;
    justify-content: space-around;

    padding: 0 10px;

    &-item {
      padding-bottom: 36%;
      position: relative;

      &-preview-img {
        height: 100%;

        position: absolute;
        left: 50%;
        bottom: 0;
        z-index: 1;
        transform: translateX(-50%);
      
        transition: all .3s ease-in-out;
      }
    }
  }

  // Adaptation
  @media (max-width: 576px) {
    display: block;
    
    &-teams {
      height: 280px;
      width: min-content;
      grid-gap: 100px;

      padding: 0 100px;

      position: relative;
      left: 50%;
      transform: translateX(-50%);

      animation: sliderAnimation 20s infinite;
      animation-delay: 10000;
    }
  }

  @media (max-width: 380px) {
    &-teams {
      height: 220px;
      grid-gap: 100px;
      padding: 0 100px;
    }
  }
}

@keyframes sliderAnimation {
  5% {
    left: 50%;
    transform: translateX(-50%);
  }
  40% {
    left: 0;
    transform: translateX(-2%);
  }
  60% {
    left: 75%;
    transform: translateX(-90%);
  }
  95% {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
