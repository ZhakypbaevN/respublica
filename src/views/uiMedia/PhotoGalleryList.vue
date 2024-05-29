<template>
  <section class="wrapper-main">
    <div class="photo wrapper">
      <div class="landing-header">
        <h2 class="landing-title">{{ $t('page.photo-gallery') }}</h2>
        <Button
          class="photo-addBtn"
          type="outline-blue"
          :name="$t('button.add-albom')"
          @click="() => showModal = true"
          @finish=""
        >
          <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </div>

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
        <PhotoSideBar
          v-model="selectAlbomID"
          :albomlist="albomValues.tableValues"
          :loading="!albomValues.tableValues"
        />

        <PhotoCardList
          :albomID="selectAlbomID"
          :loading="!albomValues.tableValues"
        />
      </div>
    </div>

    <CreateAlbomModal
      v-if="showModal"
      @hide="() => showModal = false"
      @finish="onCreatedAlbom"
    />
  </section>
</template>

<script setup lang="ts">
  import PhotoCardList from "@/components/uiMassMedia/gallery/photo/photo-list/PhotoCardList.vue"
  import PhotoSideBar from "@/components/uiMassMedia/gallery/photo/sidebar/PhotoSidebar.vue"
  import CreateAlbomModal from "@/components/uiMassMedia/gallery/photo/sidebar/CreateAlbomModal.vue"

  import { ref, reactive, onMounted } from "vue";
  
  import { AlbomValues, IAlbom } from '@/types/photo-gallery';
  import { getAlbomList } from '@/actions/uiLanding/photo-gallery';

  const showModal = ref(false)

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
      albomValues.isEmpty = true;
      albomValues.tableValues = [];
    } else selectAlbomID.value = albomValues.tableValues[0].id;
  }

  const onCreatedAlbom = (albom) =>
    albomValues.tableValues.push(albom);
</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
    padding: 40px 0;
  }

  .photo {
    &-inner {
      min-height: 700px;

      display: grid;
      grid-template-columns: 420px 1fr;
      align-items: flex-start;
      grid-gap: 40px;

      padding: 25px;
      background-color: white;
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