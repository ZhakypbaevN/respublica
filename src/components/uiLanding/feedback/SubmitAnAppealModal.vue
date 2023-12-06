<template>
  <Modal
    v-if="show"
    @hide="$emit('hide')"
    class="submitAnAppealModal"
  >
    <SvgIcon class="contacts-settings-icon" name="settings-develop" :viewboxWidth="300" :viewboxHeight="300" />
    <h2 class="contacts-settings-title">{{ $t('message.this-functionality-is-still-in-development') }}</h2>

    <div class="contacts-items">
      <h4 class="contacts-items-title">{{ $t('message.but-you-can-submit-an-appeal-by-contacting-us') }}</h4>

      <a class="contacts-item" href="https://go.2gis.com/yd0lu">
        <SvgIcon name="marker-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title" v-html="$t('contacts.address')"></h4>
      </a>
      
      <a class="contacts-item" :href="`tel:${$t('contacts.phone')}`">
        <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">{{ $t('contacts.phone') }}</h4>
      </a>
      <a class="contacts-item" :href="`mailto:info@respublica-partiyasy.kz`">
        <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">info@respublica-partiyasy.kz</h4>
      </a>
    </div>
  </Modal>
</template>

<script setup lang="ts">
interface IProps {
  show: boolean;
}
interface Emits {
  (event: "hide"): Function;
}

defineProps<IProps>();
defineEmits<Emits>();
</script>

<style scoped lang="scss">
.contacts {
  &-settings {
    &-icon {
      height: 140px;
      width: 140px;
      fill: var(--light-gray-color-op50);

      margin: 0 auto 15px;
    }

    &-title {
      width: 100%;
      
      color: var(--light-gray-color-op50);
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 70px;
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    grid-gap: 9px;

    &-title {
      color: var(--accent-color);
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }
  }

  &-item {
    display: inline-flex;
    align-items: center;
    grid-gap: 14px;

    &:hover {
      & .contacts-item-title {
        color: var(--accent-color);
      }
    }

    & svg {
      height: 32px;
      width: 32px;
    }

    &-title {
      font-size: 20px;
      font-weight: 600;

      transition: all 0.3s ease-in-out;
    }
  }
}
</style>


<style lang="scss">
.submitAnAppealModal .modal-title {
  color: var(--light-gray-color-op50) !important;
}
</style>