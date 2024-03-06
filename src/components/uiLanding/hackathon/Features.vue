<template>
  <section class="hackathonFeatures landing-block" id="features">
    <div class="wrapper landing-wrapper">
      <div class="hackathonFeatures-inner">
        <h2 class="landing-title">{{ $t('hackathon.features.title') }}</h2>
      </div>
      <div class="hackathonFeatures-items">
        <div
          class="hackathonFeatures-item"
          v-for="featureIDX in 4"
          :key="featureIDX"
        >
          <div class="hackathonFeatures-item-preview">
            <img :src="`/img/uiLanding/hackathon/features/feature-${featureIDX}.png`" alt="">
          </div>

          <div class="hackathonFeatures-item-content">
            <h4 class="hackathonFeatures-item-content-title">
              {{ $t(`hackathon.features.item-${featureIDX}.title`) }}
            </h4>

            <p
              class="hackathonFeatures-item-content-description"
              v-html="$t(`hackathon.features.item-${featureIDX}.description`)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.landing-title {
  color: var(--white-color);
}

.hackathonFeatures {
  background-color: var(--primary-color);

  &-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 100px 80px;
  }

  &-item {
    display: grid;
    grid-template-columns: 180px 1fr;

    &-preview {
      padding-bottom: 100%;
      position: relative;

      & img {
        width: 100%;

        position: absolute;
        right: 20px;
      }

      &::before {
        content: '';

        display: block;
        width: 218px;
        height: 218px;

        position: absolute;
        left: 20px;
        top: -38px;
        z-index: 1;

        border-radius: 50%;
        background-color: var(--accent-color-op10);
      }
    }

    &-content {
      &-title {
        color: var(--white-color);
        font-size: 24px;
        font-weight: 700;

        margin-bottom: 26px;
      }

      &-description {
        color: var(--white-color);
        font-size: 20px;
      }
    }
  }
}
</style>