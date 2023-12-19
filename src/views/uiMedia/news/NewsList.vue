<template>
  <section class="wrapper-main">
    <div class="news wrapper">
      <Filter :list="filterList" />

      <div class="news-header">
        <div class="news-header-search">
          <Input
            v-model="search"
            staticPlaceholder
            :placeholder="$t('formdata.search-by-name')"
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

        <LangToggle dropdown />
      </div>
      
      <div class="news-items" v-if="newsValues.isEmpty">
        Empty
      </div>
      <div class="news-items disabled" v-else-if="!newsValues.tableValues">
        Loading
      </div>
      <div class="news-items" v-else>
        <NewsItem
          v-for="news of newsValues.tableValues"
          :key="news.title"
          :data="news"
        />
      </div>
    </div>

    <Pagination :total="newsValues.total" withRouter />
  </section>
</template>

<script setup lang="ts">
  import NewsItem from "@/components/uiMedia/news/NewsItem.vue"

  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { onMounted, reactive, watch, ref } from 'vue';

  import debounce from '@/helpers/debounce'

  import { NewsValues } from '@/types/news';
  import { getMediaNewsList } from '@/actions/uiMedia/news';

  const { t } = useI18n()

  const route = useRoute()
  const router = useRouter()
  const search = ref(null);

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
  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: false
  })

  const getData = async () => {
    newsValues.tableValues = null;
    newsValues.isEmpty = false
    const {
      data,
      total
    } = await getMediaNewsList('news', {
      ...route.query
    })
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }

  onMounted(() => getData());

  watch(() => route.query, debounce(getData), { deep: true })
  watch(
    () => search.value,
    () => router.push({ query: { ...route.query, search: search.value } })
  )
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-search {
      width: 100%;
      max-width: 1160px;

      display: grid;
      grid-template-columns: 1fr 60px;
      grid-gap: 20px;
      margin-bottom: 30px;
    }

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