<template>
  <div
    v-if="loading"
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
      v-for="photo of photoList"
      :key="photo"
      :data="photo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CreatePhoto from "./createPhoto.vue"
import PhotoCard from "./photoCard.vue"

interface IProps {
  list: any,
  albomID: number,
  loading: boolean
}

const props = defineProps<IProps>()
const photoList = ref(props.list);

watch(
  () => props.list,
  () => photoList.value = props.list
)

const addNwPhoto = (photo) => {
  photoList.value.unshift(photo)
}
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