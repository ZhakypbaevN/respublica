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
import SideBar from '@/components/common/SideBar.vue';
import HeaderManager from '@/components/uiManager/layouts/HeaderManager.vue';

import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = [
  {
    title: t('page.party-members'),
    link: "/manager/party-list/active?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.requests-for-deletion'),
    link: "/manager/party-resignation-list?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.deleted'),
    link: "/manager/deleted-party-list/revoked?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.vip-rooms'),
    link: "/manager/ticket-num-data-list?offset=0&limit=20&published=true&search="
  },
  {
    title: t('page.analytics'),
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
