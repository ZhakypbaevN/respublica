<template>
  <div class="layout">
    <HeaderManager />

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
import HeaderManager from './headerManager.vue';

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = [
  {
    title: 'Члены партии',
    link: "/manager/party-list/active"
  },
  {
    title: 'Заявки на удаление',
    link: "/manager/party-resignation-list"
  },
  {
    title: 'Удаленные',
    link: "/manager/party-list/revoked"
  },
  {
    title: 'VIP номера',
    link: "/manager/ticket-num-data-list"
  },
  {
    title: 'Аналитика',
    link: "/manager/analytics"
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
