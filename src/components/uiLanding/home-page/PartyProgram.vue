<template>
  <section class="partyProgram landing-block">

    <div class="partyProgram-titleBlock">
      <div class="wrapper landing-wrapper">
        <p
          class="partyProgram-titleBlock-description"
          v-html="$t('party-program-description')"
        />

        <h2 v-if="false" class="partyProgram-titleBlock-title">{{ $t("party-program-forward") }}</h2>
      </div>
    </div>
    
    <div class="partyProgram-main" :style="{backgroundColor: blockList[showFirst ? 0 : 1].color}">
      <div class="wrapper landing-wrapper">
        <div class="partyProgram-slider">
          <div class="partyProgram-slider-preview">
            <img :src="blockList[showFirst ? 0 : 1].img" alt="">
          </div>

          <div class="partyProgram-slider-content">
            <h2 class="partyProgram-slider-title" v-html="blockList[showFirst ? 0 : 1].title" />

            <a :href="blockList[showFirst ? 0 : 1].pdf" target="_blank">
              <Button
                :name="$t('button.view-the-file')"
                type="outline-light"
                class="partyProgram-slider-link"
              >
                <SvgIcon
                  name="double-arrow-right"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </a>
          </div>

          <div class="partyProgram-slider-control">
            <button
              class="partyProgram-slider-control-btn"
              @click="toggleSlider"
            >
              <SvgIcon
                name="arrow-top-white-whith-line"
                :viewboxWidth="65"
                :viewboxHeight="65"
              />
            </button>
            <div class="partyProgram-slider-control-line"></div>
            <button
              class="partyProgram-slider-control-btn"
              @click="toggleSlider"
            >
              <SvgIcon
                name="arrow-bottom-white-whith-line"
                :viewboxWidth="65"
                :viewboxHeight="65"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showFirst = ref(true)
const blockList = [
  {
    color: '#4A78EC',
    img: '/img/uiLanding/party-program/R.png',
    title: t('party-program-progtam-pdf'),
    pdf: "/doc/ru/Программа партии_.pdf",
  },
  {
    color: '#894BEC',
    img: '/img/uiLanding/party-program/E.png',
    title: t('party-program-party-election-program'),
    pdf: "/doc/ru/Программа предвыборная рус.pdf",
  },
];

const toggleSlider = () => {
  showFirst.value = !showFirst.value;
}
</script>

<style scoped lang="scss">
.partyProgram {
  &-titleBlock {
    padding: 48px 0;
    background-color: var(--light-blue-color);

    &-description {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      line-height: 1.2;
    }

    &-title {
      font-family: 'Montserrat';
      font-size: 64px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  &-slider {
    display: grid;
    grid-template-columns: 480px 1fr 65px;
    align-items: center;
    grid-gap: 140px;

    padding: 55px 0;

    &-preview {
      height: 510px;

      & img {
        mix-blend-mode: hard-light;

        height: 100%;
      }
    }

    &-title {
      color: white;
      font-family: 'Montserrat';
      font-size: 48px;
      font-weight: 700;
      text-transform: uppercase;

      margin-bottom: 65px;
    }

    &-link {
      display: flex;
      align-items: center;
      grid-gap: 10px;
      border-radius: 100px;

      & svg {
        height: 24px;
        width: 24px;
        fill: white;
        position: relative;
        right: 0;

        transition: all 0.3s ease-in-out;
      }

      &:hover svg {
        right: -8px;
      }
    }

    &-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      grid-gap: 14px;
  
      &-btn svg {
        height: 65px;
        width: 65px;
  
        fill: white;
      }

      &-line {
        height: 2px;
        width: 33px;

        background-color: white;
      }
    }
  }

  // Adaptation
  /* @media (max-width: 1400px) {
    &-titleBlock {
      padding: 48px 0;

      &-description {
        font-size: 28px;
      }

      &-title {
        font-size: 64px;
      }
    }

    &-slider {
      grid-template-columns: 360px 1fr 65px;
      grid-gap: 80px;

      padding: 55px 0;

      &-preview {
        height: 360px;
      }

      &-title {
        font-size: 38px;
        margin-bottom: 50px;
      }

      &-link {
        grid-gap: 10px;
        border-radius: 100px;

        & svg {
          height: 24px;
          width: 24px;
        }
      }

      &-control {
        grid-gap: 14px;
    
        &-btn svg {
          height: 65px;
          width: 65px;
        }

        &-line {
          height: 2px;
          width: 33px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 992px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  } */
}
</style>
