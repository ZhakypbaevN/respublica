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

  import { IAlbom } from '@/types/photo-gallery';

  interface IProps {
    albom: IAlbom,
    active: boolean
  }
  defineProps<IProps>()
</script>

<style scoped lang="scss">
.albom {
  width: 100%;
  
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 14px;
  
  padding: 18px 25px;

  border-radius: 0px;
  border: 2px solid transparent;
  
  cursor: pointer;
  transition: 0.3s ease-in-out;

  position: relative;

  &::after {
    content: '';

    display: block;
    width: 100%;
    height: 0px;

    position: absolute;
    left: 0;
    bottom: -8px;
    z-index: 2;

    border-bottom: 2px solid var(--light-gray-color-op20);
  }

  &:hover {
    background-color: var(--accent-color-op10);
    border-color: var(--accent-color-op15);
  }

  &.active {
    border-radius: 5px;
    border-color: var(--accent-color-op50);
    background-color: var(--accent-color-op10);

    & .albom-info-name {
      color: var(--accent-color);
    }
  }

  &-preview {
    border-radius: 100px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-name {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;

      transition: .3s ease-in-out;
    }

    &-date {
      font-size: 18px;
      color: var(--light-gray-color);
      font-weight: 500;
      margin-bottom: 4px;
    }

    &-city {
      font-size: 18px;
      font-weight: 400;
      color: var(--grey-color);
    }
  }

  // Adaptation
  @media (max-width: 1200px) {
    grid-template-columns: 80px 1fr;
    grid-gap: 12px;
    
    padding: 10px 14px;

    &-info {
      &-name {
        font-size: 18px;
        margin-bottom: 10px;
      }

      &-date {
        font-size: 16px;
        margin-bottom: 2px;
      }

      &-city {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    border-bottom-color: transparent;
  }

  @media (max-width: 660px) {
    border-bottom-color: var(--light-gray-color-op20);
  }
}
</style>