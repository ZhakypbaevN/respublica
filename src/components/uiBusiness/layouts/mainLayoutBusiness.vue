<template>
  <div class="layout">
    <HeaderBusiness />

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
import HeaderBusiness from './headerBusiness.vue';

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = [
  {
    title: 'Новые',
    link: "/business/appeal-list/new",
    typeButton: true
  },
  {
    title: 'В обработке',
    typeDropDown: true,
    active: false,
    children: [
      {
        title: 'В обработке',
        link: "/business/page-in-development",
      },
      {
        title: 'На подпись',
        link: "/business/page-in-development",
      },
      {
        title: 'В компетентный орган',
        link: "/business/page-in-development",
      }
    ]
  },
  {
    title: 'Завершенные',
    typeDropDown: true,
    active: false,
    children: [
      {
        title: 'Положительный ответ',
        link: "/business/page-in-development",
      },
      {
        title: 'Дано разъяснение',
        link: "/business/page-in-development",
      },
      {
        title: 'Не решенные',
        link: "/business/page-in-development",
      },
      {
        title: 'Не подлежат рассмотрению',
        link: "/business/page-in-development",
      }
    ]
  },
  {
    title: 'Аналитика',
    link: "/business/analytics",
    typeButton: true
  },
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
