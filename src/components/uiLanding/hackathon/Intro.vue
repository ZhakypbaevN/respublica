<template>
  <section class="hackathonIntro">
    <div class="wrapper landing-wrapper">
      <div class="hackathonIntro-inner">
        <div class="hackathonIntro-content">
          <div class="hackathonIntro-content-titles">
            <h4 class="hackathonIntro-content-titles-subtitle">
              {{ $t('hackathon.intro.subtitle') }}
            </h4>

            <h2 class="hackathonIntro-content-titles-title">
              <span>{{ $t('hackathon.intro.recodetau') }}</span>
              {{ $t('hackathon.intro.title') }}
            </h2>

            <p class="hackathonIntro-content-titles-description">
              {{ $t('hackathon.intro.description') }}
            </p>
          </div>


          <div class="hackathonIntro-content-btns">
            <a href="https://forms.office.com/r/C2vGaALmV1" target="_blank">
              <Button
                :name="$t('auth.register')"
                type="default-orange"
              />
            </a>
            <Button
              class="hackathonIntro-content-btns-play"
              :name="$t('hackathon.intro.btn-play')"
              type="outline-light"
              v-slot:left
            >
              <SvgIcon
                name="play-with-circle"
                :viewboxWidth="32"
                :viewboxHeight="32"
              />
            </Button>
          </div>
        </div>

        <div class="hackathonIntro-preview" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue';

</script>

<style scoped lang="scss">
.hackathonIntro {
  background-color: var(--primary-color);

  &-inner {
    padding: 90px 0 100px;

    position: relative;
  }

  &-content {
    max-width: 950px;

    & * {
      color: var(--white-color);
    }

    &-titles {
      margin-bottom: 110px;

      &-subtitle {
        font-size: 40px;
        font-weight: 600;
        text-transform: uppercase;
  
        margin-bottom: 24px;
      }
  
      &-title {
        font-size: 70px;
        font-weight: 900;
        color: var(--orange-color);
        text-transform: uppercase;
  
        margin-bottom: 40px;
  
        & span {
          color: var(--accent-color);
        }
      }
  
      &-description {
        max-width: 640px;

        font-size: 20px;
        font-weight: 500;
      }
    }

    &-btns {
      display: flex;
      align-items: stretch;
      grid-gap: 34px;

      &-play {
        display: flex;
        align-items: center;
        grid-gap: 10px;

        & svg {
          height: 32px;
          width: 32px;
        }
      }
    }
  }

  &-preview {
    height: 90%;

    position: absolute;
    top: 0;
    right: 0;

    padding-left: 42%;
    background: url('/img/uiLanding/hackathon/intro-preview.png') center no-repeat;
  }
}
</style>