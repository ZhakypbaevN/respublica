<template>
  <button
    class="ticketNumItem"
    @click="() => {}"
  >
    <div class="ticketNumItem-symbol skeleton skeleton-bg full-text">B</div>
    <h3 class="ticketNumItem-title skeleton middle-text">
    </h3>
    <div
      v-if="!withoutDelete"
      class="ticketNumItem-btn skeleton"
      type="default-light-grey"
    >
    </div>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  withoutDelete: boolean,
}

withDefaults(defineProps<IProps>(), {
  withoutDelete: false
})
</script>

<style scoped lang="scss">
.ticketNumItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 50px;
  padding: 20px;
  padding-left: 50px;

  border-radius: 10px;
  border: 1px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  &-symbol {
    position: absolute;
    left: -8px;
    bottom: -45px;

    font-size: 110px;
    font-weight: 900;
  }
  
  &-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0px;
  }

  &-btn {
    height: 50px;
    width: 50px;
    border-radius: 10px;
  }
}
</style>