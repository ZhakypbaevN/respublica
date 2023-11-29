<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Представленность членов партии в маслихатах и на должностях акимов всех уровней.</h2>

          <ListDeputies />
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import ListDeputies from "@/components/uiLanding/regions/listDeputiesOfMaslikhat.vue";
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}
</style>
  