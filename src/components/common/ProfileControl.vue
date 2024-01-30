<template>
  <div class="avatarBlock">
    <RouterLink class="avatarBlock-preview" :to="link">
      <Avatar :mini="mini" />
    </RouterLink>


    <div class="avatarBlock-dropDown">
      <Button
        class="avatarBlock-btn"
        :name="$t('button.log-out-of-your-account')"
        type="outline-red"
        v-slot:left
        @click="logout"
      >
        <SvgIcon
          name="logout"
          :viewboxWidth="24"
          :viewboxHeight="24"
        />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Avatar from '@/components/common/Avatar.vue';

  import { ref, onMounted } from 'vue';

  import { getUser } from '@/modules/auth';
  import { useAuth } from'@/modules/auth'

  import { IUser } from '@/types/users';

  interface IProps {
    mini?: boolean
  }

  withDefaults(defineProps<IProps>(), {
    mini: false
  })

  const { logout } = useAuth()
  const link = ref('')
  const userData = ref<IUser>();

  onMounted(async () => {
    userData.value = await getUser();
    
    if (userData.value.role === 'admin') link.value = '/admin'
    else if (userData.value.role === 'manager') link.value = '/manager'
    else if (userData.value.role === 'editor') link.value = '/media'
    else link.value = '/client'
  })
</script>

<style scoped lang="scss">
  .avatarBlock {
    position: relative;

    &:hover .avatarBlock-dropDown {
      top: 120%;
      opacity: 1;
      visibility: visible;
    }

    &-dropDown {
      display: flex;
      flex-direction: column;
      grid-gap: 10px;

      position: absolute;
      top: 140%;
      right: 0;
      z-index: 2;

      opacity: 0;
      visibility: hidden;
      padding: 10px;
      
      background-color: white;
      box-shadow: 0 3px 3px -2px rgb(0 0 0 / 18%),
      0 3px 4px 0 rgb(0 0 0 / 10%),
      0 1px 8px 0 rgb(0 0 0 / 10%);
      border-radius: 10px;

      transition: all .3s ease-in-out;
    }

    &-link button {
      width: 100%;
      text-align: left;
    }

    &-link:last-of-type {
      margin-bottom: 12px;
    }

    &-btn {
      width: 100%;

      display: flex;
      align-items: center;
      grid-gap: 10px;

      padding: 12px;
      
      & svg {
        width: 32px;
        height: 32px;

        fill: var(--red-color);
      }
    }
  }
</style>