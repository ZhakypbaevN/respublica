<template>
  <section class="photoGallery">
    <div class="photo">
      <div v-if="albomValues.isEmpty">
        <Empty />
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

    if (!total) {
      albomValues.tableValues = [];
      albomValues.isEmpty = true;
    } else selectAlbomID.value = albomValues.tableValues[0].id;
  }
</script>

<style scoped lang="scss">
  .photo {
    &-inner {
      display: grid;
      grid-template-columns: 1fr 520px;
      grid-gap: 40px;
    }

    // Adaptation
    @media (max-width: 1900px) {
      &-inner {
        grid-template-columns: 1fr 400px;
        grid-gap: 40px;
      }
    }

    @media (max-width: 1400px) {
      &-inner {
        grid-template-columns: 1fr 400px;
        grid-gap: 30px;
      }
    }

    @media (max-width: 1200px) {
      &-inner {
        grid-template-columns: 1fr 320px;
        grid-gap: 20px;
      }
    }

    @media (max-width: 992px) {
      &-inner {
        display: flex;
        flex-direction: column-reverse;
        grid-gap: 30px;
      }
    }

    @media (max-width: 768px) {
    }

    @media (max-width: 576px) {
    }

    @media (max-width: 380px) {
    }
  }
</style>