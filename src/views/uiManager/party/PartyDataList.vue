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
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const partyDataList = ref([]);
const token = localStorage.getItem('TOKEN');

const getStatusList = (data) => {
  const list = [];

  if (data.is_pensioner) list.push('Пенсионер');
  if (data.is_disabled) list.push('Инвалид');
  if (data.is_unemployed) list.push('Безработный');
  if (data.is_on_childcare_leave) list.push('Находящиеся в отпуске по уходу за детьми');
  if (!list.length) return '-'
  return list.join(', ');
}

onMounted(() => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/parties/memberships?offset=0&limit=100&status=${route.params.filter}`

  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: {
      status: 'json'
    }
  })
    .then((response) => {
      partyDataList.value = [];

      response.data.forEach(party => {
        partyDataList.value.push(party);
      });
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });

})
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