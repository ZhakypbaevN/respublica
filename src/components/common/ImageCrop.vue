<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="cropModal"
    :maxInner="885"
  >
    <div class="cropModal-inner">
      <VuePictureCropper
        :boxStyle="{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f8f8',
          margin: 'auto',
        }"
        :img="file"
        :options="{
          viewMode: 1,
          dragMode: 'crop',
          aspectRatio: 16 / 9,
        }"
        @ready="ready"
      />
      <Button
        name="Готово"
        type="default-green"
        @click="crop"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

interface IProps {
  show: boolean,
  file?: string,
  aspectRatio?: number
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'newFile', value: any): void,
  (event: 'update:url', value: any): void,
}

const props = withDefaults(defineProps<IProps>(), {
  aspectRatio: 16 / 9,
})
const emits = defineEmits<Emits>()

const crop = async () => {
  console.log('!cropper', !cropper);

  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob: Blob | null = await cropper.getBlob()
  if (!blob) return

  const file = await cropper.getFile()

  console.log({ base64, blob, file })
  emits('update:url', URL.createObjectURL(blob))
  emits('newFile', file)
  emits('hide')
}

const ready = async () => {
  console.log('Cropper is ready.')
}
</script>

<style lang="scss" scoped>
.cropModal {
  width: 100%;
  height: 100%;

  &-inner {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    align-items: flex-end;
  }
  
}
</style>
<style>
.croppie-container .cr-viewport,
.croppie-container .cr-resizer {
  border: none;
}
</style>
