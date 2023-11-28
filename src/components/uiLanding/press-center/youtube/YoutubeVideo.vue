<template>
  <div class="video-container" v-html="src"></div>
</template>

<script setup lang="ts">
interface IProps {
  src: String,
}
withDefaults(defineProps<IProps>(), {})


var videos = document.querySelectorAll("video");
videos.forEach(function(video) {
  video.addEventListener("click", function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});
</script>

<style lang="scss">
.video-container {
  height: 0;
  width: 100%;
  
  position: relative;
  padding-bottom: 56.25%;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
