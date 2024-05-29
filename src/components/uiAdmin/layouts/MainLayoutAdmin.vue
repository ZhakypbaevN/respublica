<template>
  <div class="managerLayout">
    <HeaderAdmin />

    <div class="managerLayout-inner">
      <SideBar v-model:list="sideBarlinks"></SideBar>

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
  import SideBar from '@/components/common/SideBar.vue';
  import HeaderAdmin from '@/components/uiAdmin/layouts/HeaderAdmin.vue';
  
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const sideBarlinks = reactive([
    {
      title: t('page.users'),
      link: "/admin/users"
    },

    // Manager
    {
      title: t('page.party'),
      typeDropDown: true,
      active: false,
      children: [
        {
          title: t('page.party-members'),
          link: "/admin/party-list/active?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.requests-for-deletion'),
          link: "/admin/party-resignation-list?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.deleted'),
          link: "/admin/deleted-party-list/revoked?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.vip-rooms'),
          link: "/admin/ticket-num-data-list?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.analytics'),
          link: "/admin/analytics"
        },
      ]
    },

    // Media
    {
      title: t('page.the-press-about-us'),
      typeDropDown: true,
      active: false,
      children: [
        {
          title: t('page.news'),
          link: "/admin/news-list?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.news-for-the-faction'),
          link: "/admin/news-for-fraction?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.the-press-about-us'),
          link: "/admin/press-about-us?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.video-gallery'),
          link: "/admin/video-gallery?offset=0&limit=20&published=true&search="
        },
        {
          title: t('page.photo-gallery'),
          link: "/admin/photo-gallery"
        },
        {
          title: t('page.announcements'),
          link: "/admin/announcements"
        }
      ]
    },
  ])
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
    grid-template-columns: 240px 1fr;
  }

  &-content {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
