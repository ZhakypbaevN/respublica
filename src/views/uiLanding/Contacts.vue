<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="news landing-block" id="newsList">
        <div class="wrapper">
        
          <h2 class="landing-title">Центральный аппарат</h2>
          <ContactsCentralOffice />
     
          <h2 class="landing-title">Филиалы</h2>
          <ContactsBranch />
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import ContactsBranch from '../../components/uiLanding/contacts/contactsBranch.vue';
import ContactsCentralOffice from '../../components/uiLanding/contacts/contactsCentralOffice.vue';
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