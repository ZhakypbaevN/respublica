<template>
  <section class="newsSlider landing-block">
    <div class="wrapper landing-wrapper">
      <div class="title-wrapper">
        <h2 class="landing-title">Новости</h2>
      <RouterLink to="/news-all" class="newsSlider-item-link">
              <span>Смотреть все</span>
              <SvgIcon
                name="double-arrow-right"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </RouterLink>
      </div>


      <div class="newsSlider-items">
        <div class="newsSlider-item">
          <div class="newsSlider-item-preview"></div>
          <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

          <div class="newsSlider-item-line"></div>

          <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.</p>
          <div class="newsSlider-item-bottom">
            <div class="newsSlider-item-date">
              <SvgIcon
                name="calendar-check"
                :viewboxWidth="28"
                :viewboxHeight="28"
              />
              <span>12:30, 5 июля 2023</span>
            </div>

            <RouterLink to="/" class="newsSlider-item-link">
              <span>Далее</span>
              <SvgIcon
                name="double-arrow-right"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </RouterLink>
          </div>
        </div>


        <div class="newsSlider-item">
          <div class="newsSlider-item-preview"></div>
          <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

          <div class="newsSlider-item-line"></div>

          <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.</p>
          <div class="newsSlider-item-bottom">
            <div class="newsSlider-item-date">
              <SvgIcon
                name="calendar-check"
                :viewboxWidth="28"
                :viewboxHeight="28"
              />
              <span>12:30, 5 июля 2023</span>
            </div>

            <RouterLink to="/" class="newsSlider-item-link">
              <span>Далее</span>
              <SvgIcon
                name="double-arrow-right"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </RouterLink>
          </div>
        </div>


        <div class="newsSlider-item">
          <div class="newsSlider-item-preview"></div>
          <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

          <div class="newsSlider-item-line"></div>

          <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.</p>
          <div class="newsSlider-item-bottom">
            <div class="newsSlider-item-date">
              <SvgIcon
                name="calendar-check"
                :viewboxWidth="28"
                :viewboxHeight="28"
              />
              <span>12:30, 5 июля 2023</span>
            </div>

            <RouterLink to="/" class="newsSlider-item-link">
              <span>Далее</span>
              <SvgIcon
                name="double-arrow-right"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.title-wrapper {
  display: flex;
  justify-content: space-between;
}
.newsSlider {
  &-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }
  &-item {
    &-preview {
      background-color: var(--accent-color);
      padding-bottom: 55%;
      margin-bottom: 15px;

      background: url('/img/uiLanding/news-example.jpg') center no-repeat;
      background-size: cover;
    }

    &-title {
      font-size: 20px;
      font-weight: 500;

      margin-bottom: 25px;
    }

    &-line {
      width: 54px;
      height: 3px;

      background-color: var(--accent-color);
      margin-bottom: 15px;
    }

    &-description {
      font-size: 20px;
      line-height: 1.5;
      margin-bottom: 15px;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-date {
      display: flex;
      grid-gap: 5px;

      padding: 5px 10px;
      border-radius: 3px;
      border: 1px solid rgba(129, 143, 167, 0.50);

      & svg {
        width: 28px;
        height: 24px;
        fill: var(--accent-color);
      }

      & span {
        color: var(--light-gray-color);
        font-size: 16px;
        font-weight: 500;
      }
    }

    &-link {
      display: inline-flex;
      align-items: center;
      grid-gap: 10px;

      & span {
        color: var(--accent-color);
        font-size: 20px;
        font-weight: 600;
        line-height: 1;
      }

      & svg {
        width: 24px;
        height: 24px;
        fill: var(--accent-color);
      }
    }
  }
}
</style>