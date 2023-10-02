<template>
  <section class="landing-block" id="who-are-we">
    <div class="wrapper">
      <h2 class="landing-title" id="aboutUs">Кто мы?</h2>

      <div class="icon-items">
        <div class="icon-item">
          <SvgIcon name="respublica-logo" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">RESPUBLICA</span>
            <span class="icon-item-text">
              В переводе с латинского – общее, общественное, государственное дело. Мы нацелены на структурные преобразования во всех сферах жизни общества
            </span>
          </div>
        </div>

        <div class="icon-item">
          <SvgIcon name="equal-representatives" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">НАШИ ПРИОРИТЕТЫ</span>
            <ul>
              <li><span class="icon-item-text">· Образованная нация</span></li>
              <li><span class="icon-item-text">· Счастье быть здоровым</span></li>
              <li><span class="icon-item-text">· Казахстанская культура – основа счастливого общества</span></li>
              <li><span class="icon-item-text">· Благополучные казахстанцы</span></li>
              <li><span class="icon-item-text">· Отказ от устаревших шаблонов</span></li>
            </ul>
          </div>
        </div>
        <div class="icon-item">
          <SvgIcon name="metaparty" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">МЕТАПАРТИЯ</span>
            <span class="icon-item-text">
              Цифровые номады, люди Нового Казахстана, жители центральной Евразии, ощущающие свою принадлежность к Европе и Азии
            </span>
          </div>
        </div>




        <div class="icon-item">
          <SvgIcon name="businessman" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">НАШИ ЛИДЕРЫ</span>
            <span class="icon-item-text">
              Опытные и эффективные управленцы, за каждым - своя история успеха
            </span>
          </div>
        </div>

        <div class="icon-item">
          <SvgIcon name="businessman" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">НАШИ ЗАДАЧИ</span>
            <span class="icon-item-text">
              Достижения нашей страны не должны оставаться в речах политиков. Они должны напрямую отражаться на жизни каждого казахстанца. Пришло время стать счастливыми.
            </span>
          </div>
        </div>
        <div class="icon-item">
          <SvgIcon name="marker" :viewboxWidth="60" :viewboxHeight="60" />
          <div class="icon-item-description">
            <span class="icon-item-title">ВСЕ РЕГИОНЫ И РАЙОНЫ</span>
            <span class="icon-item-text">
                Каждый город и поселок этой огромной страны: филиалы, депутаты, активисты
            </span>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.icon-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
}

.icon-item {
  display: flex;
  align-items: flex-start;

  svg {
    width: 60px;
  }

  &-description {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    width: 550px;

  }

  &-title {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 700;
  }

  &-text {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 400;
  }
}
</style>