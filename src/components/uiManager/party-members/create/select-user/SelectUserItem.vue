<template>
  <tr class="usersItem" @click="() => $emit('select')">
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
  </tr>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { IUser } from '@/types/users';
  import formatPhoneNumber from '@/helpers/formatPhoneNumber.js'

  interface IProps {
    data: IUser
  }
  interface Emits {
    (event: 'select'): Function
  }
  
  const { t } = useI18n();
  
  const props = defineProps<IProps>();
  const emit = defineEmits<Emits>();

  const userData = ref<IUser>(null);

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
  &:hover td {
    cursor: pointer;
    background-color: var(--accent-color-op10);
    &.name {
      color: var(--accent-color) !important;
    }
  }
  & td {
    font-size: 18px;
    font-weight: 500;

    padding: 20px;

    background-color: white;
    transition: all .3s ease-in-out;

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

    &.btn {
      position: relative;
    }
  }

  & td:nth-child(3) {
    width: 140px;
  }

  & td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
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