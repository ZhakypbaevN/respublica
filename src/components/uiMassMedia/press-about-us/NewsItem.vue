<template>
  <button
    class="newsItem withZoomPreview"
    :class="{disabled: disabled}"
    @click="goEdit"
    v-if="newsData"
  >
    <div class="newsItem-main">

      <!-- Preview -->
      <div class="newsItem-preview withZoomPreview-preview">
        <div
          class="newsItem-preview-img bg-cover withZoomPreview-preview-img"
          :style="`background-image:url('https://api.respublica-partiyasy.kz/${data.preview_image}');`"
        ></div>
      </div>

      <!-- Content -->
      <div class="newsItem-content">
        <h4 class="newsItem-content-date">
          {{ convertDateTime(data.created_at) }}
        </h4>

        <h3 class="newsItem-content-title">
          {{ data.title }}
        </h3>

        <p class="newsItem-content-description">
          {{ data.preview_text }}
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
        @click.stop="() => showDeleteModal = true"
      >
        <SvgIcon
          name="trash-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>

      <PublishToggle
        :data="newsData"
        @finish="togglePublish"
      />
    </div>

    <DeleteModal
      @click.stop
      :show="showDeleteModal"
      :id="data.id"
      @hide="() => showDeleteModal = false"
    />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import PublishToggle from '@/components/uiMassMedia/common-for-edit/PublishToggle.vue'
import DeleteModal from '@/components/uiMassMedia/news/DeleteModal.vue'

import convertDateTime from '@/helpers/convertDateTime.js'

const router = useRouter()

interface IProps {
  data: any,
}

const props = defineProps<IProps>()

const newsData = ref(null);
const disabled = ref(false);
const showDeleteModal = ref(false);

onMounted(() => {
  newsData.value = Object.assign({}, props.data);
})

const goEdit = () => {
  router.push(`/media/press-about-us/${props.data.id}`)
}

const togglePublish = () => {
  newsData.value.published = !newsData.value.published;
  disabled.value = true;
}
</script>

<style scoped lang="scss">
.newsItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 50px;

  text-align: left;

  padding: 18px;
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

      cursor: pointer;
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

      &:hover svg {
        fill: var(--accent-color);
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
  }
}
</style>