<template>
<LandingLayout :list="sideBarlinks">
  <FractionComposition />

  <DeputyRequests />

  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <div class="links-wrapper scroll-top" id="links">
        <div class="links">
          <RouterLink to="/" class="landing-link with-line" id="meetings-with-voters">
            <span>ВСТРЕЧИ с избирателями</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </RouterLink>
          <button 
            class="landing-link with-line"
            id="send-an-appeal"
            @click="() => showSubmitAnAppeal = true"
          >
            <span>Направить обращение</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </button>
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
import FractionComposition from '../../components/uiLanding/partyFraction/FractionComposition.vue';
import DeputyRequests from '../../components/uiLanding/partyFraction/DeputyRequests.vue';
import SubmitAnAppealModal from '../../components/uiLanding/feedback/SubmitAnAppealModal.vue';

import { ref } from 'vue';

const showSubmitAnAppeal = ref(false);
const sideBarlinks = [
  {
    title: 'Депутаты',
    link: "#fraction-composition"
  },
  {
    title: 'Депутатские запросы',
    link: "#deputy-requests"
  },
  {
    title: 'Встречи с избирателями',
    link: "#meetings-with-voters"
  }
]
</script>
  
<style scoped lang="scss">
.links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 32%;
}

.deputyRequests {
  padding-bottom: 100px;
}
</style>
  