<template>
  <section class="partyStructure">
    <div class="wrapper">
      <div class="partyStructure-inner" id="party-structure">
        <h2 class="partyStructure-title landing-title center">{{ $t('about-us-page.organizational-structure') }}</h2>
      
        <img class="partyStructure-svg" src="/img/icons/party-structure-2.svg" alt="">
      </div>
    </div>
  </section>
</template>
  
<style scoped lang="scss">
.partyStructure {
  border-radius: 10px;
  padding: 0px !important;

  &-inner {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 40px 20px;

    background-color: white;
    border-radius: 20px;
  }

  & img {
    height: 100%;
    max-height: 70vh;
    min-height: 500px;
    padding: 0 70px;
  }
  
  // Adaptation
  @media (max-width: 1200px) {
    &-inner {
      padding: 30px 20px;
      border-radius: 18px;
    }

    & img {
      width: 100%;
      min-height: auto;
      padding: 0 40px;
  }
  }
  
  @media (max-width: 768px) {
    &-title {
      font-size: 26px;
    }

    &-inner {
      border-radius: 16px;
      padding: 28px 18px;
    }

    & img {
      padding: 0 30px;
    }
  }
  
  @media (max-width: 576px) {
    &-title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    &-inner {
      border-radius: 14px;
      padding: 24px 16px;
    }

    & img {
      padding: 0 20px;
    }
  }
  
  @media (max-width: 380px) {
    & img {
      padding: 0 10px;
    }
  }
}

</style>
  