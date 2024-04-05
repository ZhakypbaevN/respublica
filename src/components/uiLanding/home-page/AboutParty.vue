<template>
  <section class="aboutParty landing-block" id="about-party">
    <div
      class="aboutParty-item withZoomPreview"
      v-for="item of aboutPartyList"
      :key="item.img"
    >
      <div
        class="aboutParty-item-preview withZoomPreview-preview-img"
        :style="`background-image: url('${item.img}');`"
      ></div>

      <div v-if="item.title" class="aboutParty-item-content">
        <div class="aboutParty-item-content-bg" :style="{backgroundColor: item.color}"></div>

        <p class="aboutParty-item-content-text">{{ item.title }}</p>
      </div>
    </div>
    

    <div class="aboutParty-item aboutParty-item-btn">
      <Button
        :name="$t('feedback.join-the-party')"
        @click="() => $emit('showJoinPartyModal')"
        type="outline-light"
        uppercase
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Emits {
  (event: 'showJoinPartyModal'): Function,
}

const { t } = useI18n()

defineEmits<Emits>()

const aboutPartyList = [
  {
    color: '#894BEC',
    img: '/img/uiLanding/home/about-party/events-1.jpg',
    title: t('home.about-party.item-1')
  },
  {
    color: null,
    img: '/img/uiLanding/home/about-party/events-2.jpg',
    title: null
  },
  {
    color: '#FF6B00',
    img: '/img/uiLanding/home/about-party/events-3.jpg',
    title: t('home.about-party.item-3')
  },
  {
    color: null,
    img: '/img/uiLanding/home/about-party/events-4.jpg',
    title: null
  },
  {
    color: null,
    img: '/img/uiLanding/home/about-party/events-5.jpg',
    title: null
  },
  {
    color: '#4A78EC',
    img: '/img/uiLanding/home/about-party/events-6.jpg',
    title: t('home.about-party.item-6')
  },
  {
    color: null,
    img: '/img/uiLanding/home/about-party/events-7.jpg',
    title: null
  }
]
</script>

<style scoped lang="scss">
.aboutParty {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 0px !important;

  &-item {
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;

    &:hover .aboutParty-item-content-bg {
      opacity: .9;
    }

    &-preview,
    &-content,
    &-content-bg {
      width: 100%;
      height: 100%;
      
      position: absolute;
      left: 0;
      top: 0;
    }

    &-preview {
      z-index: 1;
    }

    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
      
      z-index: 2;

      padding: 50px;

      &-bg {
        opacity: .8;
        transition: all .3s ease-in-out;
      }

      &-text {
        color: white;
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        line-height: 1.4;

        position: relative;
        z-index: 2;
      }
    }

    &-btn {
      background-color: var(--primary-color);

      & button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        padding: 50px 30px;
        border-radius: 0;
      }
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);

    &-item {
      &-content {
        padding: 46px;

        &-text {
          font-size: 24px;
        }
      }

      &-btn button {
        padding: 46px 24px;
      }
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);

    &-item:last-child {
      grid-column: 2/4;
      padding-bottom: 0;
    }
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);

    &-item {
      &-content {
        padding: 42px;

        &-text {
          font-size: 20px;
        }
      }

      &-btn button {
        padding: 40px 26px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    &-item {
      &-content {
        padding: 38px;

        &-text {
          font-size: 20px;
        }
      }

      &-btn button {
        padding: 36px 22px;
      }
    }

    &-item:nth-child(3),
    &-item:nth-child(5) {
      grid-column: 2/3;
    }

    &-item:nth-child(4) {
      grid-row: 2/3;
    }

    &-item:nth-child(6) {
      grid-row: 3/4;
    }

    &-item:last-child {
      grid-column: auto;
    }
  }

  @media (max-width: 490px) {
    grid-template-columns: repeat(2, 1fr);

    &-item {
      &-content {
        padding: 32px;

        &-text {
          font-size: 16px;
        }
      }

      &-btn button {
        padding: 32px 22px;
      }
    }

    &-item:nth-child(7) {
      display: none;
    }

    &-item:last-child {
      padding-bottom: 50%;
      grid-column: 1/3;
    }
  }

  @media (max-width: 380px) {
    grid-template-columns: 1fr;

    &-item {
      grid-row: auto;
      grid-column: auto;
      padding-bottom: 78% !important;

      &-content {
        padding: 32px;

        &-text {
          font-size: 18px;
        }
      }

      &-btn button {
        padding: 32px 22px;
      }
    }

    &-item:nth-child(7) {
      display: block;
    }
  }
}
</style>