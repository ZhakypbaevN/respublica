<template>
  <Dropdown
    class="pdfDropDown"
    :btnText="name ?? $t('button.view-pdf')"
    :btnType="btnStyle"
    @click.stop
  >
    <DropdownItem
      v-for="lang of langItems"
      :key="lang.value"
      @click="() => toPdf(pdflinks[lang.value])"
    >
      {{ lang.title }}
    </DropdownItem>
  </Dropdown>
</template>

<script setup lang="ts">
  interface IProps {
    pdflinks: any,
    name?: string,
    btnStyle: string
  }

  withDefaults(defineProps<IProps>(), {
    btnStyle: 'outline-blue'
  })

  const langItems = [
    {
      title: 'Русский',
      value: 'ru',
    },
    {
      title: 'Қазақша',
      value: 'kz',
    }
  ];

  const toPdf = (pdflink) => window.open(pdflink, '_blank')
</script>