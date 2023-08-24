<template>
  <div class="wrapper-main dark">
    <Header withoutTopAndNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">

      </div>
    </div>

    <FooterMini />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/uiLanding/layouts/header.vue';
import FooterMini from '../components/uiLanding/layouts/footer-mini.vue';
// import Button from '../components/common/Button.vue'

</script>

<style scoped lang="scss">
.intro {
  padding-top: 34%;
  background: url('/img/uiLanding/intro-preview.jpg') center no-repeat;
  background-size: cover;

  position: relative;

  &-btns {
    display: flex;
    grid-gap: 30px;

    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
  }
}
</style>
