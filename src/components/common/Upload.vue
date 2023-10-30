<template>
  <div class="upload">
    <div
      @dragover="onDragOver"
      @dragleave="drag = false"
      @drop="onDrop"
      @click="input.click()"
      :class="{ dragging: drag }"
      class="upload-previewBlock withZoomPreview"
      :style="image ? '' : `padding-bottom:${previewBottom}%;`"
    >
      <div v-if="image" class="upload-preview withZoomPreview-preview">
        <div
          class="upload-preview-img bg-cover withZoomPreview-preview-img"
          :style="`background-image: url(${image});padding-bottom:${previewBottom}%;`"
        ></div>
      </div>

      <SvgIcon
        v-else
        name="default-product-avatar"
        class="defaultPreview"
        :viewboxWidth="131"
        :viewboxHeight="131"
      />
      <input
        type="file"
        ref="input"
        style="display: none"
        :accept="'image/png, image/gif, image/jpeg, image/svg'"
        @change="onUpload"
      />
    </div>
    <Button
      :name="
        image
        ? 'Сменить фотографию'
        : 'Загрузить фотографию'
      "
      @click="input.click()"
    />

    <ImageCrop
      :show="isShowModal"
      :file="fileUrl"
      :width="width"
      :height="height"
      :aspectRatio="aspectRatio"
      @newUrl="newUrl"
      @newFile="newCrop"
      @hide="() => isShowModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue-demi'
  import { File } from 'buffer';

  import ImageCrop from '../../components/common/ImageCrop.vue'

  interface IProps {
    modelValue?: File,
    preview: string | null,
    aspectRatio: number,
    height: number,
    width: number,
    previewBottom: number
  }
  interface Emits {
    (event: 'update:modelValue', value: any): void,
    (event: 'update:preview', value: any): void,
  }

  const emit = defineEmits<Emits>()

  const props = withDefaults(defineProps<IProps>(), {
    aspectRatio: 16 / 10
  })

  const image = ref(props.preview);

  const drag = ref(false)
  const input = ref(null)
  const fileUrl = ref();
  const isShowModal = ref(false);


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

    upload(files)
  }

  const upload = (files) => {
    if (!files || !files.length) return

    const file = files[0]
    emit('update:modelValue', file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileUrl.value = String(reader.result)

      isShowModal.value = true
    }
  }

  const newUrl = (url) => {
    image.value = url;
    console.log('url', url);
    console.log('image.value', image.value);
  }

  const newCrop = (file) => {
    emit('update:modelValue', file)
  }
</script>

<style scoped lang="scss">
.upload {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &-previewBlock {
    cursor: pointer;
    position: relative;
    
    border: 1px solid var(--accent-color);

    .dragging {
      background: var(--accent-color);
    }
  }

  &-preview,
  &-preview-img {
    height: 100%;
    width: 100%;
  }

  & .defaultPreview {
    height: 140px;
    width: 140px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
