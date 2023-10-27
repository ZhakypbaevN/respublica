<template>
  <div>
    <div
      @dragover="onDragOver"
      @dragleave="drag = false"
      @drop="onDrop"
      @click="input.click()"
      :class="{ dragging: drag }"
    >
      <img
        v-if="!img"
        :src="image"
        alt=""
        :class="{ default: image === defaultPreview }"
        :crossorigin="image === defaultPreview ? 'anonymous' : null"
      />
      <img
        v-else
        :src="img"
        alt=""
        :class="{ default: image === defaultPreview }"
      />
      <input
        type="file"
        ref="input"
        style="display: none"
        :accept="'image/png, image/gif, image/jpeg, image/svg'"
        @change="onUpload"
      />
      <SvgIcon
        v-if="!modelValue"
        class="plus"
        name="plus"
        :viewboxHeight="24"
        :viewboxWidth="24"
        :fill="!drag ? 'var(--accent-color)' : '#fff'"
      />
    </div>
    <ImageCrop
      v-model:url="img"
      :show="isShowModal"
      :file="fileUrl"
      :aspectRatio="aspectRatio"
      @newFile="newCrop"
      @hide="() => isShowModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue-demi'
  import ImageCrop from '../../components/common/ImageCrop.vue'
  import getFileUrl from '../../helpers/getFileUrlByDate'

  interface IProps {
    modelValue?: File,
    preview: string,
    aspectRatio: number
  }
  interface Emits {
    (event: 'update:modelValue', value: any): void,
    (event: 'update:preview', value: any): void,
  }

  const emit = defineEmits<Emits>()

  const props = withDefaults(defineProps<IProps>(), {
    aspectRatio: 16 / 9
  })

  const defaultPreview = '/img/icons/default_product_avatar.svg';

  const drag = ref(false)
  const input = ref(null)
  const fileUrl = ref();
  const isShowModal = ref(false);
  
  const image = computed({
    get: () => getFileUrl(props.preview),
    set: (val) => emit('update:preview', val)
  })
  const img = ref(null)
  const onDragOver = (event) => {
    event.stopPropagation()
    event.preventDefault()
    drag.value = true
  }

  const onDrop = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const fileList = event.dataTransfer.files
    if (fileList.length) upload(fileList)
    drag.value = false
  }

  const onUpload = (e) => {
    const { files } = e.target as HTMLInputElement
    if (!files || !files.length) return

    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileUrl.value = String(reader.result)

      isShowModal.value = true
    }
    isShowModal.value = true;
  }

  const newCrop = file => {
    emit('update:modelValue', file)
  }
</script>

<style scoped lang="scss">
div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  border: 1px solid var(--accent-color);
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.default {
  height: unset;
  width: unset;
}
.plus {
  position: absolute;
  height: 30px;
  width: 30px;
}
.dragging {
  background: var(--accent-color);
}
.delete-image {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 2;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  & svg {
    width: 14px;
    height: 14px;
  }
}
</style>
