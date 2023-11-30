<template>
  <section class="wrapper-main">
    <div class="photo wrapper">
      <div class="landing-header">
        <h2 class="landing-title">Фотогалерея</h2>
        <Button
          class="photo-addBtn"
          type="outline-blue"
          name="Добавить альбом"
          @click="() => showModal = true"
        >
          <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </div>

      <div class="photo-inner">
        <PhotoSideBar
          v-model="selectAlbomID"
          :albomlist="albomlist"
          :loading="isLoading.sidebar"
        />

        <PhotoCardList
          :list="photoList"
          :albomID="selectAlbomID"
          :loading="isLoading.list"
        />
      </div>
    </div>

    <CreateAlbomModal
      :show="showModal"
      @hide="() => showModal = false"
    />
  </section>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref, reactive, onMounted, watch } from "vue";
  import { useToast } from '@/modules/toast'

  import PhotoCardList from "@/components/uiMedia/gallery/photo/photo-list/PhotoCardList.vue"
  import PhotoSideBar from "@/components/uiMedia/gallery/photo/sidebar/PhotoSidebar.vue"
  import CreateAlbomModal from "@/components/uiMedia/gallery/photo/sidebar/CreateAlbomModal.vue"

  const { toast } = useToast()

  const showModal = ref(false)
  const isLoading = reactive({
    sidebar: true,
    list: true
  })
  const token = localStorage.getItem('TOKEN');

  const selectAlbomID = ref(1)
  const albomlist = ref();
  const photoList = ref()

  onMounted(() => getAlboms());

  watch(
    () => selectAlbomID.value,
    () => getPhotos()
  )

  const getAlboms = () => {
    const url = `https://api.respublica-partiyasy.kz/api/v1/galleries/albums?offset=0&limit=100`;

    axios({
      method: "get",
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log('response', response);
        
        albomlist.value = response.data.filter((albom, idx) => {
          albom.id = idx + 1;
          return albom
        });
        isLoading.sidebar = false;
        selectAlbomID.value = albomlist.value[0].id;

        if (albomlist.value.length) getPhotos()
      })
      .catch((err) => {
        console.log('err', err);

        if (err.response.data.detail === 'Pending resignation request already exists.') {
          toast({
            message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
          })
        } else {
          toast({
            message: 'Возникли ошибки при запросе'
          })
        }
      });
  }

  const getPhotos = () => {
    isLoading.list = true;
    const url = `https://api.respublica-partiyasy.kz/api/v1/galleries/albums/${selectAlbomID.value}/images?offset=0&limit=100`;

    axios({
      method: "get",
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log('response', response);

        photoList.value = response.data;
        isLoading.list = false;
      })
      .catch((err) => {
        console.log('err', err);

        if (err.response.data.detail === 'Pending resignation request already exists.') {
          toast({
            message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
          })
        } else {
          toast({
            message: 'Возникли ошибки при запросе'
          })
        }
      });
  }
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