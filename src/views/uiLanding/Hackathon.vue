<template>
  <main class="hackathon wrapper-main">
    <div>
      <div class="hackathon-introBlock" >
        <Header />

        <Intro />
      </div>

      <TimeToStart />

      <Conditions />

      <Program />

      <InformationBlock />

      <Features />

      <InformationBlock bg="light-orange" />

      <Partners />
    </div>

    <Footer /> 
  </main>
</template>

<script setup lang="ts">
  import Header from '@/components/uiLanding/hackathon/Header.vue';
  import Intro from '@/components/uiLanding/hackathon/Intro.vue';
  import TimeToStart from '@/components/uiLanding/hackathon/TimeToStart.vue';
  import Conditions from '@/components/uiLanding/hackathon/Conditions.vue';
  import Program from '@/components/uiLanding/hackathon/Program.vue';
  import InformationBlock from '@/components/uiLanding/hackathon/InformationBlock.vue';
  import Features from '@/components/uiLanding/hackathon/Features.vue';
  import Partners from '@/components/uiLanding/hackathon/Partners.vue';

</script>
<style scoped lang="scss">
.hackathon {
  &-introBlock {
    background-color: var(--primary-color);
  }
}
</style>

<style lang="scss">
.hackathon {
  & * {
    font-family: 'SF Pro Display';
  }

  & .landing-block {
    padding: 100px 0;
  }

  & .landing-title {
    font-weight: 500;
  }

  /* & .footer {
    margin-top: 0px !important;
  } */
}
</style>