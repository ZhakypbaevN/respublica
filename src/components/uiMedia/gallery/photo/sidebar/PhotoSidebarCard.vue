<template>
  <button
    class="albom withZoomPreview"
    :class="{ active: active }"
  >
    <div class="albom-preview withZoomPreview-preview">
      <div
        class="albom-preview-img bg-cover withZoomPreview-preview-img"
        :style="`background-image: url(${getFileUrl(albom.preview_image)});`"
      ></div>
    </div>

    <div class="albom-info">
      <span class="albom-info-name">{{ albom.title }}</span>
      <span class="albom-info-date">{{ convertDateTime(albom.date) }}</span>
      <span class="albom-info-city">{{ albom.place }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import convertDateTime from '@/helpers/convertDateTime'
import getFileUrl from '@/helpers/getFileUrlByDate'

interface IProps {
  albom: any,
  active: boolean
}
defineProps<IProps>()
</script>

<style scoped lang="scss">
.albom {
  width: 100%;
  
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 14px;

  padding: 16px 20px;
  border-radius: 5px;
  border: 2px solid var(--light-gray-color-op20);

  cursor: pointer;
  transition: 0.3s ease-in-out;

  position: relative;

  &:hover {
    background-color: var(--accent-color-op10);
    border-color: var(--accent-color-op15);
  }

  &.active {
    border-radius: 10px;
    border-color: var(--accent-color-op50);
    background-color: var(--accent-color-op10);

    & .albom-info-name {
      color: var(--accent-color);
    }
  }

  &-preview {
    border-radius: 80px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;

      transition: .3s ease-in-out;
    }

    &-date {
      font-size: 16px;
      color: var(--light-gray-color);
      font-weight: 500;
      margin-bottom: 3px;
    }

    &-city {
      font-size: 16px;
      font-weight: 400;
      color: var(--grey-color);
    }
  }
}
</style>