<template>
  <ckeditor
    v-model="editorData"
    :editor="ClassicEditor"
    :config="editorConfig"
  />
</template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Heading from '@ckeditor/ckeditor5-heading'
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Link from '@ckeditor/ckeditor5-link/src/link'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
// import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
// import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
// import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript'
// import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript'
// import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle'

// import Font from '@ckeditor/ckeditor5-font/src/font'

// import Indent from '@ckeditor/ckeditor5-indent/src/indent'
// import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'

// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'

// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
// import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'

// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'

// import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'

// import Table from '@ckeditor/ckeditor5-table/src/table'
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

// import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters'
// import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials'

// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'

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
  // plugins: [
    // Font,
    // Heading,
    // Highlight,
    // Indent,
    // IndentBlock,
    // Essentials,
    // Bold,
    // Italic,
    // Link,
    // Paragraph,
    // Underline,
    // Strikethrough,
    // Code,
    // Subscript,
    // Superscript,
    // CodeBlock,
    // Image,
    // ImageToolbar,
    // ImageCaption,
    // ImageStyle,
    // ImageResize,
    // LinkImage,
    // ImageInsert,
    // Base64UploadAdapter,
    // Clipboard,
    // PasteFromOffice,
    // Table,
    // TableToolbar,
    // SpecialCharacters,
    // SpecialCharactersEssentials,
    // ListStyle,
    // Alignment,
    // MediaEmbed
  // ],
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      // 'fontFamily',
      // 'fontSize',
      // 'fontColor',
      // 'fontBackgroundColor',
      // 'highlight',
      // '|',
      'bold',
      'italic',
      // 'underline',
      // 'strikethrough',
      'bulletedList',
      'numberedList',
      // 'subscript',
      // 'superscript',
      '|',
      // 'alignment',
      'outdent',
      'indent',
      '|',
      // 'imageInsert',
      // 'linkImage',
      'link',
      'mediaEmbed',
      '|',
      'insertTable',
      // 'specialCharacters',
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
