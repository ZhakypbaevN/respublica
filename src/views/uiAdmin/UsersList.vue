<template>
  <div class="wrapper-main">
    <section class="users">
      <div class="wrapper">
        <h2 class="landing-title">{{ $t('page.users') }}</h2>

        <div class="users-header">
          <Input
            v-model="search"
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <UserItem
              v-for="user in usersValues.tableValues"
              :key="user.id"
              :data="user"
              class="users-table-item"
              @showEditModal="() => onShowEditModal(user)"
            />
          </tbody>
        </table>
      </div>

      <Pagination :total="usersValues.total" withRouter />
    </section>

    <EditUserModal
      v-if="showModal"
      :data="editData"
      @hide="() => showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import EditUserModal from '@/components/uiAdmin/users/EditUserModal.vue';
  import UserItem from '@/components/uiAdmin/users/UserItem.vue';
  
  import { onMounted, reactive, watch, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  import debounce from '@/helpers/debounce';
  import { IUser, UsersValues } from '@/types/users';
  import { getUsersList } from '@/actions/uiAdmin/users';

  const route = useRoute()
  const router = useRouter()

  const search = ref(route.query.search)

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

  const onShowEditModal = (data: IUser) => {
    editData.value = data;
    showModal.value = true;
  }

  const getData = async () => {
    usersValues.tableValues = null;
    usersValues.isEmpty = false
    const {
      data,
      total
    } = await getUsersList({
      ...route.query, search: search.value
    })
    usersValues.tableValues = data;
    usersValues.total = total;
    if (!total) {
      usersValues.isEmpty = true
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
    padding-top: 40px;
  }

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

      &-item:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
    }
    &-head {
      background-color: white;
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
  }
</style>