<template>
   <div
    v-if="imagesValues.isEmpty"
    class="photoItems"
  >
    <CreatePhoto
      :albomID="albomID"
      @newPhoto="addNwPhoto"
    />

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
    <CreatePhoto
      :albomID="albomID"
      @newPhoto="addNwPhoto"
    />

    <PhotoCard
      v-for="photo of imagesValues.tableValues"
      :key="photo.id"
      :data="photo"
    />
  </div>
</template>

<script setup lang="ts">
  import CreatePhoto from "@/components/uiMassMedia/gallery/photo/photo-list/CreatePhoto.vue"
  import PhotoCard from "@/components/uiMassMedia/gallery/photo/photo-list/PhotoCard.vue"

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

  const addNwPhoto = (photo) => {
    if (imagesValues.isEmpty) imagesValues.tableValues = [];
    imagesValues.tableValues.push(photo)
  }

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