<template>
  <div class="wrapper-main">
    <section class="party">
      <div class="wrapper">
        <div class="party-header">
          <h3 class="party-party-header-title">{{ $t('party.party-members') }}</h3>
          <p class="party-header-count">{{ $t('total') }} {{ partyValues.total ?? '...' }}</p>
        </div>

        <div class="party-filter">
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

          <div class="party-filter-excelExport">
            <Button
              name="Экспортировать"
              :loading="isLoadingExport"
              @click="() => onExport()"
              type="outline-red"
            />
          </div>
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

  import axios from 'axios';
  import * as XLSX from 'xlsx';

  import debounce from '@/helpers/debounce'
  import { PartyMembersValues } from '@/types/party-member';
  import { getPartyMembersList, getPartyMembersExport } from '@/actions/uiManager/party-members';
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

  const isLoadingExport = ref(false);

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
    } = await getPartyMembersList(route.params.filter?.toString(), {
      ...route.query
    })
    partyValues.tableValues = data;
    partyValues.total = total;
    if (!total) {
      partyValues.tableValues = [];
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

    if (data.is_pensioner) list.push(t('social-category.user-status-pensioner'));
    if (data.is_disabled) list.push(t('social-category.user-status-disabled'));
    if (data.is_unemployed) list.push(t('social-category.user-status-unemployed'));
    if (data.is_on_childcare_leave) list.push(t('social-category.user-status-on-childcare-leave'));
    if (!list.length) return '-'
    return list.join(', ');
  }


  const downloadExcel = (data) => {

  // Convert data to worksheet
  var ws = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tickets");

  // Write the workbook to a binary string
  var binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Convert the binary string to a Blob
  var blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });

  // Create a download link
  const link = document.createElement('a');

  // Set the link's href to the Blob URL
  link.href = URL.createObjectURL(blob);

  // Set the download attribute to the desired file name
  link.download = 'tickets.xlsx';

  // Append the link to the document
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

// Utility function to convert a string to an ArrayBuffer
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}




  const onExport = async () => {
    const token = localStorage.getItem('access_token');
    isLoadingExport.value = true;
    let excelData;
    console.log(route);
    try {
      console.log('filter.locationID', filter.locationID);
      const questy = {
        status: route.params.filter?.toString(),
        join_date: filter.joinDate,
        birth_date: filter.birthDate,
        location_id: filter.locationID,
        full_name: filter.fullName,
        ticket_number: filter.ticketNum,
      };

      // Filtering out properties with null values
      const filterQuery = Object.keys(questy).reduce((acc, key) => {
          if (questy[key] !== null && questy[key] !== '') {
              acc[key] = questy[key];
          }
          return acc;
      }, {});


      console.log(filterQuery);

      const queryParams = new URLSearchParams(filterQuery);
      
      const response = await axios.get(`https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/export?${queryParams}`, {
        responseType: 'arraybuffer',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });

      // Преобразование данных в формат XLSX
      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: 'array' });

      // Обработка данных из файла XLSX (например, вывод в консоль)
      workbook.SheetNames.forEach((sheetName) => {
          const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          const json_object = JSON.stringify(XL_row_object);
          downloadExcel(JSON.parse(json_object));
      });

      isLoadingExport.value = false;
      // Можно также сохранить файл, если это необходимо
      // XLSX.writeFile(workbook, 'Название_файла.xlsx');
    } catch (error) {
      console.error('Ошибка при загрузке XLSX:', error);

      isLoadingExport.value = false;
    }
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
      margin-bottom: 40px;

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

      &-excelExport {
        display: flex;
        justify-content: end;
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