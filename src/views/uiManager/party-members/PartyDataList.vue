<template>
  <div class="wrapper-main">
    <section class="party">
      <div class="wrapper">
        <div class="party-header">
          <h3 class="party-party-header-title">{{ $t('party.party-members') }}</h3>
          <p class="party-header-count">{{ $t('total') }} {{ partyValues.total ?? '...' }}</p>
        </div>

        <div class="party-filter-header">
          <Input
            v-model="filter.fullName"
            staticPlaceholder
            :placeholder="$t('formdata.search-by-fio')"
          />
          <Button
            :name="$t('button.filter')"
            :class="{ active: filter.show }"
            @class="() => filter.show = !filter.show"
          />
        </div>

        <div class="party-filter-block">
          <Input
            v-model="filter.ticketNum"
            :placeholder="$t('formdata.search-by-ticket-number')"
          />

          <Select
            v-model="filter.locationID"
            :placeholder="$t('formdata.locality')"
            :options="locationsList"
          />

          <Input
            v-model="filter.birthDate"
            :placeholder="$t('formdata.date-of-birth')"
            type="date"
          />

          <Input
            v-model="filter.joinDate"
            :placeholder="$t('formdata.date-of-issue-of-the-ticket')"
            type="date"
          />
          
        </div>

        <table class="party-table" v-if="partyValues.tableValues">
          <thead>
            <tr class="party-head">
              <th>{{ $t('formdata.ticket-desk-number') }}</th>
              <th>{{ $t('formdata.fio') }}</th>
              <th>{{ $t('formdata.date-of-issue') }}</th>
              <th>{{ $t('formdata.area') }}</th>
              <th>{{ $t('formdata.locality') }}</th>
              <th>{{ $t('formdata.a-special-category') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="party-item"
              v-for="party in partyValues.tableValues"
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

      <Pagination :total="partyValues.total" withRouter />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, watch, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import moment from 'moment';
  
  import debounce from '@/helpers/debounce'
  import { PartyMembersValues } from '@/types/party-member';
  import { getPartyMembersList } from '@/actions/uiManager/party-members';
  import { getLocationsList } from '@/actions/uiAdmin/locations';

  const { t } = useI18n()

  const route = useRoute()
  const router = useRouter()

  const filter = reactive({
    show: false,
    fullName: route.query.full_name,
    ticketNum: route.query.ticket_number,
    locationID: route.query.location_id,
    joinDate: route.query.join_date,
    birthDate: route.query.birth_date,
  });
  const locationsList = ref();

  const partyValues = reactive<PartyMembersValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = async () => {
    const response = await getLocationsList()
    if (response) {
      locationsList.value = [];
      response.data.data.forEach(location => {
        locationsList.value.push(
          {
            label: `${location.ticket_prefix}  -  ${location.name}`,
            value: location.id.toString()
          }
        )
      });
    }

    partyValues.tableValues = null;
    partyValues.isEmpty = false
    const {
      data,
      total
    } = await getPartyMembersList(route.params.filter.toString(), {
      ...route.query
    })
    partyValues.tableValues = data;
    partyValues.total = total;
    if (!total) {
      partyValues.isEmpty = true
    }
  }

  onMounted(() => getData());

  watch(() => route.query, debounce(getData), { deep: true })
  watch(
    () => [filter.fullName, filter.ticketNum, filter.locationID, filter.joinDate, filter.birthDate],
    () => router.push({ query: { ...route.query,
      full_name: filter.fullName,
      ticket_number: filter.ticketNum,
      location_id: filter.locationID,
      join_date: filter.joinDate ? moment(filter.joinDate).format('YYYY-MM-DD') : null,
      birth_date: filter.birthDate ? moment(filter.birthDate).format('YYYY-MM-DD') : null
    } })
  )

  const getStatusList = (data) => {
    const list = [];

    if (data.is_pensioner) list.push(t('social-category.pensioner'));
    if (data.is_disabled) list.push(t('social-category.disabled'));
    if (data.is_unemployed) list.push(t('social-category.unemployed'));
    if (data.is_on_childcare_leave) list.push(t('social-category.on-childcare-leave'));
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
    padding-bottom: 40px;

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

    &-filter {
      &-header {
        max-width: 900px;

        display: flex;
        grid-gap: 10px;

        & button {
          height: 60px;
        }
      }

      &-block {
        position: relative;
        z-index: 10;
      }
    }

    &-table {
      width: 100%;
      border-spacing: 0 10px;
      margin-bottom: 40px;

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