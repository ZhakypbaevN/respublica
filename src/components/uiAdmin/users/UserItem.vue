<template>
  <tr class="usersItem">
    <td>{{ data.iin ?? '-' }}</td>
    <td class="name">
      {{ `${data.last_name} ${data.first_name} ${data.middle_name ?? ''}` }}
    </td>
    <td class="status">
      <span>{{ getStatus(data.role) }}</span>
    </td>
    <td>
      {{ data.phone ? formatPhoneNumber(data.phone) : '-' }}
    </td>
    <td>{{ data.email ?? '-' }}</td>
    <td>
      <Button
        class="usersItem-editBtn"
        type="default-light-grey"
        @click="() => showModal = true"
      >
        <SvgIcon
          name="pencil-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>
    </td>

    <EditUserModal
      :data="data"
      v-if="showModal"
      @hide="() => showModal = false"
    />
  </tr>
</template>

<script setup lang="ts">
  import EditUserModal from '@/components/uiAdmin/users/EditUserModal.vue';

  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { IUser } from '@/types/users';
  import formatPhoneNumber from '@/helpers/formatPhoneNumber.js'

  interface IProps {
    data: IUser
  }

  const { t } = useI18n()
  
  const props = defineProps<IProps>()
  const userData = ref<IUser>(null);
  const showModal = ref(false)

  onMounted(() => {
    userData.value = Object.assign({}, props.data);
  })

  const getStatus = (status) => {
    if (status == 'admin') return t('status.admin');
    if (status == 'manager') return t('status.manager');
    if (status == 'editor') return t('status.media');
    return t('status.client')
  }
</script>

<style scoped lang="scss">
.usersItem {
  & td {
    font-size: 18px;
    font-weight: 500;

    padding: 20px;

    border-radius: 10px;
    background-color: white;

    &.name {
      font-weight: 600;
      font-size: 20px;
    }

    &.status span {
      display: block;
      width: 220px;
  
      min-height: 1pc;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  &-editBtn {
    height: 50px;
    width: 50px;

    cursor: pointer;
    padding: 0px !important;
    
    & svg {
      height: 50px;
      width: 50px;

      fill: var(--light-gray-color);
      transition: all .3s ease-in-out;
    }

    &:hover svg {
      fill: var(--accent-color);
    }
  }
}
</style>