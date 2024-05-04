<template>
  <div class="videoItem">
    <div v-if="createdAt" class="videoItem-date">
      <SvgIcon
        name="calendar-check"
        :viewboxWidth="16"
        :viewboxHeight="17"
      />
      <span>{{ convertDateTime(createdAt) }}</span>
    </div>
    <div class="videoItem-container" v-html="src"></div>
  </div>
</template>

<script setup lang="ts">
import convertDateTime from '@/helpers/convertDateTime';

interface IProps {
  src: String,
  createdAt?: String
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
.videoItem {
  position: relative;

  &-date {
    display: flex;
    align-items: center;
    grid-gap: 7px;

    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: var(--primary-color);

    padding: 5px 15px;
    border-top-left-radius: 10px;

    & svg {
      width: 16px;
      height: 17px;
      fill: var(--accent-color);
    }

    & span {
      color: white;
      font-size: 16px;
      line-height: 1.4;
      font-weight: 500;
    }
  }

  &-container {
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

  // Adaptation
  @media (max-width: 1200px) {
    &-date {
      grid-gap: 7px;
      padding: 5px 15px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    &-date {
      grid-gap: 7px;
      padding: 5px 15px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 576px) {
    &-date {
      grid-gap: 7px;
      padding: 4px 10px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }
  }
}
</style>
