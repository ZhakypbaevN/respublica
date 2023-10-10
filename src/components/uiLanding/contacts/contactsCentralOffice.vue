<template>
  <div class="contacts">
    <div class="contacts-items">
      <h4 class="contacts-items-title">Наш адрес</h4>

      <a class="contacts-item" href="https://go.2gis.com/yd0lu">
        <SvgIcon name="marker-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">
          Республика Казахстан, г.Астана, пр. Мангилик ел, 33/1 <br />
          Бизнес-центр IPLAZA, 9 этаж
        </h4>
      </a>
      <a class="contacts-item" href="tel:+7 7172 640 777">
        <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">+7 7172 640 777</h4>
      </a>
      <a class="contacts-item" href="mailto:info@respublica-partiyasy.kz">
        <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">info@respublica-partiyasy.kz</h4>
      </a>
    </div>

    <div class="contacts-items">
      <h4 class="contacts-items-title">Пресс-служба (для СМИ)</h4>

      <a class="contacts-item" href="tel:+7 701 722 8251">
        <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">+7 701 722 8251</h4>
      </a>
      <a class="contacts-item" href="mailto:akparat2020@gmail.com">
        <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
        <h4 class="contacts-item-title">akparat2020@gmail.com</h4>
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
}
</style>
