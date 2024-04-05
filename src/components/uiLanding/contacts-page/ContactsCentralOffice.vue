<template>
  <div class="contacts">
    <div class="contacts-items" id="our-address">
      <h4 class="contacts-items-title">{{ $t('contacts.our-address') }}</h4>

      <a class="contacts-item" href="https://go.2gis.com/yd0lu">
        <SvgIcon name="marker-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title" v-html="$t('contacts.address')"></h4>
      </a>
      
      <a class="contacts-item" :href="`tel:${$t('contacts.phone')}`">
        <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">
          {{ $t('contacts.phone') }}
        </h4>
      </a>

      <a class="contacts-item" :href="`mailto:info@respublica-partiyasy.kz`">
        <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">
          info@respublica-partiyasy.kz
        </h4>
      </a>
    </div>

    <div class="contacts-items" id="press-service-for-the-media">
      <h4 class="contacts-items-title">{{ $t('contacts.press-service-for-the-media.title') }}</h4>

      <a class="contacts-item" :href="`mailto:a.ensebaeva@respublica-partiyasy.kz`">
        <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">
          a.ensebaeva@respublica-partiyasy.kz
        </h4>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 180px;

  padding-bottom: 70px;

  &-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 9px;

    &-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      text-transform: uppercase;
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

  // Adaptation
  @media (max-width: 1200px) {
    grid-gap: 140px;
  }

  @media (max-width: 992px) {
    grid-gap: 80px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;

    padding-bottom: 40px;

    &-items {
      grid-gap: 10px;

      &-title {
        font-size: 18px;
        margin-bottom: 6px;
      }
    }

    &-item {
      grid-gap: 12px;

      & svg {
        height: 28px;
        width: 28px;
      }

      &-title {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 576px) {
    grid-gap: 30px;

    padding-bottom: 38px;

    &-items {
      &-title {
        font-size: 17px;
        margin-bottom: 6px;
      }
    }

    &-item {
      grid-gap: 10px;

      & svg {
        height: 24px;
        width: 24px;
      }

      &-title {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
