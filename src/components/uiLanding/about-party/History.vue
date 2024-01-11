<template>
  <section class="landing-block" id="history">
    <div class="wrapper">
      <h2 class="landing-title" id="history">{{ $t('about-us-page.history.title') }}</h2>
      <div class="timeline">
        <div
          v-for="history of historylist"
          :key="history.date"
          class="timeline-block"
          :data-date="history.date"
        >
          <div
            class="timeline-item" 
            :class="{withOutImg: history.logoSvg}"
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
        </div>
      </div>
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
#history {
  overflow: hidden;
}
.timeline {
  padding-left: 280px;

  &-block {
    padding: 10px 15px;
    padding-right: 0px !important;
    border-left: 1px solid var(--accent-color);

    position: relative;

    &::after {
      display: inline-block;
      width: 260px;

      content: attr(data-date);
      color: var(--accent-color);
      font-size: 23px;
      font-weight: 700;
      text-align: right;
      
      position: absolute;
      top: -10px;
      right: calc(100% + 40px);
    }

    &::before {
      content: "";
      border-radius: 50%;
      width: 13px;
      height: 13px;
      background-color: var(--accent-color);
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
    display: grid;
    grid-template-columns: 225px 1fr;
    align-items: flex-start;
    grid-gap: 30px;
    
    padding: 30px;
    margin-top: -25px;
    margin-bottom: 20px;

    border-radius: 10px;
    background-color: white;

    &.withOutImg {
      grid-template-columns: 1fr;
    }
  
    &-preview-img {
      padding-bottom: 70%;
    }

    &-content {
      text-align: left;
      font-size: 20px;
      line-height: 1.2;
    }

    &-logo {
      width: 225px;
      height: 41px;
    }
  }

  // Adaptation
  @media (max-width: 1600px) {
    padding-left: 260px;

    &-block::after {
      width: 240px;
    }
  }

  @media (max-width: 1400px) {
    padding-left: 180px;

    &-block::after {
      width: 160px;
      right: calc(100% + 20px);
    }
  }

  @media (max-width: 1200px) {
    padding-left: 0px;

    &-block {
      padding-top: 34px;

      &::after {
        width: 100%;

        font-size: 23px;
        text-align: left;
        
        top: -10px;
        right: auto;
        left: 20px;
      }

      &::before {
        width: 13px;
        height: 13px;
        left: -7px;
      }
    }

    &-item {
      margin-top: 0px;
      margin-bottom: 40px;
    }
  }

  @media (max-width: 992px) {
    &-item {
      display: block;
      
      padding: 30px;
      margin-bottom: 30px;

      border-radius: 10px;

      &-content {
        font-size: 20px;
      }

      &-preview,
      &-logo {
        float:left;
        margin: 0 20px 20px 0; 
      }

      &-preview {
        width: 200px;
      }

      &-logo {
        width: 200px;
        height: 36px;
      }
    }
  }

  @media (max-width: 768px) {
    &-item {
      display: block;
      
      padding: 20px;
      margin-bottom: 30px;

      border-radius: 10px;

      &-content {
        font-size: 18px;
      }

      &-preview,
      &-logo {
        float:left;
        margin: 0 16px 16px 0; 
      }

      &-preview {
        width: 180px;
      }

      &-logo {
        width: 180px;
        height: 32px;
      }
    }
  }

  @media (max-width: 576px) {
    &-item {
      padding: 18px;
      border-radius: 8px;

      &-content {
        font-size: 18px;
      }

      &-preview,
      &-logo {
        float:left;
        margin: 0 16px 16px 0; 
      }

      &-preview {
        width: 160px;
      }

      &-logo {
        width: 160px;
        height: 30px;
      }
    }
  }

  @media (max-width: 460px) {
    &-item {
      &-content {
        font-size: 16px;
      }

      &-preview,
      &-logo {
        float: auto;
        margin: 0px; 
        margin-bottom: 18px;
      }

      &-logo {
        width: 160px;
        height: 30px;
        float:left;
        margin: 0 16px 16px 0; 
      }

      &-preview {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
}
</style>