<template>
   <div
    v-if="imagesValues.isEmpty"
    class="photoItems"
  >
    Empty
  </div>
  <div
    v-else-if="loading || !imagesValues.tableValues"
    class="photoItems"
  >
    <div
      v-for="item in 9"
      :key="item"
      class="photoItems-cardSkeleton skeleton"
    />
  </div>
  <div
    v-else
    class="photoItems"
  >
    <PhotoCard
      v-for="photo of imagesValues.tableValues"
      :key="photo.id"
      :data="photo"
    />
  </div>
</template>

<script setup lang="ts">
  import PhotoCard from "@/components/uiLanding/press-center/photo-gallery/photo-list/PhotoCard.vue"

  import { watch, reactive, onMounted } from "vue";

  import { AlbomImagesValues } from '@/types/photo-gallery';
  import { getAlbomImagesList } from '@/actions/uiLanding/photo-gallery';

  interface IProps {
    albomID: number,
    loading: boolean
  }

  const props = defineProps<IProps>()
  const imagesValues = reactive<AlbomImagesValues>({
    tableValues: null,
    total: 0,
    isEmpty: false
  })


  const getPhotos = async () => {
    imagesValues.tableValues = null;
    imagesValues.isEmpty = false;

    const {
      data,
      total
    } = (await getAlbomImagesList(props.albomID)).data

    imagesValues.tableValues = data;
    imagesValues.total = total;

    if (!total) {
      imagesValues.isEmpty = true
    }
  }

  watch(
    () => props.albomID,
    () => getPhotos()
  )
  
  onMounted(() => getPhotos())
</script>

<style scoped lang="scss">
.photoItems {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px 20px;

  &-cardSkeleton {
    border-radius: 10px;
    padding-bottom: 72%;
  }
}
</style>