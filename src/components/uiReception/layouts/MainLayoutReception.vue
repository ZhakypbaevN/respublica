<template>
  <div class="layout">
    <HeaderReception />

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
import HeaderReception from '@/components/uiReception/layouts/HeaderReception.vue';

import { reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

onMounted(() => {
  document.body.style ='height:100vh;overflow:hidden;';
})

const sideBarlinks = reactive([
  {
    title: t('status.new'),
    link: "/reception/appeal-list/new",
    typeButton: true
  },
  {
    title: t('status.accepted'),
    link: "/reception/appeal-list/accepted",
    typeButton: true
  },
  {
    title: t('status.completed'),
    link: "/reception/appeal-list/completed",
    typeButton: true
  },
  {
    title: t('page.analytics'),
    link: "/reception/analytics",
    typeButton: true
  }
])

// const sideBarlinks = reactive([
//   {
//     title: t('status.new'),
//     link: "/reception/appeal-list/new",
//     typeButton: true
//   },
//   {
//     title: t('status.in-processing'),
//     typeDropDown: true,
//     active: false,
//     children: [
//       {
//         title: t('status.in-processing'),
//         link: "/reception/page-in-development",
//       },
//       {
//         title: t('status.for-signature'),
//         link: "/reception/page-in-development",
//       },
//       {
//         title: t('status.to-the-competent-authority'),
//         link: "/reception/page-in-development",
//       }
//     ]
//   },
//   {
//     title: t('status.signed'),
//     link: "/reception/appeal-list/signed",
//     typeButton: true
//   },
//   {
//     title: t('status.completed'),
//     typeDropDown: true,
//     active: false,
//     children: [
//       {
//         title: t('status.positive-response'),
//         link: "/reception/page-in-development",
//       },
//       {
//         title: t('status.an-explanation-is-given'),
//         link: "/reception/page-in-development",
//       },
//       {
//         title: t('status.unresolved-issues'),
//         link: "/reception/page-in-development",
//       },
//       {
//         title: t('status.not-subject-to-review'),
//         link: "/reception/page-in-development",
//       }
//     ]
//   },
//   {
//     title: t('page.analytics'),
//     link: "/reception/analytics",
//     typeButton: true
//   },
// ])
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
