<template>
  <div class="wrapper-main">
    <div class="wrapper landing-wrapper">
      <SvgIcon class="inDevelepmont-icon" name="settings-develop" :viewboxWidth="300" :viewboxHeight="300" />
      <h2 class="inDevelepmont-title">{{ $t('message.this-functionality-is-still-in-development') }}</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  min-height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.inDevelepmont {
  &-icon {
    height: 200px;
    width: 200px;
    fill: var(--light-gray-color-op50);

    margin: 0 auto 15px;
  }

  &-title {
    width: 100%;
    
    color: var(--light-gray-color-op50);
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 70px;
  }

  // Adaptation
  @media (max-width: 992px) {
    &-icon {
      height: 180px;
      width: 180px;
      margin: 0 auto 14px;
    }

    &-title {
      font-size: 40px;
      margin-bottom: 64px;
    }
  }

  @media (max-width: 768px) {
    &-icon {
      height: 160px;
      width: 160px;
      margin: 0 auto 12px;
    }

    &-title {
      font-size: 38px;
      margin-bottom: 58px;
    }
  }

  @media (max-width: 576px) {
    &-icon {
      height: 140px;
      width: 140px;
      margin: 0 auto 10px;
    }

    &-title {
      font-size: 36px;
      margin-bottom: 54px;
    }
  }

  @media (max-width: 380px) {
    &-icon {
      height: 120px;
      width: 120px;
      margin: 0 auto 10px;
    }

    &-title {
      font-size: 34px;
      margin-bottom: 54px;
    }
  }
}
</style>
