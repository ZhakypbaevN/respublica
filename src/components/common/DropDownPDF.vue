<template>
  <Dropdown
    class="pdfDropDown"
    :btnText="$t('button.view-pdf')"
    btnType="outline-blue"
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
    pdflinks: any
  }

  defineProps<IProps>()

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
<style>
.pdfDropDown .ac-dropdown_btn {
  border-radius: 100px;
}
</style>