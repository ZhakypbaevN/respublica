<template>
  <section class="fraction landing-block" id="fraction-composition">
    <div class="wrapper" :class="{'landing-wrapper': single}">
      <h2 v-if="single" class="landing-title center">{{ $t('page.mazhilis-deputies') }}</h2>
      <h2 v-else class="landing-title">{{ $t('composition-of-faction.title') }}</h2>
   
      <FractionList />

      <FractionSlider />
    </div>
  </section>
</template>

<script setup lang="ts">
  import FractionList from '@/components/uiLanding/party-fraction/FractionList.vue';
  import FractionSlider from '@/components/uiLanding/party-fraction/FractionSlider.vue';

  interface IProps {
    single?: boolean,
  }

  withDefaults(defineProps<IProps>(), {
    single: false
  })
</script>

<style>
.fraction {
  width: 100%;
  overflow-x: hidden;
}
</style>