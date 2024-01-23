<template>
  <Transition name="fade">
    <div class="progress" v-if="visible">
      <span/>
    </div>
  </Transition>
</template>

<script setup>
import Progress from '@/modules/progress'

const { value, visible } = new Progress()
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
.progress span {
  display: block;
  height: 2px;
  background-color: var(--accent-color);
  border-radius: 0 2px 2px 0;
  width: v-bind(value);
  transition: width .3s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
