<template>
  <button class="lang" :class="{light: light}">
    <span>РУС</span>
  </button>
</template>

<script setup lang="ts">
  interface IProps {
    light?: boolean,
  }

  withDefaults(defineProps<IProps>(), {
    light: false,
  })
</script>

<style scoped lang="scss">
  .lang {
    &.light {
      & span {
        color: white;
      }
    }
    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 500;
      text-decoration: underline;

      transition: all .3s ease-in-out;
    }
  }
</style>