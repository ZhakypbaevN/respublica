<template>
  <section class="aboutUs landing-block">
    <div class="wrapper landing-wrapper">
      <div class="aboutUs-inner">
        <RouterLink
          class="aboutUs-item withZoomPreview"
          v-for="item of aboutUsList"
          :key="item.title"
          :to="item.link"
        >
          <div class="aboutUs-item-preview withZoomPreview-preview-img" :style="`background-image: url('${item.img}');`"></div>
          <div>
            <h4 class="aboutUs-item-title">{{ item.title }}</h4>
            <p class="aboutUs-item-description" v-html="item.text"></p>
          </div>
          <div class="aboutUs-item-link">
            <span>{{ item.btn }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const aboutUsList = [
  {
    img: '/img/uiLanding/home/about-us/about-us-1.jpg',
    title: t('about-us-what-are-we-doing'),
    text: t('about-us-what-are-we-doing-text'),
    btn: t('about-us-what-are-we-doing-btn'),
    link: "/about-party",
  },
  {
    img: '/img/uiLanding/home/about-us/about-us-2.jpg',
    title: t('about-us-who-are-we'),
    text: t('about-us-who-are-we-text'),
    btn: t('about-us-who-are-we-btn'),
    link: "/about-party",
  },
  {
    img: '/img/uiLanding/home/about-us/about-us-3.jpg',
    title: t('about-us-contribute'),
    text: t('about-us-contribute-text'),
    btn: t('about-us-contribute-btn'),
    link: "/donations",
  },
];
</script>

<style scoped lang="scss">
.aboutUs {
  margin-top: 70px;

  &-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-gap: 30px;

    padding: 35px 40px 40px;
    border-radius: 10px;
    overflow: hidden;

    position: relative;

    &-preview {
      height: 100%;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    &-title {
      color: white;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    &-description {
      color: white;
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 10px;
    }

    &-link {
      display: inline-flex;
      align-items: center;
      grid-gap: 10px;

      &:hover {
        & span::after {
          left: 10px;
        }
      }

      & span {
        color: white;
        font-size: 20px;
        font-weight: 600;
        line-height: 1;

        &::after {
          content: " \2192";

          position: relative;
          top: 3px;
          left: 0;

          transition: all 0.3s ease-in-out;
        }
      }

      & svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
    }
  }
}
</style>
