<template>
  <section class="wrapper-main">
    <div class="news wrapper">
      <Filter
        v-model="filter.published"
        :list="filterList"
      />

      <div class="news-header">
        <Input
          v-model="onSearch"
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

    <Pagination :total="123" withRouter />
  </section>
</template>

<script setup lang="ts">
import NewsItem from "../../../components/uiMedia/news/newsItem.vue"

import axios from 'axios';

import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { INews } from '../../../types/news'
import { useI18n } from 'vue-i18n'
import { useToast } from '../../../modules/toast'
import debounce from '../../../helpers/debounce'
import { computed } from "vue";


export interface NewsValues {
  tableValues: INews[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}

const { t } = useI18n()
const { toast } = useToast()
const route = useRoute()
const router = useRouter()

const token = localStorage.getItem('TOKEN');
const isLoading = ref(false)
const newsList = ref([]);

const filterList = [
  {
    name: t('status.list-published'),
    value: true
  },
  {
    name: t('status.list-unpublished'),
    value: false
  }
]

const values = reactive<NewsValues>({
  tableValues: [],
  total: 0,
  isEmpty: false,
  searchEmpty: false
})

const filtered = computed(() => Object.keys(route.query).length)

const onSearch = debounce((event) => {
  router.push({ query: { name: event.target.value } })
})

const getData = async () => {
  values.isEmpty = false
  values.searchEmpty = false
  const {
    data,
    meta: { total }
  } = await getApplications({
    ...route.query
  })
  values.tableValues = data
  values.total = total
  if (!total && !filtered.value) values.isEmpty = true
  if (!total) values.searchEmpty = true
}

onMounted(getData)

watch(() => route.query, debounce(getData), { deep: true })

const getNews = () => {
  newsList.value = [];
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=20&category_id=1&search=${filter.search}&published=${filter.published}`;

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

    margin-bottom: 50px;
  }
}
</style>