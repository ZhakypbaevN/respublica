<template>
  <section class="photoGallery">
    <div class="photo">
      <div v-if="albomValues.isEmpty">
        Empty
      </div>
      <div class="news-items disabled" v-else-if="!albomValues.tableValues">
        Loading
      </div>
      <div
        v-else
        class="photo-inner"
      >
        <PhotoCardList
          :albomID="selectAlbomID"
          :loading="!albomValues.tableValues"
        />

        <PhotoSideBar
          v-model="selectAlbomID"
          :albomlist="albomValues.tableValues"
          :loading="!albomValues.tableValues"
        />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
  import PhotoCardList from "@/components/uiLanding/press-center/photo-gallery/photo-list/PhotoCardList.vue"
  import PhotoSideBar from "@/components/uiLanding/press-center/photo-gallery/sidebar/PhotoSidebar.vue"

  import { ref, reactive, onMounted } from "vue";
  
  import { AlbomValues } from '@/types/photo-gallery';
  import { getAlbomList } from '@/actions/uiLanding/photo-gallery';

  const selectAlbomID = ref(1)
  const albomValues = reactive<AlbomValues>({
    tableValues: null,
    total: 0,
    isEmpty: false
  })

  onMounted(() => getData());

  const getData = async () => {
    albomValues.tableValues = null;
    albomValues.isEmpty = false
    const {
      data,
      total
    } = (await getAlbomList()).data

    albomValues.tableValues = data;
    albomValues.total = total;

    if (!total) albomValues.isEmpty = true;
    else selectAlbomID.value = albomValues.tableValues[0].id;
  }
</script>

<style scoped lang="scss">
  .photo {
    &-inner {
      min-height: 700px;

      display: grid;
      grid-template-columns: 1fr 520px;
      align-items: flex-start;
      grid-gap: 40px;

      padding: 25px;
      border-radius: 10px;
    }

    &-addBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 10px;

      padding: 8px 14px !important;
      padding-left: 26px !important;


      & svg {
        height: 40px;
        width: 40px;

        fill: var(--accent-color);
      }
    }
  }
</style>