<template>
  <section class="wrapper-main">
    <div class="news wrapper">
      <Filter
        v-model="filter.published"
        :list="filterList"
      />

      <div class="news-header">
        <Input
          v-model="filter.search"
          staticPlaceholder
          placeholder="Поиск по проекту"
        />

        <RouterLink to="/media/news-list/create">
          <Button
            class="news-header-addNewsBtn"
            type="default-blue"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </RouterLink>
      </div>
      
      <div class="news-items">
        <NewsItem
          v-for="data of newsList"
          :key="data"
          :data="data"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsItem from "../../../components/uiMedia/news/newsItem.vue"

import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

import { useToast } from '../../../modules/toast'
import { useI18n } from 'vue-i18n'
import { watch } from "vue";

const { t } = useI18n()
const { toast } = useToast()

const token = localStorage.getItem('TOKEN');
const isLoading = ref(false)
const newsList = ref([]);

const filter = reactive({
  search: null,
  published: true
})
const filterList = [
  {
    name: t('filter-published'),
    value: true
  },
  {
    name: t('filter-unpublished'),
    value: false
  }
]

onMounted(() => getPhotos());

watch(
  () => [filter.published, filter.search],
  () => getPhotos()
)

const getPhotos = () => {
  newsList.value = [];
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=100&category_id=1&search=${filter.search}&published=${filter.published}`;

  axios({
    method: "get",
    url: url,
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'ru-RU',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      console.log('response', response);

      newsList.value = response.data;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log('err', err);

      toast({
        message: 'Возникли ошибки при запросе'
      })
      isLoading.value = false;
    });
}

</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-header {
    max-width: 1160px;

    display: grid;grid-template-columns: 1fr 60px;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-addNewsBtn {
      width: 60px;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px !important;

      & svg {
        height: 40px;
        width: 40px;

        fill: white;
      }
    }
  }
  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
}
</style>