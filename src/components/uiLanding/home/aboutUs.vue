<template>
  <section class="aboutUs landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="aboutUs-title">
        <span>Новые люди</span> новые возможности!
      </h2>
      <p class="aboutUs-description">
        Партия Respublica – это МЕТА-партия. Мы нацелены на структурные преобразования во всех сферах общественной жизни. Мы являемся людьми нового Казахстана, цифровыми номадами!
      </p>

      <div class="aboutUs-inner">
        <div class="aboutUs-items">
          <div
            class="aboutUs-item"
            v-for="item of aboutUsList"
            :key="item.title"
          >
            <h4 class="aboutUs-item-title">{{ item.title }}</h4>
            <p class="aboutUs-item-description" v-html="item.text"></p>
            <RouterLink to="/" class="aboutUs-item-link">
              <span>{{ item.btn }} &#8594;</span>
            </RouterLink>
          </div>
        </div>

        <div class="aboutUs-links">
          <Router-link to="/news" class="aboutUs-links-item">
            <span>Новости</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <Router-link to="/" class="aboutUs-links-item">
            <span>Вступить в партию</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <Router-link to="/" class="aboutUs-links-item red">
            <span>Направить обращение</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>
          
          <Router-link to="/news" class="aboutUs-links-item">
            <span>Записаться на прием</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

let aboutUsList = [
  {
    title: 'Что мы делаем',
    text: 'Партия Respublica – это партия людей дела. Мы опытные и эффективные управленцы, лидеры с опытом преодоления преград и решения сложных задач.\n\n Мы связываем свое будущее с Казахстаном.',
    btn: 'Узнать больше',
  },
  {
    title: 'Кто мы',
    text: 'Мы не чиновники. Мы – созидатели. Каждый из нас создает тысячи рабочих мест. За каждым – личная история успеха и помощь множеству сограждан найти себя и обрести веру в будущее. Мы молоды, амбициозны и сильны. С нами необходимо считаться, мы создаем тысячи рабочих мест, мы платим налоги.',
    btn: 'Узнать больше',
  },
  {
    title: 'Внесите свой вклад',
    text: 'На территории всей страны у партии Respublica есть филиалы и действуют депутаты в Мажилисе Парламента и маслихатах всех уровней. Ваша подержка будет направлена на организацию работы на местах, усилия по защите избирателей и другие приоритеты.',
    btn: 'Нажмите здесь, чтобы сделать пожертвование',
  }
]
</script>

<style scoped lang="scss">
.aboutUs {
  margin-top: 70px;

  &-title {
    text-align: center;
    font-family: 'Montserrat';
    text-transform: uppercase;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 30px;

    & span {
      color: var(--accent-color);
    }
  }
  &-description {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 60px;
  }

  &-inner {
    display: flex;
    grid-gap: 42px;
  }

  &-items {
    display: flex;
    grid-gap: 42px;
  }

  &-item {
    max-width: 318px;
    &-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &-description {
      font-size: 20px;
      line-height: 1.4;
      margin-bottom: 10px;
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

  &-links {
    height: fit-content;
    
    display: flex;
    flex-direction: column;
    grid-gap: 25px;

    padding: 10px 0 20px 40px;
    border-left: 2px solid var(--accent-color);

    &-item {
      display: inline-flex;
      align-items: center;
      grid-gap: 7px;

      &.red {
        & span {
          color: var(--red-color);
        }

        & svg {
          fill: var(--red-color);
        }
      }

      & span {
        color: var(--accent-color);
        font-size: 28px;
        font-style: normal;
        font-weight: 600;
        line-height: 1.8;
        text-wrap: nowrap;
      }

      & svg {
        height: 32px;
        width: 32px;
        fill: var(--accent-color);
      }
    }
  }

}
</style>