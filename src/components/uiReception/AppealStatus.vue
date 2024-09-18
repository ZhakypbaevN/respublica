<template>
  <div :class="`appealStatus ${code}`">{{ title }}</div>
</template>

<script setup lang="ts">
  interface IProps {
    title: string,
    code: string
  }

  defineProps<IProps>()
</script>

<style scoped lang="scss">
.appealStatus {
  width: fit-content;
  padding: 9px 19px;
  border-radius: 8px;

  color: var(--white-color);
  font-size: 18px;
  font-weight: 500;

  margin-top: 20px;
  
  &.accepted, &.finish {
    background-color: var(--green-color);
  }

  &.rejected {
    background-color: var(--red-color);
  }

  &.in-revision {
    background-color: var(--accent-color);
  }
}
</style>
