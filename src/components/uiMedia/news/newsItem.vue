<template>
  <button
    class="newsItem withZoomPreview"
    @click="goEdit"
  >
    <div class="newsItem-main">

      <!-- Preview -->
      <div class="newsItem-preview withZoomPreview-preview">
        <div
          class="newsItem-preview-img bg-cover withZoomPreview-preview-img"
          :style="`background-image:url('https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg');`"
        ></div>
      </div>

      <!-- Content -->
      <div class="newsItem-content">
        <h4 class="newsItem-content-date">
          Создано:  12:30, 5 июля 2023
        </h4>

        <h3 class="newsItem-content-title">
          Полный запрет вейпов будет введен в Казахстане
        </h3>

        <p class="newsItem-content-description">
          Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.
        </p>
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
import { useRouter } from 'vue-router';

const router = useRouter()

const goEdit = () => {
  router.push('/media/news-edit/1')
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

      margin-bottom: 20px;
    }

    &-title {
      font-size: 18px;
      font-weight: 700;

      margin-bottom: 15px;

      transition: all .3s ease-in-out;
    }

    &-description {
      color: var(--grey-color);
      font-size: 18px;
      font-weight: 400;
      
      margin-bottom: 0px;
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