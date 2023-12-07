<template>
  <form @submit.prevent="onFinish">
    <slot />
  </form>
</template>

<script setup>
import { provide, reactive } from 'vue'

const emit = defineEmits(['finish'])
const props = defineProps({
  formData: {
    type: Boolean,
    default: false
  },
  ignores: {
    type: Array,
    default: null
  }
})
const formData = reactive({})
provide('formData', formData)

const hasError = reactive({})
provide('hasError', hasError)

const checkIgnore = (field) => {
  if (!props.ignores) return true
  for (const ignore in props.ignores) {
    if (props.ignores[ignore] === field) return false
  }
  return true
}

const handleError = (fields) => {
  for (const field in fields) {
    if (fields[field] && checkIgnore(field)) return true
  }
  return false
}

const onFinish = () => {
  if (!handleError(hasError)) {
    if (props.formData) {
      const form = new FormData()
      for (const [key, value] of Object.entries(formData)) {
        form.set(key, value)
      }
      emit('finish', form)
    } else emit('finish', { ...formData })
  }
}
</script>

<style scoped></style>
