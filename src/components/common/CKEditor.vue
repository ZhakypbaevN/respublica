<template>
  <ckeditor
    v-model="editorData"
    :editor="ClassicEditor"
    :config="editorConfig"
  />
</template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { computed } from 'vue-demi'

const props = defineProps({
  modelValue: {
    type: String
  },
  placeholder: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const editorData = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const editorConfig = {
  placeholder: props.placeholder,
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'link',
      'mediaEmbed',
      '|',
      'insertTable',
      '|',
      'imageStyle:block',
      'imageStyle:side',
      'toggleImageCaption',
      'imageTextAlternative'
    ],
    shouldNotGroupWhenFull: true
  },
  mediaEmbed: {
    previewsInData: true
  },
  language: 'ru'
}
</script>
