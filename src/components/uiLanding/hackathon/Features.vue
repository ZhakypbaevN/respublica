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

  // Adaptation
  @media (max-width: 1400px) {
    &-items {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 90px 70px;
    }

    &-item {
      grid-template-columns: 160px 1fr;

      &-preview {
        padding-bottom: 100%;

        & img {
          right: 20px;
        }

        &::before {
          width: 210px;
          height: 210px;

          left: 20px;
          top: -38px;
        }
      }

      &-content {
        &-title {
          font-size: 22px;
          margin-bottom: 24px;
        }

        &-description {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    &-items {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 80px 60px;
    }

    &-item {
      grid-template-columns: 140px 1fr;

      &-preview {
        &::before {
          width: 160px;
          height: 160px;

          left: 20px;
          top: -38px;
        }
      }

      &-content {
        &-title {
          font-size: 22px;
          margin-bottom: 24px;
        }

        &-description {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-items {
      grid-template-columns: 1fr;
      grid-gap: 60px;

      padding-top: 20px;
    }

    &-item {
      grid-template-columns: 140px 1fr;
      padding-left: 30px;

      &-preview {
        &::before {
          width: 160px;
          height: 160px;

          left: 20px;
          top: -38px;
        }
      }

      &-content {
        &-title {
          font-size: 22px;
          margin-bottom: 24px;
        }

        &-description {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    &-items {
      grid-gap: 50px;
      padding-top: 20px;
    }

    &-item {
      grid-template-columns: 120px 1fr;
      padding-left: 26px;

      &-preview {
        & img {
          right: 20px;
        }

        &::before {
          width: 140px;
          height: 140px;

          left: 20px;
          top: -20px;
        }
      }

      &-content {
        &-title {
          font-size: 20px;
          margin-bottom: 22px;
        }

        &-description {
          font-size: 16px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-items {
      grid-gap: 50px;
      padding-top: 0;
    }

    &-item {
      display: flex;
      flex-direction: column;
      padding-left: 0px;

      &-preview {
        width: 120px;
        height: 120px;

        padding-bottom: 0;
        margin-bottom: 20px;

        & img {
          left: 10px;
        }

        &::before {
          width: 110px;
          height: 110px;

          left: 50px;
          top: -10px;
        }
      }

      &-content {
        &-title {
          font-size: 20px;
          margin-bottom: 22px;
        }
      }
    }
  }

  @media (max-width: 380px) {
    &-items {
      grid-gap: 40px;
    }

    &-item {
      &-preview {
        width: 100px;
        height: 100px;

        margin-bottom: 20px;

        & img {
          left: 10px;
        }

        &::before {
          width: 90px;
          height: 90px;

          left: 50px;
          top: -10px;
        }
      }

      &-content {
        &-title {
          font-size: 18px;
          margin-bottom: 18px;
        }
      }
    }
  }
}
</style>