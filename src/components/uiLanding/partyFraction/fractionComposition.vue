<template>
  <section class="fractionComposition landing-block" id="fraction-composition">
    <div class="wrapper">
      <h2 class="landing-title">Состав фракции партии RESPUBLICA</h2>
   
      <div class="fraction-items">

                          
          <div
            class="fraction-item"
            v-for="fraction of fractionList"
          >
              <div class="fraction-item-preview withZoomPreview-preview">
                <div class="fraction-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url('${fraction.img}');`"></div>
              </div>
              
              <h4 class="fraction-item-name">{{ fraction.fullName }}</h4>
              <div class="fraction-item-description">
                <div class="fraction-item-description-text">Член Комитета по экономической реформе и региональному развитию</div>
                <div class="fraction-item-social">
                  <a :href="fraction.facebook" target="_blank"
                    class="header-top-snList-item">
                    <SvgIcon name="facebook-line-blue" :viewboxHeight="44" :viewboxWidth="44" />
                  </a>

                  <a :href="fraction.instagram" target="_blank"
                    class="header-top-snList-item">
                    <SvgIcon name="instagram-line-blue" :viewboxHeight="44" :viewboxWidth="44" />
                  </a>
                </div>
              </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fractionList = [
  {
    fullName: 'ХОДЖАНАЗАРОВ Айдарбек',
    description: `
      Руководитель фракции.<br>
      Член Комитета по аграрным вопросам
    `,
    img: '/img/uiLanding/fraction/khodzhanazarov.jpg',
    facebook: 'https://www.facebook.com/aidarbek',
    instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ='
  },
  {
    fullName: 'БЕРДЕНОВ Руслан',
    description: `
      Член Комитета по финансам и бюджету
    `,
    img: '/img/uiLanding/fraction/berdenov.jpg',
    facebook: 'https://www.facebook.com/ruslan.berdenov?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    fullName: 'КУСПЕКОВ Олжас',
    description: `
      Член Комитета по международным делам, обороне и безопасности
    `,
    img: '/img/uiLanding/fraction/kuspekov.jpg',
    facebook: 'https://www.facebook.com/olzhas.kuspekov',
    instagram: 'https://www.instagram.com/kuspekov_olzhas/'
  },
  {
    fullName: 'НАУМОВА Динара',
    description: `
      лен Комитета по законодательству и судебно-правовой реформе
    `,
    img: '/img/uiLanding/fraction/naumova.jpg',
    facebook: 'https://www.facebook.com/profile.php?id=100048126368212&mibextid=LQQJ4d',
    instagram: 'https://instagram.com/_naumova_dinara?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    fullName: 'ТАУ Нургуль',
    description: `
      Член Комитета по социальнокультурному развитию
    `,
    img: '/img/uiLanding/fraction/tau.jpg',
    facebook: 'https://www.facebook.com/nurgul.ttt?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/nurgul_tau?igshid=NTc4MTIwNjQ2YQ=='
  },
  {
    fullName: 'ШУКИЖАНОВА Динара',
    description: `
      Член Комитета по экономической реформе и региональному развитию
    `,
    img: '/img/uiLanding/fraction/shukizhanova.jpg',
    facebook: 'https://www.facebook.com/dika.ask?mibextid=LQQJ4d',
    instagram: 'https://instagram.com/dinarashukizhanova?igshid=NTc4MTIwNjQ2YQ=='
  }
]
</script>

<style scoped lang="scss">
.fraction {
  &-items {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(3, 1fr);
    margin: 50px 250px;
  }

  &-item {
    &-preview-img {
      padding: 48%;
    }

    &-name {
      display: block;

      color: white;
      background-color: var(--accent-color);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.4;

      padding: 9px 20px 6px;
    }

    &-description {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      grid-gap: 18px;

      background-color: white;
      padding: 10px 20px 14px;

      &-text {
        color: var(--primary-color);
        font-size: 20px;
        font-weight: 400;
        line-height: 1.2;
      }
    }

    &-social {
      display: flex;
      grid-gap: 20px;

      & a svg {
        height: 32px;
        width: 32px;
      }
    }
  }
}
</style>