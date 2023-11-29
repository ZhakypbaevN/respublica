<template>
  <section class="aboutParty landing-block">
    <div
      class="aboutParty-item withZoomPreview"
      v-for="item of aboutPartyList"
      :key="item.img"
    >
      <div class="aboutParty-item-preview withZoomPreview-preview-img" :style="`background-image: url('${item.img}');`"></div>

      <div v-if="item.title" class="aboutParty-item-content">
        <div class="aboutParty-item-content-bg" :style="{backgroundColor: item.color}"></div>
        <p class="aboutParty-item-content-text">{{ item.title }}</p>
      </div>
    </div>
    

    <div class="aboutParty-item aboutParty-item-btn">
      <Button
        :name="$t('home-about-party-join-the-party')"
        type="outline-light"
        uppercase
        @click="() => $emit('showJoinPartyModal')"
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
    img: '/img/uiLanding/about-party/events-1.jpg',
    title: t('home.about-party.item-1')
  },
  {
    color: null,
    img: '/img/uiLanding/about-party/events-2.jpg',
    title: null
  },
  {
    color: '#FF6B00',
    img: '/img/uiLanding/about-party/events-3.jpg',
    title: t('home.about-party.item-3')
  },
  {
    color: null,
    img: '/img/uiLanding/about-party/events-4.jpg',
    title: null
  },
  {
    color: null,
    img: '/img/uiLanding/about-party/events-5.jpg',
    title: null
  },
  {
    color: '#4A78EC',
    img: '/img/uiLanding/about-party/events-6.jpg',
    title: t('home.about-party.item-6')
  },
  {
    color: null,
    img: '/img/uiLanding/about-party/events-7.jpg',
    title: null
  }
]
</script>

<style scoped lang="scss">
.aboutParty {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

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
}
</style>