<template>
  <section class="wrapper-main">
    <div class="news wrapper">

      <div class="news-header">
        <Input
          placeholder="Поиск по проекту"
          staticPlaceholder
        />
        <Button
          class="news-header-addNewsBtn"
          type="default-blue"
        >
          <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </div>
      <div class="news-items">
        <PhotoItem data="csdcs"/>
        <PhotoItem data="csdcs"/>
        <PhotoItem data="csdcs"/>
        <PhotoItem data="csdcs"/>
        <PhotoItem data="csdcs"/>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoItem from "../../../components/uiMedia/photoItem.vue"
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-header {
    display: grid;grid-template-columns: 1fr 60px;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-addNewsBtn {
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px !important;

      & svg {
        height: 40px;
        width: 40px;

        fill: white;
      }
    }
  }
  &-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
  }
}
</style>