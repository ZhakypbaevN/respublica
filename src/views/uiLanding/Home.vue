<template>
  <div class="main">
    <div>
      <Header />

      <section class="intro">
        <div class="wrapper landing-wrapper">
          <div class="intro-btns">
            <Button name="ВСТУПИТЬ В ПАРТИЮ" type="default-blue" />
            <Button name="ПОДАТЬ ОБРАЩЕНИЕ" type="default-blue" />
          </div>
        </div>
      </section>

      <AboutUs />

      <NewsSlider />

      <PartyProgram />

      <AboutParty />

      <Purchases />
    </div>

    <Footer /> 
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import Button from '../../components/common/Button.vue'

import AboutUs from '../../components/uiLanding/home/aboutUs.vue'
import NewsSlider from '../../components/uiLanding/home/newsSlider.vue'
import PartyProgram from '../../components/uiLanding/home/partyProgram.vue'
import AboutParty from '../../components/uiLanding/home/aboutParty.vue'
import Purchases from '../../components/uiLanding/home/purchases.vue'

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
