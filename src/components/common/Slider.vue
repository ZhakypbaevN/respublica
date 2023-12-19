<template>
<div class="slider">
  <div class="landing-header">
    <h2 v-if="title" class="landing-title">
      {{ title }}
    </h2>

    <RouterLink v-if="link" :to="link" class="landing-header-link">
      <span>{{ $t('button.view-all') }}</span>
      <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
    </RouterLink>
  </div>

  <div class="slider-block" ref="sliderBlock">
    <div
      class="slider-slides"
      :style="sliderStyle"
    >
      <slot />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface IProps {
  title?: string,
  link?: string,
}

withDefaults(defineProps<IProps>(), {})

const margins = ref(70)

const sliderStyle = computed(() => {
  return {
    width: document.body.clientWidth + 'px',
    margin: `0px ${-Math.abs(margins.value)}px`,
    padding: `0px ${margins.value}px`
  }
})

onMounted(() => {
  margins.value = (document.body.clientWidth - document.querySelectorAll('.slider-block')[0].clientWidth) / 2
})
</script>

<style scoped lang="scss">
.slider {

  &-slides {
    display: flex;
    align-items: center;
    grid-gap: 30px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.showAll {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 10px;
  margin: 0 50px;

  & .arrow {
    height: 50px;
    width: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #0082FA;
    border-radius: 50%;
    transition: all .3s ease-in-out;
  }

  & p.title {
    font-weight: 500;
    font-size: 18px;
    white-space: nowrap;
    color: rgba(#161931, .6);
    transition: all .3s ease-in-out;
  }

  &:hover {
    & .arrow {
      background-color: rgba(#0082FA, .07);
    }
    & p.title {
      color: #161931;
    }
  }
}

// Adaptation
@media (max-width: 1440px) {
  .slider {
    grid-gap: 28px;
  }
}
@media (max-width: 1200px) {
  .slider {
    grid-gap: 26px;
  }
}
@media (max-width: 992px) {
  .slider {
    grid-gap: 24px;
  }
}
@media (max-width: 768px) {
  .slider {
    grid-gap: 22px;
  }
}
</style>
