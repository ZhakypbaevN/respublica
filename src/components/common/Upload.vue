<template>
  <div
    @dragover="onDragOver"
    @dragleave="drag = false"
    @drop="onDrop"
    @click="input.click()"
    :class="{ dragging: drag }"
    v-if="image === defaultPreview || modelValue?.link"
  >
    <button
      class="delete-image"
      v-wave
      v-if="modelValue"
      @click.stop="image = null"
    >
      <SvgIcon
        name="x"
        :viewboxHeight="14"
        :viewboxWidth="14"
        :width="14"
        :height="14"
        fill="var(--error-color)"
      />
    </button>
    <img
      :src="image"
      alt=""
      :class="{ default: image === defaultPreview }"
      crossorigin="anonymous"
    />
    <input
      type="file"
      ref="input"
      style="display: none"
      :accept="type"
      @change="onUpload"
    />
    <SvgIcon
      v-if="!modelValue"
      class="plus"
      name="plus"
      :viewboxHeight="14"
      :viewboxWidth="14"
      :width="30"
      :height="30"
      :fill="!drag ? 'var(--accent-color)' : '#fff'"
    />
  </div>
  <div v-else style="position: relative">
    <button
      class="delete-image"
      v-wave
      v-if="modelValue"
      @click.stop="image = null"
    >
      <SvgIcon
        name="x"
        :viewboxHeight="14"
        :viewboxWidth="14"
        :width="14"
        :height="14"
        fill="var(--error-color)"
      />
    </button>
    <ImageCrop
      @update="image = $event"
      :value="image"
      :width="width"
      :height="height"
    />
    <div class="grid">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
import ImageCrop from '@/components/common/ImageCrop.vue'
import { ref, computed } from 'vue-demi'
import getFileUrl from '@/helpers/getFileUrlByDate'

export default {
  name: 'Upload',
  components: {
    ImageCrop
  },
  props: {
    modelValue: [File, Object, String],
    preview: {
      type: Boolean,
      default: false
    },
    defaultPreview: {
      type: String,
      default: '/img/tmp/default_product_avatar.svg'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'image/png, image/gif, image/jpeg, image/svg'
    },
    width: {
      type: Number,
      default: 225
    },
    height: {
      type: Number,
      default: 225
    }
  },
  emits: ['upload', 'update:modelValue', 'update:preview'],
  setup (props, { emit }) {
    const drag = ref(false)
    const input = ref(null)
    const renderedImage = ref(null)
    const image = computed({
      get: () => {
        const image = props.modelValue
        if (image instanceof Blob) return image

        if (image instanceof File) {
          renderImage(image).then((value) => (renderedImage.value = value))
          return renderedImage.value ?? props.defaultPreview
        }

        if (!image) return props.defaultPreview

        return getFileUrl(image)
      },
      set: (val) => {
        emit('update:modelValue', val)
      }
    })

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

    const onUpload = (event) => {
      const fileList = event.target.files
      if (fileList.length) upload(fileList)
    }

    const upload = (files) => {
      emit('update:modelValue', props.multiple ? files : files[0])
      emit('upload', props.multiple ? files : files[0])
    }

    const renderImage = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
      })

    return {
      drag,
      input,
      image,
      onDragOver,
      onDrop,
      onUpload
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
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
}
.grid {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  z-index: 1;
  pointer-events: none;
}
.grid div {
  border: 0.5px dashed #fff;
}
.grid div:nth-of-type(1) {
  width: 1px;
  grid-column: 1;
  grid-row: 1 / 4;
  justify-self: flex-end;
}
.grid div:nth-of-type(2) {
  width: 1px;
  grid-column: 2;
  grid-row: 1 / 4;
  justify-self: flex-end;
}
.grid div:nth-of-type(3) {
  width: 100%;
  height: 1px;
  grid-row: 1;
  grid-column: 1 / 4;
  align-self: flex-end;
}
.grid div:nth-of-type(4) {
  width: 100%;
  height: 1px;
  grid-row: 2;
  grid-column: 1 / 4;
  align-self: flex-end;
}
</style>
