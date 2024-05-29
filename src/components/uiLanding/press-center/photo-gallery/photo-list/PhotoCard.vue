<template>
  <button
    class="photoItem withZoomPreview"
  >
    <div class="photoItem-preview withZoomPreview-preview">
      <div
        class="photoItem-preview-img bg-cover withZoomPreview-preview-img"
        :style="`background-image:url('${getFileUrl(data.preview_image)}');`"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import getFileUrl from '@/helpers/getFileUrlByDate'

  import { IAlbomImage } from '@/types/photo-gallery';

  interface IProps {
    data: IAlbomImage,
  }

  const props = defineProps<IProps>()
</script>

<style scoped lang="scss">
.photoItem {
  border-radius: 10px;
  border: 2px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  padding: 0px !important;
  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
  }

  &-preview {
    width: 100%;

    &-img {
      padding-bottom: 68.75%;
    }
  }
}
</style>