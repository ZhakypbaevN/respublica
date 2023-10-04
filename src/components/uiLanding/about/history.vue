<template>
  <section class="landing-block" id="history">
    <div class="wrapper">
      <h2 class="landing-title" id="history">История</h2>
      <ul class="timeline">
        <li
          v-for="history of historylist"
          :key="history.date"
          class="timeline-block"
          :data-date="history.date"
        >
          <div
            class="timeline-item" 
            :class="{withOutImg: !history.img}"
          >
            <div v-if="history.img" class="timeline-item-preview withZoomPreview-preview">
              <div class="timeline-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url('${history.img}');`"></div>
            </div>
            <p class="timeline-item-content" v-html="history.text"></p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const historylist = [
  {
    date: '2022, 29 декабря',
    img: '/img/about/history/История 1 съезд (1).jpg',
    text: `
      Учредительный съезд прошел в городе Алматы 3 декабря 2022 года.<br><br>
      На съезде принято решение о создании политической партии и утверждено её название - партия «Respublica».<br><br>
      Утверждены Устав, Программа партии. Сформирован руководящий орган партии и избраны высшие руководящие лица. Избран контрольно-ревизионный орган партии. Принято решение о создании региональных филилов.<br><br>
      Председателем партии избран глава компании «Олжа Агро» Айдарбек Ходжаназаров, сопредседателями – предприниматели Бейбит Алибеков, Максим Барышев, Руслан Берденов, Нурлан Коянбаев, Сырымбек Тау, Куаныш Шонбай, Динара Шукижанова.
    `
  },
  {
    date: '2023, 18 января',
    text: `
      Общественное объединение «Партия «Respublica» зарегистрировано в Министерстве юстиции Республики Казахстан 18 января 2023 года. Начата регистрация филиалов партии.
    `
  },
  {
    date: '2023, 6 февраля',
    img: '/img/about/history/История 1 съезд (2).jpg',
    text: `
      В г.Астана прошел II съезд партии Respublica.<br><br>
      Принято решение о выдвижении кандидатов в депутаты Мажилиса Парламента Республики Казахстан восьмого созыва, избираемых по партийным спискам и по одномандатным территориальным избирательным округам.<br><br>
      Утверждена Предвыборная программа партии «Respublica».<br><br>
      Внесены изменения и дополнения в Устав партии «Respublica».
    `
  },
  {
    date: '2023, 19 марта',
    img: '/img/about/history/История - выборы.jpg',
    text: `
      По итогам внеочередных выборов депутатов Мажилиса Парламента VIII созыва партия «Respublica» набрала 8,59% голосов избирателей и получила шесть мандатов в нижней палате.<br><br>
      Фракция партии «Respublica» зарегистрирована Постановлением Бюро Мажилиса Парламента Республики Казахстан.<br><br>
      Решением Собрания партии «Respublica» утвержден список депутатов Фракции.<br><br>
      В состав фракции вошли депутаты Ходжаназаров А.А., Берденов Р.А., Куспеков О.Х, Наумова Д.Р., Тау Н., Шукижанова Д.А.<br><br>
      На первом заседании депутатов – членов фракции руководителем фракции избран Председатель партии «Respublica» Ходжаназаров А.А.<br><br>
      В маслихаты всех уровней от партии «Respublica» избрано 56 депутатов.
    `
  },
  {
    date: '2023, 29 июля',
    img: '/img/about/history/История 3 съезд.jpg',
    text: `
      Внеочередной выездной III съезд партии состоялся 29 июля 2023 года в поселке Бурабай Акмолинской области.<br><br>
      Решением съезда внесены изменения в Устав партии, утверждены новый состав Центрального совета партии, Правила и состав контрольно-ревизионной комиссии, принято решение о создании молодежного объединения «Respublica jastary».
    `
  }
]

</script>
<style scoped lang="scss">
.timeline {
  padding-left: 260px;
}

.timeline {
  &-block {
    text-align: center;
    font-size: 1.4rem;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-left: 1px solid #4A78EC;

    position: relative;
    list-style-type: none;
    --item-width: calc(100%);

    &::after {
      content: attr(data-date);
      position: absolute;
      right: calc(var(--item-width) + 40px);
      color: #4A78EC;
      font-size: 23px;
      top: -10px;
      font-weight: 700;
      float: right;
      white-space: nowrap;
    }

    &::before {
      content: "";
      border-radius: 50%;
      width: 13px;
      height: 13px;
      background-color: #4A78EC;
      position: absolute;
      left: -7px;
      top: 0px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &-block:last-of-type {
    padding-bottom: 0px !important;
  }
  
  &-item {
    max-width: 1120px;
    
    display: grid;
    grid-template-columns: 225px 1fr;
    align-items: flex-start;
    grid-gap: 30px;
    
    padding: 30px;
    margin-top: -25px;
    
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;

    &.withOutImg {
      grid-template-columns: 1fr;
    }
  
    &-preview-img {
      padding-bottom: 70%;
    }

    &-content {
      /* text-indent: 40px; */
      text-align: left;
      color: #042051;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
    }

  }
}
</style>