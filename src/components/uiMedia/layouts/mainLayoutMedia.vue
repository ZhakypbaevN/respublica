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
import SideBar from '../../common/SideBar.vue';
import HeaderMedia from './headerMedia.vue';

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = [
  {
    title: 'Новости',
    link: "/media/news-list"
  },
  {
    title: 'Новости для фракции',
    link: "/media/news-for-fraction"
  },
  {
    title: 'Пресса о нас',
    link: "/media/press-about-us"
  },
  {
    title: 'Видеогалерея',
    link: "/media/video-gallery"
  },
  {
    title: 'Фотогалерея',
    link: "/media/photo-gallery"
  },
  {
    title: 'Закупы, объявления',
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
