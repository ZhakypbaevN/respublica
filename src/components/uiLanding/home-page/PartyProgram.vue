<template>
  <section class="partyProgram landing-block">

    <div class="partyProgram-titleBlock">
      <div class="wrapper landing-wrapper">
        <p
          id="partyProgram-description"
          class="partyProgram-titleBlock-description"
        />

        <h2 v-if="false" class="partyProgram-titleBlock-title">{{ $t("home.party-program.forward") }}</h2>
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

            <DropDownPDF
              :id="`partyProgram-pdfDropDown-${showFirst ? 0 : 1}`"
              :pdflinks="blockList[showFirst ? 0 : 1].pdflinks"
              btnStyle="outline-light"
              light
            />
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
  import DropDownPDF from '@/components/common/DropDownPDF.vue';
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const showFirst = ref(true)
  const blockList = [
    {
      color: '#4A78EC',
      img: '/img/uiLanding/party-program/R.png',
      title: t('home.party-program.party-program-respublica'),
      pdflinks: {
        ru: '/doc/ru/Программа партии_.pdf',
        kz: '/doc/kz/Re_Предвыборная_программа_партии_max_КАЗ.pdf'
      }
    },
    {
      color: '#0b1e52',
      img: '/img/uiLanding/party-program/E.png',
      title: t('home.party-program.party-election-program-respublica'),
      pdflinks: {
        ru: '/doc/ru/Идеологическая платформа партии.pdf',
        kz: '/doc/kz/Идеологиялық бағдарламасы.pdf'
      }
    },
  ];

  const toggleSlider = () => {
    showFirst.value = !showFirst.value;
  }

  onMounted(() => {
    descriptionAnimation();
  })


  const descriptionAnimation = () => {
    const text = t('home.party-program.description');
    const outputElement = document.getElementById('partyProgram-description');
    outputElement.innerHTML = '';
    
    let i = 0;
    const intervalId = setInterval(function() {
      outputElement.innerHTML += text[i];
      if (text[i] === '.')outputElement.innerHTML += '<br>'
      i++;
      if (i === text.length) {
        clearInterval(intervalId);
      }
    }, 100);
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
      font-weight: 600;
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
  @media (max-width: 1400px) {
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
    &-titleBlock {
      padding: 40px 0;

      &-description {
        font-size: 24px;
      }

      &-title {
        font-size: 54px;
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
        grid-gap: 12px;
    
        &-btn svg {
          height: 60px;
          width: 60px;
        }

        &-line {
          height: 2px;
          width: 33px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-titleBlock {
      padding: 30px 0;

      &-description {
        font-size: 20px;
      }

      &-title {
        font-size: 34px;
      }
    }

    &-slider {
      grid-template-columns: 280px 1fr;
      grid-gap: 30px 100px;

      padding: 55px 0;

      &-preview {
        height: 300px;
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
        justify-content: center;
        flex-direction: row;
        grid-column: 1/3;
        grid-gap: 12px;
    
        &-btn svg {
          height: 50px;
          width: 50px;
        }

        &-btn:first-child {
          transform: rotate(-90deg);
        }

        &-btn:last-child {
          transform: rotate(-90deg);
        }

        &-line {
          height: 30px;
          width: 2px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    &-titleBlock {
      padding: 24px 0;

      &-description {
        font-size: 18px;
      }

      &-title {
        font-size: 30px;
      }
    }

    &-slider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-gap: 70px;

      padding: 55px 0;

      &-preview {
        height: 280px;
      }

      &-title {
        font-size: 38px;
        margin-bottom: 30px;
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
        justify-content: center;
        flex-direction: row;
        grid-column: 1;
        grid-gap: 12px;
    
        &-btn svg {
          height: 50px;
          width: 50px;
        }

        &-btn:first-child {
          transform: rotate(-90deg);
        }

        &-btn:last-child {
          transform: rotate(-90deg);
        }

        &-line {
          height: 30px;
          width: 2px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-titleBlock {
      padding: 20px 0;

      &-description {
        font-size: 16px;
      }

      &-title {
        font-size: 26px;
      }
    }

    &-slider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-gap: 50px;

      padding: 55px 0;

      &-preview {
        height: 220px;
      }

      &-title {
        font-size: 32px;
        margin-bottom: 30px;
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
        justify-content: center;
        flex-direction: row;
        grid-column: 1;
        grid-gap: 12px;
    
        &-btn svg {
          height: 50px;
          width: 50px;
        }

        &-btn:first-child {
          transform: rotate(-90deg);
        }

        &-btn:last-child {
          transform: rotate(-90deg);
        }

        &-line {
          height: 30px;
          width: 2px;
        }
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
