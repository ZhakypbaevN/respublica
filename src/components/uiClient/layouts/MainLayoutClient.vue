<template>
  <div class="managerLayout">
    <HeaderClient v-model="showSideBar" />

    <div class="managerLayout-inner" :class="{showSideBar: showSideBar}">
      <SideBar
        class="managerLayout-sideBar"
        :list="sideBarlinks"
        @clickNav="() => showSideBar = false"
      />
      <div
        class="managerLayout-sideBar-back"
        :class="{show: showSideBar}"
        @click="() => showSideBar = false"
      />

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

    <SubmitAnAppealModal
      :show="showModalSubmitAnAppeal"
      @hide="() => showModalSubmitAnAppeal = false"
    />
  </div>
</template>

<script setup>
  import SideBar from '@/components/common/SideBar.vue';
  import HeaderClient from '@/components/uiClient/layouts/HeaderClient.vue';
  import SubmitAnAppealModal from '@/components/uiLanding/feedback/SubmitAnAppealModal.vue';

  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'

  const { t } = useI18n()
  const { toast } = useToast()

  const showModalSubmitAnAppeal = ref(false);
  const showSideBar = ref(window.innerWidth >= 992);
  const sideBarlinks = [
    {
      title: t('page.personal-data'),
      link: "/client/user-data"
    },
    {
      title: t('page.news'),
      link: "/client/news"
    },
    {
      title: t('page.donations'),
      link: "/client/donations"
    },
    {
      title: t('feedback.make-an-appointment'),
      func: () => {
        toast({
          message: t('status.the-page-is-in-development')
        })
      }
    },
    {
      title: t('page.the-history-of-appeals'),
      // link: "/client/my-requests",
      func: () => {
        toast({
          message: t('status.the-page-is-in-development')
        })
      }
    },
    {
      title: t('feedback.submit-an-appeal'),
      func: () => showModalSubmitAnAppeal.value = true
    }
  ]
</script>

<style lang="scss">
.managerLayout {
  height: 100vh;

  display: grid;
  flex-direction: column;
  grid-template-rows: 70px 1fr;

  &-inner {
    position: relative;
    display: flex;
    justify-content: end;

    &.showSideBar .managerLayout {
      &-sideBar {
        left: 0;
      }

      &-content {
        width: calc(100% - 220px);
      }
    }
  }

  &-sideBar {
    height: 100%;
    width: 220px;

    position: absolute;
    left: -300px;
    top: 0;
    z-index: 100;

    transition: all .3s ease-in-out;

    &-back {
      display: none;
      height: 100vh;
      width: 100%;

      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;

      opacity: 0;
      overflow: hidden;
      
      background: rgba(33, 37, 41, 0.8);
      transition: all .3s ease-in-out;

      &.show {
        opacity: 1;
        overflow: visible;
      }
    }
  }

  &-content {
    height: calc(100vh - 70px);
    width: 100%;
    
    overflow-x: hidden;
    overflow-y: auto;

    transition: all .3s ease-in-out;
  }

  // Adaptation
  @media (max-width: 1400px) {
    & .wrapper {
      padding: 0 20px;
    }
  }

  @media (max-width: 992px) {
    grid-template-rows: 63px 1fr;

    &-inner {
      &.showSideBar .managerLayout-content {
        width: 100%;
      }
    }

    &-sideBar {
      width: 190px;
      box-shadow: 0 4px 20px rgba(#000,.25);

      &-back {
        display: block;
      }
    }

    &-content {
      height: calc(100vh - 63px);
    }
  }

  @media (max-width: 576px) {
    & .wrapper {
      padding: 0 15px;
    }
  }
}
</style>
