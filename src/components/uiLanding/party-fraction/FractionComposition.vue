<template>
  <section class="fraction landing-block" id="fraction-composition">
    <div class="wrapper" :class="{'landing-wrapper': single}">
      <h2 v-if="single" class="landing-title center">{{ $t('page.mazhilis-deputies') }}</h2>
      <h2 v-else class="landing-title">{{ $t('composition-of-faction.title') }}</h2>
   
      <div class="fraction-items">
        <div
          class="fraction-item"
          v-for="fraction of fractionList"
          :key="fraction.zIndex"
          :style="{zIndex: fraction.zIndex}"
        >
          <div class="fraction-item-preview">
            <img
              class="fraction-item-preview-img"
              :src="fraction.img"
            />
          </div>

          <div class="fraction-item-content">
            <div class="fraction-item-content-main">
              <h4 class="fraction-item-content-name">
                {{ fraction.fullName }}
              </h4>
              <p class="fraction-item-content-description" v-html="fraction.description" />
            </div>

            <div class="fraction-item-content-social">
              <a :href="fraction.facebook" target="_blank">
                <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
              </a>

              <a :href="fraction.instagram" target="_blank">
                <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface IProps {
  single?: boolean,
}

withDefaults(defineProps<IProps>(), {
  single: false
})

const { t } = useI18n()

const fractionList = [
  {
    zIndex: 6,
    fullName: t('composition-of-faction.hodzhanazarov.full-name'),
    description: t('composition-of-faction.hodzhanazarov.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-4.png',
    facebook: 'https://www.facebook.com/aidarbek',
    instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ='
  },
  {
    zIndex: 5,
    fullName: t('composition-of-faction.shukizhanova.full-name'),
    description: t('composition-of-faction.shukizhanova.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-3.png',
    facebook: 'https://www.facebook.com/dika.ask?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/dinarashukizhanova?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 4,
    fullName: t('composition-of-faction.berdenov.full-name'),
    description: t('composition-of-faction.berdenov.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-6.png',
    facebook: 'https://www.facebook.com/ruslan.berdenov?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 3,
    fullName: t('composition-of-faction.nurgul.full-name'),
    description: t('composition-of-faction.nurgul.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-1.png',
    facebook: 'https://www.facebook.com/nurgul.ttt?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/nurgul_tau?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 2,
    fullName: t('composition-of-faction.kuspenov.full-name'),
    description: t('composition-of-faction.kuspenov.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-2.png',
    facebook: 'https://www.facebook.com/olzhas.kuspekov',
    instagram: 'https://www.instagram.com/kuspekov_olzhas/'
  },
  {
    zIndex: 1,
    fullName: t('composition-of-faction.naumova.full-name'),
    description: t('composition-of-faction.naumova.post'),

    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-5.png',
    facebook: 'https://www.facebook.com/profile.php?id=100048126368212&mibextid=LQQJ4d',
    instagram: 'https://instagram.com/_naumova_dinara?igshid=NTc4MTIwNjQ2YQ=='
  },
]
</script>

<style scoped lang="scss">
.fraction {
  &-items {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    padding: 0 50px;
  }

  &-item {
    padding-bottom: 36%;
    position: relative;

    &:hover {
      z-index: 10 !important;
      & .fraction-item {
        &-preview-img {
          -webkit-filter: grayscale(0%);
          filter: grayscale(0%);
        }

        &-content {
          opacity: 1;
        }
      }
    }

    &-preview-img {
      height: 100%;

      position: absolute;
      left: 50%;
      bottom: 0;
      z-index: 1;
      transform: translateX(-50%);

      /* -webkit-filter: grayscale(100%); */
      filter: grayscale(100%);

      /* -webkit-filter: sepia(100%) hue-rotate(180deg) grayscale(100%); */
      /* filter: sepia(100%) hue-rotate(180deg) brightness(80%) contrast(96%) saturate(60%); */
    
      transition: all .3s ease-in-out;
    }

    &-content {
      width: 395px;

      opacity: 0;

      display: flex;
      flex-direction: column;

      padding: 20px;
      background-color: var(--primary-color);

      position: absolute;
      left: 50%;
      bottom: -90px;
      z-index: 10;

      transform: translateX(-50%);
      transition: all .3s ease-in-out;

      &-main {
        padding-bottom: 25px;
        margin-bottom: 25px;

        border-bottom: 1px solid white;
      }

      &-name {
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 17px;
      }

      &-description {
        color: white;
        font-size: 20px;
        font-weight: 400;
        line-height: 1.2;
      }

      &-social {
        display: flex;
        grid-gap: 20px;
  
        & a {
          opacity: .5;
          transform: scale(1);
          transition: all .3s ease-in-out;
  
          &:hover {
            opacity: 1;
            transform: scale(1.1);
          }
  
          svg {
            height: 32px;
            width: 32px;
            fill: var(--primary-color);
          }
        }
      }
    }
  }

  // Adaptation
  @media (max-width: 1600px) {
  }

  @media (max-width: 1400px) {
    display: none;
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
</style>