<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="news landing-block" id="newsList">
        <div class="wrapper">
        
          <h2 class="landing-title">{{ $t('contacts.central-office') }}</h2>
          <ContactsCentralOffice />
     
          <h2 class="landing-title">{{ $t('page.branches') }}</h2>
          <ContactsBranch />
        </div>
      </section>
    </div>

    <Footer withoutLandingWrapper />
  </div>
</template>

<script setup lang="ts">
import ContactsBranch from '@/components/uiLanding/contacts-page/ContactsBranch.vue';
import ContactsCentralOffice from '@/components/uiLanding/contacts-page/ContactsCentralOffice.vue';

</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}

.wrapper  {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
}
</style>