<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">{{ $t('page.representation-of-party-members-in-maslikhats-and-in-positions-of-akims-at-all-levels') }}</h2>

          <ListDeputies />
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import ListDeputies from "@/components/uiLanding/regions-page/ListDeputiesOfMaslikhat.vue";
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}
</style>
  