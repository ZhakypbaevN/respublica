<template>
  <div class="youtubeVideo" v-html="vidoe"></div>
</template>

<script setup lang="ts">
interface IProps {
  vidoe: String,
}
withDefaults(defineProps<IProps>(), {})
</script>

<style lang="scss">
.youtubeVideo {
  & .ytp-chrome-top-buttons {
    display: none !important;
  }
}
</style>
