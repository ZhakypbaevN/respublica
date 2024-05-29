<template>
  <div v-if="loading" class="sidebar">
    <PhotoSidebarCardSkeleton v-for="albom in 4" :key="albom" />
  </div>

  <div
    v-else
    class="sidebar"
  >
    <PhotoSidebarCard
      v-for="albom of albomlist"
      :key="albom.title"
      :albom="albom"
      :active="modelValue === albom.id"
      @click="() => $emit('update:modelValue', albom.id)"
    />
  </div>
</template>

<script setup lang="ts">
  import PhotoSidebarCard from '@/components/uiMassMedia/gallery/photo/sidebar/PhotoSidebarCard.vue';
  import PhotoSidebarCardSkeleton from '@/components/uiMassMedia/gallery/photo/sidebar/PhotoSidebarCardSkeleton.vue';

  import { IAlbom } from '@/types/photo-gallery';

  interface IProps {
    albomlist: IAlbom[],
    modelValue: number,
    loading: boolean
  }
  interface Emits {
    (event: 'update:modelValue', value: any): void
  }

  defineProps<IProps>()
  defineEmits<Emits>()
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
}
</style>