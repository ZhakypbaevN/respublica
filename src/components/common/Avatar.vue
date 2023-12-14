<template>
  <div class="avatarBlock" :class="{mini: mini}">
    <SvgIcon
      name="avatar"
      :viewboxWidth="44"
      :viewboxHeight="44"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  mini?: boolean
}

withDefaults(defineProps<IProps>(), {
  mini: false
})
</script>

<style scoped lang="scss">
.avatarBlock {
  height: 65px;
  width: 65px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: var(--accent-color-op15);

  & svg {
    width: 40px;
    height: 40px;

    stroke: var(--accent-color);
  }

  &.mini {
    height: 48px !important;
    width: 48px !important;

    & svg {
      width: 36px !important;
      height: 36px !important;
    }
  }
  
  // Adaptation
  /* @media (max-width: 1200px) {
    height: 45px;
    width: 45px;
  }

  @media (max-width: 992px) {
    height: 42px;
    width: 42px;
  } */
}
</style>