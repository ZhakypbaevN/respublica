<template>
  <section class="party-leaders landing-block" id="party-leaders">
    <div class="wrapper">
      <h2 class="landing-title">Лидеры партии</h2>
      <div class="management-items">
        <div
          class="management-item"
          v-for="lider of list"
          :key="lider.fullName"
        >
          <div class="management-preview bg-cover" :style="`background-image: url('${lider.img}');`">
            <a class="management-preview-link" :href="lider.instagram" target="_blank">
              <SvgIcon
                name="instagram-line-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
          </div>
            
          <h4 class="management-title">{{ lider.fullName }}</h4>
          <p class="management-descriptoin" v-html="lider.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const list = [
  {
    img: '/img/uiLanding/liders/khodzhanazarov.jpg',
    fullName: 'Ходжаназаров Айдарбек',

    instagram: 'https://instagram.com/a1darbek?igshid=NTc4MTIwNjQ2YQ==',
    description: `
      Депутат Мажилиса Парламента Республики Казахстан Член Комитета по аграрным вопросам.<br>
      Руководитель партийной фракции
    `
  },
  {
    img: '/img/uiLanding/liders/alibekov.jpg',
    fullName: 'Бейбит Алибеков',
    instagram: 'https://instagram.com/alibekovkz?igshid=MzRlODBiNWFlZA==',
    description: `
      Сопредседатель партии.<br>
      Владелец медиа холдинга и издательства Blackberry.<br>
      Блогер, основатель «Astana Watch Club»
    `
  },
  {
    img: '/img/uiLanding/liders/baryshev.jpg',
    fullName: 'Максим Барышев',
    instagram: 'https://instagram.com/baryshev_maxim?igshid=MzRlODBiNWFlZA==',
    description: `
    Сопредседатель партии.<br>
    Председатель регионального совета Национальной палаты предпринимателей «Атамекен» по городу Алматы.<br>
    Основатель группы компаний "Учёт"
    `
  },
  {
    img: '/img/uiLanding/liders/berdenov.jpg',
    fullName: 'Руслан Берденов',
    instagram: 'https://instagram.com/ruslan_berdenov?igshid=NTc4MTIwNjQ2YQ==',
    description: `
      Сопредседатель партии.<br>
      Депутат Мажилиса Парламента Республики Казахстан Член Комитета по финансам и бюджету
    `
  },
  {
    img: '/img/uiLanding/liders/koyanbayev.jpg',
    fullName: 'Нурлан Коянбаев',
    instagram: 'https://instagram.com/nurlankoyanbayev?igshid=MzRlODBiNWFlZA==',
    description: `
      Сопредседатель партии.<br>
      Продюсер, актер, телеведущий
    `
  },
  {
    img: '/img/uiLanding/liders/tau.jpg',
    fullName: 'Сырымбек Тау',
    instagram: 'https://instagram.com/syrymbek_tau?igshid=MzRlODBiNWFlZA==',
    description: `
      Сопредседатель партии.<br>
      Президент компании «Daco Motors Kazakhstan»
    `
  },
  {
    img: '/img/uiLanding/liders/shonbay.jpg',
    fullName: 'Куаныш Шонбай',
    instagram: 'https://instagram.com/kuantr?igshid=MzRlODBiNWFlZA==',
    description: `
      Сопредседатель партии.<br>
      Основатель группы компаний «Shonbay Inc»
    `
  },
  {
    img: '/img/uiLanding/liders/shukizhanova.jpg',
    fullName: 'Динара Шукижанова',
    instagram: 'https://instagram.com/dinarashukizhanova?igshid=NTc4MTIwNjQ2YQ==',
    description: `
      Сопредседатель партии.<br>
      Депутат Мажилиса Парламента Республики Казахстан
      Член Комитета по экономической реформе и региональному развитию
    `
  }
]
</script>

<style scoped lang="scss">
.management {
  &-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 50px;
  }

  &-preview {
    padding-top: 92%;
    background-color: var(--light-gray-color);

    margin-bottom: 15px;
    position: relative;

    &-link {
      height: 40px;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: var(--accent-color);
      border-radius: 50%;

      position: absolute;
      left: 10px;
      bottom: 10px;

      opacity: .5;
      transform: scale(1);
      transition: all .3s ease-in-out;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      & svg {
        height: 34px;
        width: 34px;
      }
    }
  }

  &-title {
    color: var(--accent-color);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>