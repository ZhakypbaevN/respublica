<template>
  <div>
    <button
      class="albom withZoomPreview"
      :class="{ active: active, disabled: deleted }"
    >
      <div class="albom-preview withZoomPreview-preview">
        <div
          class="albom-preview-img bg-cover withZoomPreview-preview-img"
          :style="`background-image: url(${getFileUrl(albomData.preview_image)});`"
        ></div>
      </div>

      <div class="albom-info">
        <span class="albom-info-name">{{ albomData.title }}</span>
        <span class="albom-info-date">{{ convertDateTime(albomData.date) }}</span>
        <span class="albom-info-city">{{ albomData.place }}</span>
      </div>


      <!-- Delete Button -->
      <div class="albom-btns">
        <Button
          class="albom-btns-btn albom-btns-btn-delete"
          type="default-light-grey"
          @click.stop
          @click="() => showModal.delete = true"
        >
          <div>
            <SvgIcon
              name="trash-edit-with-bg"
              :viewboxWidth="50"
              :viewboxHeight="50"
            />
          </div>
        </Button>

        <Button
          class="albom-btns-btn albom-btns-btn-edit"
          type="default-light-grey"
          @click.stop
          @click="() => showModal.edit = true"
        >
          <div>
            <SvgIcon
              name="pencil-edit-with-bg"
              :viewboxWidth="50"
              :viewboxHeight="50"
            />
          </div>
        </Button>
      </div>
    </button>
    <DeleteAlbomModal
      @click.stop
      :id="albomData.id"
      :show="showModal.delete"
      @hide="() => showModal.delete = false"
      @finish="() => deleted = true"
    />

    <CreateAlbomModal
      @click.stop
      v-if="showModal.edit"
      v-model:edit="albomData"
      @hide="() => showModal.edit = false"
      @finish="() => {}"
    />
  </div>
</template>

<script setup lang="ts">
  import DeleteAlbomModal from '@/components/uiMassMedia/gallery/photo/sidebar/DeleteAlbomModal.vue';
  import CreateAlbomModal from '@/components/uiMassMedia/gallery/photo/sidebar/CreateAlbomModal.vue';

  import { ref, reactive } from 'vue';
  
  import convertDateTime from '@/helpers/convertDateTime'
  import getFileUrl from '@/helpers/getFileUrlByDate'

  import { IAlbom } from '@/types/photo-gallery';

  interface IProps {
    albom: IAlbom,
    active: boolean
  }
  const props = defineProps<IProps>()

  const albomData = ref(Object.assign({}, props.albom))
  const deleted = ref(false);
  const showModal = reactive({
    edit: false,
    delete: false
  });
</script>

<style scoped lang="scss">
.albom {
  width: 100%;
  
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 14px;

  padding: 16px 20px;
  border-radius: 5px;
  border: 2px solid var(--light-gray-color-op20);

  cursor: pointer;
  transition: 0.3s ease-in-out;

  position: relative;
  overflow: hidden;

  &:hover {
    background-color: var(--accent-color-op10);
    border-color: var(--accent-color-op15);

    & .albom-btns {
      right: 10px;
    }
  }

  &.active {
    border-radius: 10px;
    border-color: var(--accent-color-op50);
    background-color: var(--accent-color-op10);

    & .albom-info-name {
      color: var(--accent-color);
    }
  }

  &-preview {
    border-radius: 80px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;

      transition: .3s ease-in-out;
    }

    &-date {
      font-size: 16px;
      color: var(--light-gray-color);
      font-weight: 500;
      margin-bottom: 3px;
    }

    &-city {
      font-size: 16px;
      font-weight: 400;
      color: var(--gray-color);
    }
  }

  &-btns {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    position: absolute;
    right: -120px;
    top: 10px;
    z-index: 2;

    transition: all .3s ease-in-out;

    
    &-btn {
      height: 40px;
      width: 40px;

      padding: 3px !important;
      margin: 0px !important;
      
      border-radius: 10px;
      background-color: white !important;

      & div {
        background-color: var(--accent-color-op10) !important;
        border-radius: 10px;
        transition: all .3s ease-in-out;
      }
      
      & svg {
        height: 34px;
        width: 34px;
        transition: all .3s ease-in-out;
      }


      &-edit {
        & svg {
          fill: var(--light-gray-color);
        }

        &:hover {
          & div {
            background-color: var(--accent-color-op15) !important;
          }
          
          svg {
            fill: var(--accent-color);
          }
        }
      }

      &-delete {
        svg {
          stroke: var(--light-gray-color);
        }

        &:hover {
          & div {
            background-color: var(--red-color-op10) !important;
          }

          & svg {
            stroke: var(--red-color);
          }
        }
      }
    }
  }
}
</style>