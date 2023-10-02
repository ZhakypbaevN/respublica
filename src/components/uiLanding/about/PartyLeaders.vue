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
            <a class="management-preview-link" href="">
              <SvgIcon
                name="instagram-light"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </a>
          </div>
            
          <h4 class="management-title">{{ lider.fullName }}</h4>
          <p class="management-descriptoin">{{ lider.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const list = [
  {
    img: '/img/liders/Rectangle 4507.jpg',
    fullName: 'Ходжаназаров Айдарбек',
    instagram: '',
    description: `
      Депутат Мажилиса Парламента Республики Казахстан Член Комитета по аграрным вопросам\n
      Руководитель партийной фракции
    `
  },
  {
    img: '/img/liders/Rectangle 4509.jpg',
    fullName: 'Бейбит Алибеков',
    instagram: '',
    description: `
      Сопредседатель партии\n
      Владелец медиа олдинга и издательства Blackberry\n
      Блогер, основатель «Astana Watch Club»
    `
  },
  {
    img: '/img/liders/Rectangle 4511.jpg',
    fullName: 'Максим Барышев',
    instagram: '',
    description: `
    Сопредседатель партии\n
    Председатель регионального совета Национальной палаты предпринимателей «Атамекен» по городу Алматы\n
    Основатель группы компаний "Учёт"
    `
  },
  {
    img: '/img/liders/Rectangle 4514.jpg',
    fullName: 'Руслан Берденов',
    instagram: '',
    description: `
      Сопредседатель партии\n
      Депутат Мажилиса Парламента Республики Казахстан Член Комитета по финансам и бюджету
    `
  },
  {
    img: '/img/liders/Rectangle 4508.jpg',
    fullName: 'Нурлан Коянбаев',
    instagram: '',
    description: `
      Сопредседатель партии\n
      Продюсер, актер, телеведущий
    `
  },
  {
    img: '/img/liders/Rectangle 4510.jpg',
    fullName: 'Сырымбек Тау',
    instagram: '',
    description: `
      Сопредседатель партии\n
      Президент компании «Daco Motors Kazakhstan»
    `
  },
  {
    img: '/img/liders/Rectangle 4512.jpg',
    fullName: 'Куаныш Шонбай',
    instagram: '',
    description: `
      Сопредседатель партии\n
      Основатель группы компаний «Shonbay Inc»
    `
  },
  {
    img: '/img/liders/Rectangle 4513.jpg',
    fullName: 'Динара Шукижанова',
    instagram: '',
    description: `
      Сопредседатель партии\n
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
    width: 330px;
    padding-top: 88%;
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