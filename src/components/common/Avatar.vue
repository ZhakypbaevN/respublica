<template>
  <div class="avatarBlock">
    <RouterLink
      class="avatarBlock-preview"
      :to="`/${userType}`"
    >
      <SvgIcon
        name="avatar"
        :viewboxWidth="44"
        :viewboxHeight="44"
      />
    </RouterLink>

    <div class="avatarBlock-dropDown">
      <Button
        class="avatarBlock-btn"
        name="Выйти аккаунта"
        type="outline-red"
        v-slot:left
        @click="exit"
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
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';

const userType = localStorage.getItem('USER_TYPE');

const { toast } = useToast()
const router = useRouter()



console.log('router', router);

const exit = () => {
  localStorage.removeItem('USER_TYPE');
  localStorage.removeItem('TOKEN');

  toast({
    message: 'Вы успешно вышли из аккаунта!',
    type: 'success'
  })
  
  if (router.currentRoute.value.name === 'Home') {
    location.reload();
  } else {
    router.push(`/`);
  }
}
</script>

<style scoped lang="scss">
.avatarBlock {
  position: relative;

  &:hover .avatarBlock-dropDown {
    top: 120%;
    opacity: 1;
    visibility: visible;
  }

  &-preview {
    height: 65px;
    width: 65px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    /* border: 2px solid var(--primary-color); */
    background-color: var(--accent-color-op15);

    & svg {
      width: 40px;
      height: 40px;

      stroke: var(--accent-color);
    }
  }

  &-dropDown {
    width: 260px;

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