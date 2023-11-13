<template>
  <section class="fractionComposition landing-block" id="fraction-composition">
    <div class="wrapper" :class="{'landing-wrapper': single}">
      <h2 v-if="single" class="landing-title center">Депутаты мажилиса</h2>
      <h2 v-else class="landing-title">Состав фракции партии RESPUBLICA</h2>
   
      <div class="fraction-items">
        <div
          class="fraction-item"
          v-for="fraction of fractionList"
          :key="fraction.zIndex"
          :style="{zIndex: fraction.zIndex}"
        >
          <div class="fraction-item-preview">
            <img
              class="fraction-item-preview-img"
              :src="fraction.img"
            />
          </div>

          <div class="fraction-item-content">
            <div class="fraction-item-content-main">
              <h4 class="fraction-item-content-name">
                {{ fraction.fullName }}
              </h4>
              <p class="fraction-item-content-description" v-html="fraction.description" />
            </div>

            <div class="fraction-item-content-social">
              <a :href="fraction.facebook" target="_blank">
                <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
              </a>

              <a :href="fraction.instagram" target="_blank">
                <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  single?: boolean,
}

withDefaults(defineProps<IProps>(), {
  single: false
})

const fractionList = [
  {
    zIndex: 6,
    fullName: 'ХОДЖАНАЗАРОВ Айдарбек',
    description: `
      Руководитель фракции. <br>Член Комитета по аграрным вопросам
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-1.png',
    facebook: 'https://www.facebook.com/aidarbek',
    instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ='
  },
  {
    zIndex: 5,
    fullName: 'БЕРДЕНОВ Руслан',
    description: `
      Член Комитета по финансам и бюджету
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-2.png',
    facebook: 'https://www.facebook.com/ruslan.berdenov?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 4,
    fullName: 'КУСПЕКОВ Олжас',
    description: `
      Член Комитета по международным делам, обороне и безопасности
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-3.png',
    facebook: 'https://www.facebook.com/olzhas.kuspekov',
    instagram: 'https://www.instagram.com/kuspekov_olzhas/'
  },
  {
    zIndex: 3,
    fullName: 'НАУМОВА Динара',
    description: `
      Член Комитета по законодательству и судебно-правовой реформе
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-4.png',
    facebook: 'https://www.facebook.com/profile.php?id=100048126368212&mibextid=LQQJ4d',
    instagram: 'https://instagram.com/_naumova_dinara?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 2,
    fullName: 'ТАУ Нургуль',
    description: `
      Член Комитета по социальнокультурному развитию
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-5.png',
    facebook: 'https://www.facebook.com/nurgul.ttt?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/nurgul_tau?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    zIndex: 1,
    fullName: 'ШУКИЖАНОВА Динара',
    description: `
      Член Комитета по экономической реформе и региональному развитию
    `,
    img: '/img/uiLanding/fraction/banner-peoples/fraction-people-6.png',
    facebook: 'https://www.facebook.com/dika.ask?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/dinarashukizhanova?igshid=NTc4MTIwNjQ2YQ=='
  }
]
</script>

<style scoped lang="scss">
.fraction {
  &-items {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    padding: 0 50px;
  }

  &-item {
    padding-bottom: 36%;
    position: relative;

    &:hover {
      z-index: 10 !important;
      & .fraction-item {
        &-preview-img {
          -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
          filter: grayscale(0%);
        }

        &-content {
          opacity: 1;
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

      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
      filter: grayscale(100%);
    
      transition: all .3s ease-in-out;
    }

    &-content {
      width: 395px;

      opacity: 0;

      display: flex;
      flex-direction: column;

      padding: 20px;
      background-color: var(--primary-color);

      position: absolute;
      left: 50%;
      bottom: -90px;
      z-index: 10;

      transform: translateX(-50%);
      transition: all .3s ease-in-out;

      &-main {
        padding-bottom: 25px;
        margin-bottom: 25px;

        border-bottom: 1px solid white;
      }

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

      &-social {
        display: flex;
        grid-gap: 20px;
  
        & a {
          opacity: .5;
          transform: scale(1);
          transition: all .3s ease-in-out;
  
          &:hover {
            opacity: 1;
            transform: scale(1.1);
          }
  
          svg {
            height: 32px;
            width: 32px;
            fill: var(--primary-color);
          }
        }
      }
    }
  }
}
</style>