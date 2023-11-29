<template>
  <div class="wrapper-main">
    <section class="party">
      <div class="wrapper">
        <div class="party-header">
          <h3 class="party-party-header-title">Члены партий</h3>
          <p class="party-header-count">Всего {{ partyDataList ? partyDataList.length : '...' }}</p>
        </div>
        <table class="party-table" v-if="partyDataList">
          <thead>
            <tr class="party-head">
              <th>№ парт билета</th>
              <th>ФИО</th>
              <th>Дата выдачи</th>
              <th>Область</th>
              <th>Населенный пункт</th>
              <th>Особая категория</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr > -->
            <tr
              class="party-item"
              v-for="party in partyDataList"
              :key="party.ticket_number"
            >
              <td>{{ party.ticket_number }}</td>
              <td>
                <RouterLink class="party-item-title" :to="`/manager/party-data/${party.id}`">
                  {{ `${party.user.last_name} ${party.user.first_name} ${party.user.middle_name ?? ''}` }}
                </RouterLink>
              </td>
              <td>
                {{ party.join_date }}
              </td>
              <td>{{ party.location.parent?.name ?? '-' }}</td>
              <td>{{ party.location.name ?? '-'}}</td>
              <td class="status">
                <span>{{ getStatusList(party) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">


import { useI18n } from 'vue-i18n'
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import debounce from '@/helpers/debounce'
import { NewsValues } from '@/types/news';
import { getNewsList } from '@/actions/uiMedia/news';
import { ref } from "vue";

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
  searchEmpty: true
})

const getData = async () => {
  newsValues.tableValues = null;
  newsValues.isEmpty = false
  const {
    data,
    total
  } = await getNewsList('announcements', {
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

const getStatusList = (data) => {
  const list = [];

  if (data.is_pensioner) list.push('Пенсионер');
  if (data.is_disabled) list.push('Инвалид');
  if (data.is_unemployed) list.push('Безработный');
  if (data.is_on_childcare_leave) list.push('Находящиеся в отпуске по уходу за детьми');
  if (!list.length) return '-'
  return list.join(', ');
}
</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
    padding-top: 40px;
  }

  .party {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 26px;

      &-title {
        font-size: 18px;
        font-weight: 700;
      }

      &-count {
        color: var(--light-gray-color);
      }
    }
    &-table {
      width: 100%;
      border-spacing: 0 10px;

      & tbody {
        transform: translateY(-15px);
      }

      & th {
        color: var(--light-gray-color);
        font-size: 16px;
        font-weight: 400;
        text-align: left;

        padding: 14px 20px 15px;
      }

      & td {
        padding: 20px;      
      }

      & .party-item:first-child td {
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
      }
    }
    &-head,
    &-item {
      background: #FFF;
    }

    &-head {
      position: relative;
      z-index: 2;

      & th {
        border-bottom: .5px solid var(--light-gray-color-op50);
      }

      & th:first-child {
        border-top-left-radius: 10px;
      }

      & th:last-child {
        border-top-right-radius: 10px;
      }
    }

    &-item {
      & td,
      &-title {
        font-size: 18px;
        font-weight: 500;
      }

      & td.status span {
        display: block;
        width: 220px;

        min-height: 1pc;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      
      & td:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      & td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      &-title {
        transition: color .3s ease-in-out;

        &:hover,
        &:focus {
          color: var(--accent-color);
        }
      }
    }
  }
</style>