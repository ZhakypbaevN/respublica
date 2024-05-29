<template>
  <div class="dp">
    <Datepicker
      v-model="pickerValue"
      locale="ru"
      ref="dp"
      :enableTimePicker="timePicker"
    >
      <template #action-select>
        <Button class="select" @click="selectDate">{{ $t('choose') }}</Button>
      </template>
      <template #trigger>
        <slot />
        <button class="datepicker" />
      </template>
    </Datepicker>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, ref } from 'vue-demi'

const props = defineProps({
  modelValue: String,
  timePicker: {
    type: Boolean,
    default: false
  },
  button: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:modelValue'])
const dp = ref(null)
const pickerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const selectDate = () => {
  dp.value.selectDate()
}
</script>

<style scoped lang="scss">
.dp {
  display: flex;

  position: relative;
}
.select {
  margin: 0;
}
button.datepicker {
  position: absolute;
  right: 10px;
  bottom: 22px;
  z-index: 10;
  opacity: 0.9;

  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwM18yMjI5KSI+CjxwYXRoIGQ9Ik0xNiAxMkgxM0MxMi40NSAxMiAxMiAxMi40NSAxMiAxM1YxNkMxMiAxNi41NSAxMi40NSAxNyAxMyAxN0gxNkMxNi41NSAxNyAxNyAxNi41NSAxNyAxNlYxM0MxNyAxMi40NSAxNi41NSAxMiAxNiAxMlpNMTYgMlYzSDhWMkM4IDEuNDUgNy41NSAxIDcgMUM2LjQ1IDEgNiAxLjQ1IDYgMlYzSDVDMy44OSAzIDMuMDEgMy45IDMuMDEgNUwzIDE5QzMgMjAuMSAzLjg5IDIxIDUgMjFIMTlDMjAuMSAyMSAyMSAyMC4xIDIxIDE5VjVDMjEgMy45IDIwLjEgMyAxOSAzSDE4VjJDMTggMS40NSAxNy41NSAxIDE3IDFDMTYuNDUgMSAxNiAxLjQ1IDE2IDJaTTE4IDE5SDZDNS40NSAxOSA1IDE4LjU1IDUgMThWOEgxOVYxOEMxOSAxOC41NSAxOC41NSAxOSAxOCAxOVoiIGZpbGw9ImJsYWNrIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTAzXzIyMjkiPgo8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    opacity: 0.7;
  }
}
</style>
