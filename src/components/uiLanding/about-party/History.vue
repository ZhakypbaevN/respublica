<template>
  <section class="landing-block" id="history">
    <div class="wrapper">
      <h2 class="landing-title" id="history">{{ $t('about-us-page.history.title') }}</h2>
      <ul class="timeline">
        <li
          v-for="history of historylist"
          :key="history.date"
          class="timeline-block"
          :data-date="history.date"
        >
          <div
            class="timeline-item" 
            :class="{withOutImg: !history.img}"
          >
            <div v-if="history.img && !history.logoSvg" class="timeline-item-preview withZoomPreview-preview">
              <div class="timeline-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url('${history.img}');`"></div>
            </div>
            <SvgIcon
              v-else-if="history.logoSvg"
              class="timeline-item-logo"
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />
            <p class="timeline-item-content" v-html="history.text"></p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const historylist = [
  {
    date: t('about-us-page.history.date-december'),
    img: '/img/uiLanding/about-party/history/История 1 съезд (1).jpg',
    text: t('about-us-page.history.date-december-text')
  },
  {
    date: t('about-us-page.history.date-january'),
    img: '/img/uiLanding/about-party/history/История 1 съезд (2).jpg',
    logoSvg: true,
    text: t('about-us-page.history.date-january-text')
  },
  {
    date: t('about-us-page.history.date-february'),
    img: '/img/uiLanding/about-party/history/История 1 съезд (2).jpg',
    text: t('about-us-page.history.date-february-text')
  },
  {
    date: t('about-us-page.history.date-march'),
    img: '/img/uiLanding/about-party/history/История - выборы.jpg',
    text: t('about-us-page.history.date-march-text')
  },
  {
    date: t('about-us-page.history.date-july'),
    img: '/img/uiLanding/about-party/history/История 3 съезд.jpg',
    text: t('about-us-page.history.date-july-text')
  }
]

</script>
<style scoped lang="scss">
.timeline {
  padding-left: 260px;
}

.timeline {
  &-block {
    text-align: center;
    font-size: 1.4rem;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-left: 1px solid #4A78EC;

    position: relative;
    list-style-type: none;
    --item-width: calc(100%);

    &::after {
      content: attr(data-date);
      position: absolute;
      right: calc(var(--item-width) + 40px);
      color: #4A78EC;
      font-size: 23px;
      top: -10px;
      font-weight: 700;
      float: right;
      white-space: nowrap;
    }

    &::before {
      content: "";
      border-radius: 50%;
      width: 13px;
      height: 13px;
      background-color: #4A78EC;
      position: absolute;
      left: -7px;
      top: 0px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &-block:last-of-type {
    padding-bottom: 0px !important;
  }
  
  &-item {
    max-width: 1120px;
    
    display: grid;
    grid-template-columns: 225px 1fr;
    align-items: flex-start;
    grid-gap: 30px;
    
    padding: 30px;
    margin-top: -25px;
    
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;

    &.withOutImg {
      grid-template-columns: 1fr;
    }
  
    &-preview-img {
      padding-bottom: 70%;
    }

    &-content {
      /* text-indent: 40px; */
      text-align: left;
      color: #042051;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
    }

    &-logo {
      width: 225px;
      height: 41px;
    }

  }
}
</style>