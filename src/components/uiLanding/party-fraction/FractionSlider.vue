<template>
  <div class="fractionSlider">
    <div class="fractionSlider-items">
      <div
        class="fractionSlider-itemBlock"
        v-for="(fraction, idx) of fractionList"
        :key="fraction.fullName"
      >
        <div class="fractionSlider-item" v-if="idx == showSlider">
          <div class="fractionSlider-item-preview withZoomPreview-preview">
            <div
              class="fractionSlider-item-preview-img withZoomPreview-preview-img"
              :style="`background-image:url('${fraction.img}');`"
            />
          </div>

          <div class="fractionSlider-item-content">
            <h2 class="fractionSlider-item-content-title">{{ fraction.fullName }}</h2>
            <p class="fractionSlider-item-content-subtitle" v-html="fraction.description"></p>

            <div class="fractionSlider-item-content-social">
              <a
                class="facebook"
                :href="fraction.facebook"
                target="_blank"
              >
                <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
              </a>

              <a
                class="instagram"
                :href="fraction.instagram"
                target="_blank"
              >
                <SvgIcon name="instagram-line-light" :viewboxHeight="44" :viewboxWidth="44" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fractionSlider-bottom">
      <div class="fractionSlider-bottom-control">
        <button
          class="fractionSlider-bottom-control-btn"
          @click="prevSlide"
        >
          <SvgIcon
            name="arrow-top-white-whith-line"
            :viewboxWidth="65"
            :viewboxHeight="65"
          />
        </button>
        <div class="fractionSlider-bottom-control-line"></div>
        <button
          class="fractionSlider-bottom-control-btn"
          @click="nextSlide"
        >
          <SvgIcon
            name="arrow-bottom-white-whith-line"
            :viewboxWidth="65"
            :viewboxHeight="65"
          />
        </button>
      </div>
      
      <p class="fractionSlider-bottom-count">{{ showSlider + 1 }} / {{ fractionList.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const fractionList = [
    {
      fullName: t('composition-of-faction.hodzhanazarov.full-name'),
      description: t('composition-of-faction.hodzhanazarov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-4.png',
      facebook: 'https://www.facebook.com/aidarbek',
      instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ=',
    },
    {
      fullName: t('composition-of-faction.berdenov.full-name'),
      description: t('composition-of-faction.berdenov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-6.png',
      facebook: 'https://www.facebook.com/ruslan.berdenov?mibextid=LQQJ4d',
      instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ==',
    },
    {
      fullName: t('composition-of-faction.nurgul.full-name'),
      description: t('composition-of-faction.nurgul.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-1.png',
      facebook: 'https://www.facebook.com/nurgul.ttt?mibextid=LQQJ4d',
      instagram: 'https://instagram.com/nurgul_tau?igshid=NTc4MTIwNjQ2YQ==',
    },
    {
      fullName: t('composition-of-faction.naumova.full-name'),
      description: t('composition-of-faction.naumova.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-5.png',
      facebook: 'https://www.facebook.com/profile.php?id=100048126368212&mibextid=LQQJ4d',
      instagram: 'https://instagram.com/_naumova_dinara?igshid=NTc4MTIwNjQ2YQ==',
    },
    {
      fullName: t('composition-of-faction.kuspenov.full-name'),
      description: t('composition-of-faction.kuspenov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-2.png',
      facebook: 'https://www.facebook.com/olzhas.kuspekov',
      instagram: 'https://www.instagram.com/kuspekov_olzhas/',
    },
    {
      fullName: t('composition-of-faction.koshmambetov.full-name'),
      description: t('composition-of-faction.koshmambetov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-7.png',
      facebook: 'https://www.facebook.com/a.koshmambetov?mibextid=YMEMSu',
      instagram: 'https://www.instagram.com/koshmambetov?igsh=MTNlOGZ5eTVwZGFoYQ==',
    }
  ];

  const showSlider = ref(0);

  const prevSlide = () => {
    if (showSlider.value > 0) showSlider.value--;
    else showSlider.value = fractionList.length - 1;
  }

  const nextSlide = () => {
    if (showSlider.value < fractionList.length - 1) showSlider.value++;
    else showSlider.value = 0;
  }
</script>

<style scoped lang="scss">
.fractionSlider{
  display: none;

  &-item {
    display: grid;
    align-items: center;
    grid-template-columns: 200px 1fr;
    grid-gap: 40px;

    &-preview {
      &-img {
        width: 100%;
        padding-bottom: 138%;
      }
    }

    &-content {
      &-title {
        color: var(--accent-color);
        font-size: 24px;
        font-weight: 700;

        margin-bottom: 6px;
      }
  
      &-subtitle {
        font-size: 16px;
        margin-bottom: 28px;
      }
  
      &-social {
        display: flex;
        grid-gap: 20px;
        
        & a {
          display: block;
          border-radius: 100px;
          background-color: white;
  
          & svg {
            height: 32px;
            width: 32px;
          }
        }
  
        & a.facebook svg {
          fill: var(--primary-color);
        }
  
        & a.instagram {
          background-color: var(--accent-color);
        }
      }
    }
  }

  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 20px;
    background-color: var(--primary-color);

    &-control {
      display: flex;
      align-items: center;
      grid-gap: 8px;
  
      &-btn svg {
        height: 40px;
        width: 40px;
  
        fill: white;
      }

      &-btn:first-child {
        transform: rotate(-90deg);
      }

      &-btn:last-child {
        transform: rotate(-90deg);
      }

      &-line {
        height: 22px;
        width: 1.4px;

        background-color: rgba(white, .6);
      }
    }

    &-count {
      color: white;
      margin-bottom: 0;
    }
  }

  // Adaptation
  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 576px) {
    &-item {
      grid-template-columns: 140px 1fr;
      grid-gap: 20px;

      &-content {
        &-title {
          font-size: 18px;
          margin-bottom: 6px;
        }
    
        &-subtitle {
          font-size: 16px;
          margin-bottom: 18px;
        }
    
        &-social {
          grid-gap: 20px;
          
          & a svg {
            height: 28px;
            width: 28px;
          }
        }
      }
    }

    &-bottom {
      padding: 10px 14px;

      &-control {
        grid-gap: 6px;
    
        &-btn svg {
          height: 34px;
          width: 34px;
        }

        &-line {
          height: 20px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-item {
      display: flex;
      position: relative;

      &-preview {
        width: 100%;
        max-width: 280px;
      }

      &-content {
        width: 100%;
        max-width: 260px;
        
        position: absolute;
        bottom: 20px;
        right: -2px;
        
        padding: 10px;
        background-color: var(--primary-color-op80);

        &-title {
          font-size: 18px;
          margin-bottom: 6px;
        }
    
        &-subtitle {
          color: white;
          font-size: 14px;
          margin-bottom: 18px;
        }
    
        &-social {
          grid-gap: 20px;
          
          & a svg {
            height: 28px;
            width: 28px;
          }
        }
      }
    }

    &-bottom {
      padding: 10px 14px;

      &-control {
        grid-gap: 6px;
    
        &-btn svg {
          height: 34px;
          width: 34px;
        }

        &-line {
          height: 20px;
        }
      }
    }
  }
}
</style>