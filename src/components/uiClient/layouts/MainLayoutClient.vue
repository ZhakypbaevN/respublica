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
    title: 'Личные данные',
    link: "/client/user-data"
  },
  {
    title: 'Новости',
    link: "/news"
  },
  {
    title: 'Донаты',
    link: "/client/test"
  },
  {
    title: 'Записаться на прием',
    link: "/client/test"
  },
  {
    title: 'История обращений',
    link: "/client/my-requests"
  },
  {
    title: 'Подать обращение',
    link: "/client/test"
  }
]
</script>

<style scoped lang="scss">
.managerLayout {
  height: 100vh;
  display: grid;
  flex-direction: column;
  grid-template-rows: 100px 1fr;

  &-inner {
    display: grid;
    align-items: stretch;
    grid-template-columns: 325px 1fr;
  }

  &-content {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
