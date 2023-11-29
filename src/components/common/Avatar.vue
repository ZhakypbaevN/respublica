<template>
  <div class="avatarBlock">
    <button class="avatarBlock-preview">
      <SvgIcon
        name="avatar"
        :viewboxWidth="44"
        :viewboxHeight="44"
      />
    </button>


    <div class="avatarBlock-dropDown">
      <RouterLink
        v-for="linkData of links"
        :key="linkData.title"
        class="avatarBlock-link"
        :to="linkData.link"
      >
        <Button
          :name="linkData.title"
          type="outline-blue"
        />
      </RouterLink>

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

const { toast } = useToast()
const router = useRouter()

const links = [
  {
    title: 'Личные данные',
    link: '/client'
  },
  {
    title: 'Менеджер',
    link: '/manager/party-list/active?offset=0&limit=20&published=true&search='
  },
  {
    title: 'Пресс-центр',
    link: '/media/news-list?offset=0&limit=20&published=true&search='
  },
  {
    title: 'Для просмотра обращении',
    link: '/business'
  }
]

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

  // Adaptation
  @media (max-width: 1200px) {
    &-preview {
      height: 45px;
      width: 45px;
    }
  }

  @media (max-width: 992px) {
    &-preview {
      height: 42px;
      width: 42px;
    }
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}
</style>