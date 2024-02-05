<template>
  <div class="introList">
    <div class="introList-preview-bg" />

    <div
      v-for="(bg, idx) of bannersList"
      :key="bg"
      class="introList-preview bg-cover"
      :class="{show: showBanner === idx}"
      :style="`background-image: url('${bg}');`"
    />

    <div class="introList-teams">
      <div
        class="introList-teams-item"
        v-for="(people, idx) of teamList"
        :key="people.zIndex"
        :style="{zIndex: people.zIndex}"
        :data-aos="people.aos"
        :data-aos-delay="people.aosDelay"
        data-aos-duration="1200"
      >
        <div class="introList-teams-item-preview">
          <img
            class="introList-teams-item-preview-img"
            :src="people.img"
          />
        </div>
      </div>
    </div>

    <IntroContent />
  </div>

</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
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
  
  const showBanner = ref(0);
  const bannersList = [
    '/img/uiLanding/home/intro/intro-banner-1.jpg',
    '/img/uiLanding/home/intro/intro-banner-2.jpg',
    '/img/uiLanding/home/intro/intro-banner-3.jpg',
    '/img/uiLanding/home/intro/intro-banner-4.jpg',
  ]

  onMounted(() => {
    setInterval(() => {
      if (showBanner.value < 3)  showBanner.value++;
      else showBanner.value = 0;
    }, 10000);
  })
</script>

<style scoped lang="scss">
.introList {
  padding-top: 8%;
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
    background: rgba(31, 76, 154, 0.2);
  }

  &-preview,
  &-preview-bg {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
  }

  &-preview {
    opacity: 0;

    background-image: url('/img/uiLanding/home/intro/intro-banner-3.jpg');
    transition: all .7s linear;

    &.show {
      opacity: 1;
    }

    &-bg {
      z-index: 1;
      background-color: var(--primary-color);
    }
  }

  &-teams {
    display: flex;
    justify-content: space-around;

    padding: 0 120px;

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
  @media (max-width: 1900px) {
    &-teams {
      padding: 0 100px;
    }
  }

  @media (max-width: 1600px) {
    &-teams {
      padding: 0 80px;
    }
  }

  @media (max-width: 1400px) {
    &-teams {
      padding: 0 40px;
    }
  }

  @media (max-width: 1200px) {
    &-teams {
      padding: 0 20px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
