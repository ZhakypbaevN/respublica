<template>
<LandingLayout :list="sideBarlinks">
  <FractionComposition />

  <DeputyRequests />

  <section
    class="partyFraction-links landing-block"
    id="send-an-appeal"
  >
    <div class="wrapper">
      <div class="links-wrapper scroll-top" id="links">
        <div class="partyFraction-links-items">
          <RouterLink to="/meeting-with-voters/1" class="toPageLink with-line" id="meetings-with-voters">
            <span>
              {{ $t('meeting-with-voters.title') }}
            </span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </RouterLink>
          <!-- <button 
            class="toPageLink with-line"
            @click="() => showSubmitAnAppeal = true"
          >
            <span>
              {{ $t('button.send-a-appeal') }}
            </span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </button> -->
        </div>
      </div>
    </div>
  </section>

  <SubmitAnAppealModal
    :show="showSubmitAnAppeal"
    @hide="() => showSubmitAnAppeal = false"
  />

</LandingLayout>
</template>
  
<script setup lang="ts">
import FractionComposition from '@/components/uiLanding/party-fraction/FractionComposition.vue';
import DeputyRequests from '@/components/uiLanding/party-fraction/DeputyRequests.vue';
import SubmitAnAppealModal from '@/components/uiLanding/feedback/SubmitAnAppealModal.vue';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showSubmitAnAppeal = ref(false);
const sideBarlinks = [
  {
    title: t('deputies'),
    link: "#fraction-composition"
  },
  {
    title: t('parliamentary-inquiries'),
    link: "#deputy-requests"
  },
  {
    title: t('meeting-with-voters.title'),
    link: "#meetings-with-voters"
  }
]
</script>
  
<style scoped lang="scss">
.partyFraction-links {
  padding-bottom: 100px;

  &-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 32%;
  }

  & .toPageLink:last-child {
    margin-bottom: 0px;
  }

  // Adaptation
  @media (max-width: 992px) {
    padding-bottom: 90px;

    &-items {
      padding-left: 20%;
    }
  }

  @media (max-width: 768px) {
    padding-bottom: 80px;

    &-items {
      padding-left: 15%;
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 60px;

    &-items {
      padding-left: 0;
    }
  }
}

</style>
  