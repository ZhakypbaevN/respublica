<template>
  <div class="managerLayout">
    <HeaderClient />

    <div class="managerLayout-inner">
      <SideBar :list="sideBarlinks"></SideBar>

      <div class="managerLayout-content">
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
import SideBar from '../../common/SideBar.vue';
import HeaderClient from './headerClient.vue';

const sideBarlinks = [
  {
    title: 'История обращений',
    link: "/client/my-requests"
  },
  {
    title: 'Личные данные',
    link: "/client/test"
  },
  {
    title: 'Записаться на прием',
    link: "/client/test"
  },
  {
    title: 'Подать обращение',
    link: "/client/test"
  },
  {
    title: 'Донаты',
    link: "/client/test"
  },
  {
    title: 'Скачать партбилет',
    link: "/client/test"
  },
  {
    title: 'Новости',
    link: "/client/test"
  },
  {
    title: 'Выйти из партии',
    link: "/client/exit-party"
  },
]
</script>

<style scoped lang="scss">
.managerLayout {
  height: 100vh;
  overflow: hidden;

  &-inner {
    display: grid;
    grid-template-columns: 325px 1fr;
  }

  &-content {
    overflow-y: auto;
  }
}
</style>
