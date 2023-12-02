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
const sideBarlinks = [
  {
    title: t('page.personal-data'),
    link: "/client/user-data"
  },
  {
    title: t('page.news'),
    link: "/news"
  },
  {
    title: t('page.donations'),
    link: "/client/test"
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
    link: "/client/my-requests"
  },
  {
    title: t('feedback.submit-an-appeal'),
    func: () => showModalSubmitAnAppeal.value = true
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
    grid-template-columns: 290px 1fr;
  }

  &-content {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
