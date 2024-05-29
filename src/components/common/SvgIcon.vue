<template>
  <svg :viewBox="'0 0 ' + viewboxWidth + ' ' + viewboxHeight" xmlns:xlink="http://www.w3.org/1999/xlink" :style="'fill:' + fill + ';display:block;'">
    <use :xlink:href="'/img/icons/icons.svg#' + name" x="0" y="0" @load="loaded" />
    <div class="skeleton" v-if="!isLoad"></div>
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
  name?: string,
  width?: number,
  height?: number,
  viewboxWidth?: number | string,
  viewboxHeight?: number | string,
  fill?: string
}

withDefaults(defineProps<IProps>(), {
  name: '',
  viewboxWidth: 24,
  viewboxHeight: 24
})

const isLoad = ref(false)
const loaded = () => {
  isLoad.value = true
}
</script>

<style scoped>
.skeleton {
  width: 100%;
  height: 100%;
}
</style>
