<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <FractionComposition single />
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import FractionComposition from '../../../components/uiLanding/partyFraction/fractionComposition.vue';
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}
</style>
  