<template>
  <div>
    <div class="fractionList" @mouseleave="onHandleLeave" @mouseover="onHandleHover()">
      <button
        class="fractionList-item"
        v-for="fraction of fractionList"
        :key="fraction.zIndex"
        :style="{zIndex: fraction.zIndex}"
        @mouseover="onHandleHoverFraction(fraction)"

        data-aos="fade-left"
        data-aos-duration="1200"
        :data-aos-delay="fraction.aosDelay"
      >
        <div class="fractionList-item-preview">
          <img
            class="fractionList-item-preview-img"
            :src="fraction.img"
          />
          <div class="fractionList-item-social">
            <a :href="fraction.facebook" target="_blank">
              <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
            </a>

            <a :href="fraction.instagram" target="_blank">
              <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
            </a>
          </div>
        </div>
      </button>
    </div>

    <Transition>
      <div
        v-if="showCard"
        class="cursor"
        :style="curserStyle"
      >
        <div class="cursor-content" id="cursor-content">
          <h4 class="cursor-content-name">
            {{ cardContent.fullName }}
          </h4>
          <p class="cursor-content-description" v-html="cardContent.description" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const showCard = ref(false)
  const cardContent = reactive({
    fullName: '',
    description: '',
    facebook: '',
    instagram: ''
  });

  const curserStyle = reactive({
    top: '0px',
    left: '0px'
  });

  document.addEventListener('mousemove', (e) => {
    let cursorContentStyle = document.querySelector('#cursor-content');
    
    curserStyle.top = `${e.pageY + 18}px`;
    curserStyle.left = (e.pageX > window.innerWidth / 2) ? `${e.pageX + 18 - 200}px` : `${e.pageX + 18}px`;
  });

  const onHandleHoverFraction = (fraction) => {
    cardContent.fullName = fraction.fullName;
    cardContent.description = fraction.description;
  }

  const onHandleHover = () => {
    showCard.value = true;
  }

  const onHandleLeave = () => {
    showCard.value = false;
  }

  const fractionList = [
    {
      zIndex: 6,
      fullName: t('composition-of-faction.hodzhanazarov.full-name'),
      description: t('composition-of-faction.hodzhanazarov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-1.png',
      facebook: 'https://www.facebook.com/aidarbek',
      instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ=',
      
      aosDelay: '200',
    },
    {
      zIndex: 5,
      fullName: t('composition-of-faction.berdenov.full-name'),
      description: t('composition-of-faction.berdenov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-2.png',
      facebook: 'https://www.facebook.com/ruslan.berdenov?mibextid=LQQJ4d',
      instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ==',
      
      aosDelay: '400',
    },
    {
      zIndex: 4,
      fullName: t('composition-of-faction.nurgul.full-name'),
      description: t('composition-of-faction.nurgul.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-3.png',
      facebook: 'https://www.facebook.com/nurgul.ttt?mibextid=LQQJ4d',
      instagram: 'https://instagram.com/nurgul_tau?igshid=NTc4MTIwNjQ2YQ==',
      
      aosDelay: '600',
    },
    {
      zIndex: 3,
      fullName: t('composition-of-faction.naumova.full-name'),
      description: t('composition-of-faction.naumova.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-4.png',
      facebook: 'https://www.facebook.com/profile.php?id=100048126368212&mibextid=LQQJ4d',
      instagram: 'https://instagram.com/_naumova_dinara?igshid=NTc4MTIwNjQ2YQ==',
      
      aosDelay: '800',
    },
    {
      zIndex: 2,
      fullName: t('composition-of-faction.kuspenov.full-name'),
      description: t('composition-of-faction.kuspenov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-5.png',
      facebook: 'https://www.facebook.com/olzhas.kuspekov',
      instagram: 'https://www.instagram.com/kuspekov_olzhas/',
      
      aosDelay: '1000',
    },
    {
      zIndex: 1,
      fullName: t('composition-of-faction.koshmambetov.full-name'),
      description: t('composition-of-faction.koshmambetov.post'),

      img: '/img/uiLanding/fraction/banner-peoples/fraction-people-6.png',
      facebook: 'https://www.facebook.com/a.koshmambetov?mibextid=YMEMSu',
      instagram: 'https://www.instagram.com/koshmambetov?igsh=MTNlOGZ5eTVwZGFoYQ==',
      
      aosDelay: '1200',
    }
  ]
</script>

<style scoped lang="scss">
.cursor {
  position: absolute;
  z-index: 100;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  pointer-events: none;

  &-content {
    width: 100%;
    max-width: 395px;

    display: flex;
    flex-direction: column;

    padding: 25px;
    border-bottom: 1px solid white;
    background-color: var(--primary-color);

    transition: all .3s ease-in-out;

    &-name {
      color: white;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 17px;
    }

    &-description {
      color: white;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.2;
    }
  }

  // Adaptation
  @media (max-width: 1800px) {
    &-content {
      max-width: 280px;
      padding: 14px;

      &-name {
        font-size: 16px;
        margin-bottom: 12px;
      }

      &-description {
        font-size: 14px;
      }
    }
  }
  
  @media (max-width: 1600px) {
    &-content {
      max-width: 250px;
      padding: 12px;

      &-name {
        font-size: 15px;
        margin-bottom: 11px;
      }

      &-description {
        font-size: 13px;
      }
    }
  }

  @media (max-width: 1400px) {
    &-content {
      max-width: 220px;
      padding: 10px;

      &-name {
        font-size: 14px;
        margin-bottom: 10px;
      }

      &-description {
        font-size: 12px;
      }
    }
  }

  @media (max-width: 1200px) {
    &-content {
      max-width: 180px;
      padding: 8px;

      &-name {
        font-size: 11px;
        margin-bottom: 8px;
      }

      &-description {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.fractionList {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  padding: 0 100px;

  position: relative;

  &-item {
    cursor: default;
    position: relative;
    padding-bottom: 36%;

    &:hover,
    &:focus {
      /* z-index: 10 !important; */
      & .fractionList-item {
        &-preview-img {
          -webkit-filter: grayscale(0%);
          filter: grayscale(0%);
        }

        &-social {
          opacity: 1;
          visibility: visible;
          bottom: 20px;
        }
      }
    }

    &-preview-img {
      height: 100%;

      position: absolute;
      left: 50%;
      bottom: 0;
      z-index: 1;
      transform: translateX(-50%);

      filter: grayscale(100%);
    
      transition: all .3s ease-in-out;
    }

    &-social {
      display: flex;
      grid-gap: 20px;
      
      position: absolute;
      right: -120px;
      bottom: -30px;
      z-index: 2;

      opacity: 0;
      visibility: hidden;
      transition: all .3s ease-in-out;

      & a {
        opacity: .5;
        transform: scale(1);
        transition: all .3s ease-in-out;

        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        svg {
          height: 42px;
          width: 42px;
          fill: var(--primary-color);
        }
      }
    }
  }

  // Adaptation
  @media (max-width: 1800px) {
    padding: 0 60px;

    &-item {
      &:hover,
      &:focus {
        & .fraction-item {
          &-social {
            bottom: 20px;
          }
        }
      }

      &-social {
        grid-gap: 20px;
        right: -100px;
        bottom: -30px;

        & a {
          svg {
            height: 40px;
            width: 40px;
          }
        }
      }
    }
  }
  
  @media (max-width: 1600px) {
    padding: 0 40px;

    &-item {
      &:hover,
      &:focus {
        & .fraction-item {
          &-social {
            bottom: 18px;
          }
        }
      }

      &-social {
        grid-gap: 18px;
        right: -85px;
        bottom: -20px;

        & a {
          svg {
            height: 38px;
            width: 38px;
          }
        }
      }
    }
  }

  @media (max-width: 1400px) {
    padding: 0 40px;

    &-item {
      &:hover .fraction-item-social,
      &:focus .fraction-item-social {
        bottom: 16px;
      }

      &-social {
        grid-gap: 16px;
        right: -70px;

        & a svg {
          height: 32px;
          width: 32px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 0 30px;

    &-item {
      &:hover .fraction-item-social,
      &:focus .fraction-item-social {
        bottom: 14px;
      }

      &-social {
        grid-gap: 14px;
        right: -50px;

        & a svg {
          height: 28px;
          width: 28px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>