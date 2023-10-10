<template>
  <section class="respublicaJastary landing-block" id="respublica-jastary">
    <div class="wrapper">
      <h2 class="landing-title">Respublica Jastary</h2>

      <div class="respublicaJastary-inner">
        <div class="respublicaJastary-preview first">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img"></div>
        </div>

        <p class="respublicaJastary-text">
          Партия Respublica создает молодежное объединение <br>
          Партия Respublica на внеочередном III съезде приняла решение о создании молодежного объединения «Respublica Jastary». Это движение объединит молодых людей в возрасте от 18 до 35 лет с активной гражданской позицией, занимающихся наукой, спортом, творчеством, предпринимательством и другими направлениями деятельности.<br>
          Как отметил председатель партии Айдарбек Ходжаназаров, это очень важное решение. В ходе посещения регионов партийцы встречают огромное количество молодых людей, желающих присоединиться к партии и внести свой вклад в развитие страны. Он подчеркнул, что для партии большая честь быть причастными к становлению неравнодушных людей с активной гражданской позицией.
        </p>

        <div class="respublicaJastary-preview second">
          <div class="respublicaJastary-preview-img bg-cover withZoomPreview-preview-img"></div>
        </div>

        <p class="respublicaJastary-text second">
          Цели молодежного объединения, по словам активиста Мухтара Баймагулова, включают формирование патриотического чувства через популяризацию национальных ценностей, объединение молодежи для реализации предвыборной программы партии и участие в реализации государственной молодежной политики. Объединение также займется формированием молодежного резерва для выдвижения в депутаты маслихатов всех уровней и Мажилиса Парламента. <br>
          Партия Respublica ставит перед собой задачи обеспечить равные условия для реализации молодых талантов в регионах, защищать права и интересы молодежи, укреплять семейные ценности и способствовать активному участию молодых людей в государственном управлении.<br>
          На съезде определены направления работы молодежного объединения «Respublica jastary», включая профилактику и снижение рисков от увлечения азартными играми и лотереями, создание равного инклюзивного общества для всех, борьбу с наркотиками, пропаганду здорового образа жизни, чтения и образования.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.respublicaJastary {
  &-inner {
    display: grid;
    grid-template-columns: 380px 1fr 350px;
    grid-gap: 40px;
  }

  &-preview {

    &-img {
      height: 100%;
    }
    &.first {
      grid-row: 1/3;
    }
  }

  &-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;

    &.second {
      grid-column: 2/4;
    }
  }
}
</style>