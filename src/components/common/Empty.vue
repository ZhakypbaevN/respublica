<template>
  <div class="empty" :class="{mini: mini}">
    <SvgIcon
      name="empty-folder"
      :viewboxWidth="683"
      :viewboxHeight="683"
    />

    <h2 class="empty-title">{{ title ?? $t('message.nothing-seems-to-be-found') }}</h2>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title?: string,
  mini?: boolean
}

withDefaults(defineProps<IProps>(), {
  mini: false
})
</script>

<style scoped lang="scss">
.empty {
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 30px 0;

  &.mini {
    & svg {
      width: 100px;
      height: 100px;

      margin-bottom: 20px;
    }

    & .empty-title {
      font-size: 30px;
    }
  }

  & svg {
    width: 200px;
    height: 200px;
    fill: var(--light-gray-color-op50);

    margin-bottom: 30px;
  }

  &-title {
    font-size: 38px;
    font-weight: 700;
    color: var(--light-gray-color-op50);
  }
}
</style>