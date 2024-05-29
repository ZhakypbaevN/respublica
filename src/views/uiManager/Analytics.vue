<template>
  <section class="wrapper-main">
    <div class="analytics wrapper">
      <div class="analytics-block">
        <UsersChart />

        <MapRegions />

        <UsersGender />

        <PieChart />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import UsersChart from "@/components/uiManager/analytic/UsersChart.vue"
  import MapRegions from "@/components/uiManager/analytic/MapRegions.vue"
  import PieChart from "@/components/uiManager/analytic/PieChart.vue"
  import UsersGender from "@/components/uiManager/analytic/UsersGender.vue"
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.analytics {
  &-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px 28px;
  }
}
</style>