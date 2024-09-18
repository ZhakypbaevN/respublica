<template>
  <div class="analytics-item">
    <div class="analytics-item-header">
      <h4 class="analytics-title">{{ title }}</h4>

      <slot name="actions"></slot>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    title: string,
    modelValue?: any,
  }

  defineProps<IProps>()
</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
    padding: 40px 0;
  }

  .analytics {
    &-item {
      padding: 20px 30px;
      border-radius: 10px;
      background: white;

      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 24px;
      }
    }

    &-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 0px !important;
    }
  }
</style>