<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="cropModal"
    :maxInner="885"
  >
    <div class="cropModal-inner">
    
      <Cropper
        ref="cropper"
        class="cropper"
        :src="file"
        :stencil-props="{
          aspectRatio: aspectRatio
        }"
        :canvas="{
          width: width,
          height: height
        }"
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
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.classic.css';

interface IProps {
  show: boolean,
  file?: string,
  aspectRatio?: number,
  width: number,
  height: number
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'newFile', value: any): void,
  (event: 'newUrl', value: any): void,
}

const props = withDefaults(defineProps<IProps>(), {
  aspectRatio: 16 / 9,
})
// const opt = {
//   width: 920,
//   height: 514,
// }
const emits = defineEmits<Emits>()

const cropper = ref();

const crop = async () => {
  console.log('props.width', props.width);
  console.log('props.height', props.height);
  if (cropper.value) {
    const { canvas } = cropper.value.getResult({ width: props.width, height: props.height });

    const dataUrl = canvas.toDataURL('image/jpeg');
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "fileName.jpeg", {type: "image/jpeg"});

    emits('newUrl', dataUrl)
    emits('newFile', file)
    emits('hide')
  }
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

.cropper {
	height: 880px;
	width: 880px;
	background: #DDD;
}
</style>
<style>
.croppie-container .cr-viewport,
.croppie-container .cr-resizer {
  border: none;
}
</style>
