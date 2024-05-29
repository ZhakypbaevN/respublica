<template>
  <div>
    <Modal
      big
      v-if="show"
      @hide="$emit('hide')"
      class="selectUserModal"
      :title="$t('page.users')"
      :maxInner="1400"
    >
      <div class="users">
        <div class="users-header">
          <Input
            v-model="searchFilter.search"
            staticPlaceholder
            :placeholder="$t('formdata.search-by-fio')"
          />

          <Button
            class="users-header-addNewsBtn"
            type="default-blue"
            @click="onShowCreateModal"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </div>

        <table class="users-table" v-if="usersValues.tableValues">
          <thead>
            <tr class="users-head">
              <th>{{ $t('formdata.iin') }}</th>
              <th>{{ $t('formdata.fio') }}</th>
              <th>{{ $t('formdata.role') }}</th>
              <th>{{ $t('formdata.phone') }}</th>
              <th>{{ $t('formdata.email') }}</th>
            </tr>
          </thead>
          <tbody>
            <SelectUserItem
              v-for="user in usersValues.tableValues"
              :key="user.id"
              :data="user"
              class="users-table-item"
              @select="() => onSelectUser(user)"
            />
          </tbody>
        </table>

        <Pagination
          v-model:offset="searchFilter.offset"
          v-model:limit="searchFilter.limit"
          :total="usersValues.total"
        />
      </div>
    </Modal>

    <EditUserModal
      v-if="showModal"
      :data="editData"
      @hide="() => showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import EditUserModal from '@/components/uiAdmin/users/EditUserModal.vue';
  import SelectUserItem from '@/components/uiManager/party-members/create/select-user/SelectUserItem.vue';

  import { onMounted, reactive, watch, ref } from 'vue';

  import debounce from '@/helpers/debounce';
  import { IUser, UsersValues } from '@/types/users';
  import { getUsersList } from '@/actions/uiAdmin/users';

  interface IProps {
    show: boolean,
  }
  interface Emits {
    (event: 'hide'): Function,
    (event: 'update:select', value: any): void
  }

  defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const searchFilter = ref({
    offset: 0,
    limit: 20,
    search: ''
  })

  const showModal = ref(false);
  const editData = ref<IUser>()
  const usersValues = reactive<UsersValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const onShowCreateModal = () => {
    editData.value = null;
    showModal.value = true;
  }

  const onSelectUser = (user) => {
    emit('update:select', user);
    emit('hide')
  }

  const getData = async () => {
    usersValues.tableValues = null;
    usersValues.isEmpty = false
    const {
      data,
      total
    } = await getUsersList(searchFilter.value)
    usersValues.tableValues = data;
    usersValues.total = total;
    if (!total) {
      usersValues.tableValues = [];
      usersValues.isEmpty = true
    }
  }

  onMounted(() => getData())
  watch(() => searchFilter.value, debounce(getData), { deep: true })
</script>

<style scoped lang="scss">
.users {
  padding-bottom: 40px;

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

    table-layout:fixed;

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

    & th:first-child {
      width: 180px;
    }

    & th:nth-child(2) {
      width: 320px;
    }

    & th:nth-child(3) {
      width: 120px;
    }

    & th:nth-child(4) {
      width: 180px;
    }

    & th:nth-child(5) {
      width: 100px;
    }

    &-item:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
  &-head {
    position: relative;
    z-index: 2;

    background-color: white;

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
}
</style>

<style>
.selectUserModal .modal-form {
  background-color: var(--accent-color-op05) !important;
}
</style>
