<template>
  <section class="party-leaders landing-block" id="party-leaders">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('about-us-page.party-leaders.title') }}</h2>
      <div class="management-items">
        <div
          class="management-item"
          v-for="lider of list"
          :key="lider.fullName"
        >
          <div class="management-preview bg-cover" :style="`background-image: url('${lider.img}');`">
            <a class="management-preview-link" :href="lider.instagram" target="_blank">
              <SvgIcon
                name="instagram-line-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
          </div>
            
          <h4 class="management-title">{{ lider.fullName }}</h4>
          <p class="management-descriptoin" v-html="lider.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const list = [
  {
    img: '/img/uiLanding/liders/khodzhanazarov.jpg',
    fullName: t('about-us-page.party-leaders.khojanazarov'),

    instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ==',
    description: t('about-us-page.party-leaders.khojanazarov-description')
  },
  {
    img: '/img/uiLanding/liders/alibekov.jpg',
    fullName: t('about-us-page.party-leaders.alibekov'),
    instagram: 'https://instagram.com/alibekovkz?igshid=MzRlODBiNWFlZA==',
    description: t('about-us-page.party-leaders.alibekov-description')
  },
  {
    img: '/img/uiLanding/liders/baryshev.jpg',
    fullName: t('about-us-page.party-leaders.baryshev'),
    instagram: 'https://instagram.com/baryshev_maxim?igshid=MzRlODBiNWFlZA==',
    description: t('about-us-page.party-leaders.baryshev-description')
  },
  {
    img: '/img/uiLanding/liders/berdenov.jpg',
    fullName: t('about-us-page.party-leaders.berdenov'),
    instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ==',
    description: t('about-us-page.party-leaders.berdenov-description')
  },
  {
    img: '/img/uiLanding/liders/koyanbayev.jpg',
    fullName: t('about-us-page.party-leaders.koyanbaev'),
    instagram: 'https://instagram.com/nurlankoyanbayev?igshid=MzRlODBiNWFlZA==',
    description: t('about-us-page.party-leaders.koyanbaev-description')
  },
  {
    img: '/img/uiLanding/liders/tau.jpg',
    fullName: t('about-us-page.party-leaders.tau'),
    instagram: 'https://instagram.com/syrymbek_tau?igshid=MzRlODBiNWFlZA==',
    description: t('about-us-page.party-leaders.tau-description')
  },
  {
    img: '/img/uiLanding/liders/shonbay.jpg',
    fullName: t('about-us-page.party-leaders.shonby'),
    instagram: 'https://instagram.com/kuantr?igshid=MzRlODBiNWFlZA==',
    description: t('about-us-page.party-leaders.shonby-description')
  },
  {
    img: '/img/uiLanding/liders/shukizhanova.jpg',
    fullName: t('about-us-page.party-leaders.shukizhanova'),
    instagram: 'https://instagram.com/dinarashukizhanova?igshid=NTc4MTIwNjQ2YQ==',
    description: t('about-us-page.party-leaders.shukizhanova-description')
  }
]
</script>

<style scoped lang="scss">
.management {
  &-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 50px;
  }

  &-preview {
    padding-top: 92%;
    background-color: var(--light-gray-color);

    margin-bottom: 15px;
    position: relative;

    &-link {
      height: 40px;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: var(--accent-color);
      border-radius: 50%;

      position: absolute;
      left: 10px;
      bottom: 10px;

      opacity: .8;
      transform: scale(1);
      transition: all .3s ease-in-out;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      & svg {
        height: 34px;
        width: 34px;
      }
    }
  }

  &-title {
    color: var(--accent-color);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>