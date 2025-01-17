<template>
  <div>
    <Dropdown
      v-if="dropdown"
      :btnText="selectLang === 'ru' ? $t('rus') : $t('kaz')"
      @click.stop
    >
      <div
        v-for="lang of langs"
        :key="lang.value"
      >
        <DropdownItem
          v-if="lang.value !== selectLang"
          @click="() => toggleLang(lang.value)"
        >
          {{ lang.name }}
        </DropdownItem>
      </div>
    </Dropdown>

    <button
      v-else
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
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { defaultLocale, setNewLang } from '@/assets/lang/exports'

  const { t } = useI18n()

  interface IProps {
    light?: boolean,
    dropdown?: boolean
  }

  withDefaults(defineProps<IProps>(), {
    light: false,
    dropdown: false
  })

  const langs = [
    {
      name: t('rus'),
      value: 'ru'
    },
    {
      name: t('kaz'),
      value: 'kz'
    }
  ];

  const selectLang = ref(defaultLocale)
  const showDropdown = ref(false);

  const toggleLang = (newLang) => {
    selectLang.value = newLang;
    showDropdown.value = false;

    setNewLang(newLang);
  }

  const langName = (lang) => {
    const select = langs.find(langItem => langItem.value === lang)
    if (!select) toggleLang(langs[0].value);
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
      box-shadow: 0 4px 8px rgba(160,174,192,.25);

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

    // Adaptation
    @media (max-width: 992px) {
      & span {
        font-size: 18px;
      }

      &-dropDown {
        padding: 5px;
        border-radius: 8px;

        &.show {
          top: calc(100% + 18px);
        }

        &-btn {
          padding: 8px 10px;
        }
      }
    }

    @media (max-width: 768px) {
    }

    @media (max-width: 576px) {
    }

    @media (max-width: 380px) {
    }
  }
</style>