<template>
  <button
    class="newsItem withZoomPreview"
    @click="goEdit"
  >
    <div class="newsItem-main">

      <!-- Preview -->
      <div class="newsItem-preview withZoomPreview-preview">
        <YoutubeVideo :src="vidoe"></YoutubeVideo>
      </div>

      <!-- Content -->
      <div class="newsItem-content">
        <h4 class="newsItem-content-date">
          Создано:  12:30, 5 июля 2023
        </h4>

        <h3 class="newsItem-content-title">
          Полный запрет вейпов будет введен в Казахстане
        </h3>
      </div>
    </div>

    <!-- Buttons -->
    <div class="newsItem-btns">
      <Button
        class="newsItem-btns-edit"
        type="default-light-grey"
      >
        <SvgIcon
          name="pencil-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>

      <Button
        class="newsItem-btns-delete"
        type="default-light-grey"
      >
        <SvgIcon
          name="trash-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>

      <Button
        name="Опубликовать"
        type="default-light-blue"
        class="newsItem-btns-changeState"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import YoutubeVideo from '../uiLanding/news/youtubeVideo.vue';

import { useRouter } from 'vue-router';

interface IProps {
  vidoe: any,
}

defineProps<IProps>()

const router = useRouter()

const goEdit = () => {
  router.push('/media/video-gallery/1')
}
</script>

<style scoped lang="scss">
.newsItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 50px;

  text-align: left;

  padding: 25px;
  padding-right: 30px;

  border-radius: 10px;
  border: 1px solid transparent;
  background-color: white;

  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-op05);

    & .newsItem-content-title {
      color: var(--accent-color);
    }
  }

  &-main {
    display: grid;
    align-items: center;
    grid-template-columns: 190px 1fr;
    grid-gap: 25px;
  }

  &-preview {
    border-radius: 10px;

    &-img {
      padding-bottom: 72%;
    }
  }

  &-content {
    &-date {
      color: var(--accent-color);
      font-size: 16px;
      font-weight: 500;

      margin-bottom: 10px;
    }

    &-title {
      font-size: 18px;
      font-weight: 700;

      transition: all .3s ease-in-out;
    }
  }

  &-btns {
    display: flex;
    grid-gap: 20px;

    &-edit,
    &-delete {
      height: 50px;
      width: 50px;
      padding: 0px !important;
      
      & svg {
        height: 50px;
        width: 50px;

        transition: all .3s ease-in-out;
      }
    }

    &-edit {
      & svg {
        fill: var(--light-gray-color);
      }
    }

    &-delete {
      svg {
        stroke: var(--light-gray-color);
      }

      &:hover {
        background-color: var(--red-color-op10) !important;

        & svg {
          stroke: var(--red-color);
        }
      }
    }

    &-changeState {
      height: 50px;
      padding: 15px 40px;
    }
  }
}
</style>