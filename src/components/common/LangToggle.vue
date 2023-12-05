<template>
  <button
    class="lang"
    :class="{light: light}"
    @click="() => showDropdown = !showDropdown"
  >
    <span>{{ langName(selectLang) }}</span>

    <div class="lang-dropDown" :class="{show: showDropdown}">
      <div
        v-for="lang of langs"
        :key="lang.value"
      >
        <Button
          v-if="lang.value !== selectLang"
          :name="lang.name"
          type="default-light-blue"
          @click.stop="() => toggleLang(lang.value)"
          class="lang-dropDown-btn"
        />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { defaultLocale } from '@/assets/lang/exports'

  const { t } = useI18n()

  interface IProps {
    light?: boolean,
  }

  withDefaults(defineProps<IProps>(), {
    light: false,
  })

  const langs = [
    {
      name: t('rus'),
      value: 'ru'
    },
    // {
    //   name: t('kaz'),
    //   value: 'kz'
    // }
  ];

  localStorage.removeItem('lang');
  
  const selectLang = ref(defaultLocale)
  const showDropdown = ref(false);

  const toggleLang = (newLang) => {
    selectLang.value = newLang;
    showDropdown.value = false;

    localStorage.setItem('lang', newLang);
    location.reload();
  }

  const langName = (lang) => {
    const select = langs.find(langItem => langItem.value === lang)
    return select.name
  }
</script>

<style scoped lang="scss">
  .lang {
    position: relative;

    &.light {
      & span {
        color: white;
      }
    }
    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 500;
      text-decoration: underline;

      transition: all .3s ease-in-out;
    }

    &-dropDown {
      position: absolute;
      top: calc(100% + 50px);
      right: -10px;

      opacity: 0;
      visibility: hidden;

      padding: 6px;
      border-radius: 10px;
      background-color: white;

      transition: opacity .3s ease-in-out, top .3s ease-in-out;

      &.show {
        top: calc(100% + 20px);
        opacity: 1;
        visibility: visible;
      }

      &-btn {
        padding: 10px 12px;
      }
    }
  }
</style>