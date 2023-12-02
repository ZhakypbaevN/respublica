<template>
  <div class="layout">
    <HeaderMedia />

    <div class="layout-inner">
      <SideBar :list="sideBarlinks"></SideBar>

      <div class="layout-content" id="layout-content">
        <router-view v-slot="{ Component }">
          <transition mode="out-in">
            <!-- <keep-alive> -->
              <component :is="Component" :key="$route.path" />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

import SideBar from '@/components/common/SideBar.vue';
import HeaderMedia from '@/components/uiMedia/layouts/HeaderMedia.vue';

const { t } = useI18n()

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = [
  {
    title: t('page.news'),
    link: "/media/news-list?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.news-for-the-faction'),
    link: "/media/news-for-fraction?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.the-press-about-us'),
    link: "/media/press-about-us?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.video-gallery'),
    link: "/media/video-gallery?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.photo-gallery'),
    link: "/media/photo-gallery"
  },
  {
    title: t('page.announcements'),
    link: "/media/announcements"
  }
]
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  display: grid;
  flex-direction: column;
  grid-template-rows: 100px 1fr;

  &-inner {
    display: grid;
    align-items: stretch;
    grid-template-columns: 290px 1fr;
  }

  &-content {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
