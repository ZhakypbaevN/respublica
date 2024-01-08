<template>
  <main class="home wrapper-main">
    <div>
      <Header defaultFixed withoutPaddingBottom />

      <Intro />

      <AboutUs />

      <PartyProgram />

      <NewsList />

      <AboutParty
        @showJoinPartyModal="() => showJoinPartyModal = true"
      />
    </div>

    <Footer /> 
  </main>

  <JoinPartyModal
    :show="showJoinPartyModal"
    @hide="() => showJoinPartyModal = false"
  />
</template>

<script setup lang="ts">
  import Intro from '@/components/uiLanding/home-page/Intro.vue'
  import AboutUs from '@/components/uiLanding/home-page/AboutUs.vue'
  import PartyProgram from '@/components/uiLanding/home-page/PartyProgram.vue'
  import AboutParty from '@/components/uiLanding/home-page/AboutParty.vue'
  import NewsList from '@/components/uiLanding/home-page/NewsList.vue'
  import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

  import { ref } from 'vue';

  const showJoinPartyModal = ref(false)
</script>