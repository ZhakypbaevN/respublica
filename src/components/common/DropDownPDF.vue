<template>
  <Dropdown
    v-if="pdflinksKeys.length != 0"
    class="pdfDropDown"
    :btnText="name ?? $t('button.view-pdf')"
    :btnType="btnStyle"
    @click.stop
  >
    <DropdownItem
      v-for="lang of pdflinksKeys"
      :key="lang"
      @click="() => toPdf(pdflinks[lang])"
    >
      {{ langItems[lang] }}
    </DropdownItem>
  </Dropdown>
  <Dropdown
    v-else
    class="pdfDropDown"
    :btnText="name ?? $t('button.view-pdf')"
    :btnType="btnStyle"
    @click.stop
  />
</template>

<script setup lang="ts">
  import { watch, ref, onMounted } from 'vue';

  interface IProps {
    pdflinks: any,
    name?: string,
    btnStyle: 'outline-blue' | 'outline-light'
  }

  const props = withDefaults(defineProps<IProps>(), {
    btnStyle: 'outline-blue'
  })

  const langItems = {
      ru: 'Русский',
      kz: 'Қазақша'
    };

  const pdflinksKeys = ref<string[]>([]);
    
  
  const getKeysNames = () => {
    pdflinksKeys.value = [];
    setTimeout(() => {
      pdflinksKeys.value = [];
    
      Object.keys(props.pdflinks).forEach((key) => {
        pdflinksKeys.value.push(key);
      })
    }, 10)
  }
  
  const toPdf = (pdflink) => window.open(pdflink, '_blank');

  onMounted(getKeysNames)
  watch(() => props.pdflinks, getKeysNames);
</script>