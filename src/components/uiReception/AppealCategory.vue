<template>
  <div
    class="appealCategory"
    :style="{
      backgroundColor: color + '1A',
      color: color
    }"
  >
    {{ title }}
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    color: string,
    title: string
  }
  defineProps<IProps>()
</script>

<style scoped lang="scss">
  .appealCategory {
    width: fit-content;
    
    display: inline-block;
    border-radius: 8px;
    
    padding: 9px 19px;

    font-size: 18px;
    font-weight: 500;
  }
</style>