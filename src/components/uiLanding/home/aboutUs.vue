<template>
  <section class="aboutUs landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="aboutUs-title">
        <span class="blue" data-aos="zoom-in">Новые люди - </span>
        <span data-aos="zoom-in">новые возможности!</span> 
      </h2>
      <p class="aboutUs-description" data-aos="zoom-in">
        Партия Respublica – это МЕТА-партия. Мы нацелены на структурные преобразования во всех сферах общественной жизни. Мы являемся людьми нового Казахстана, цифровыми номадами!
        <br>
        <br>
        Алға, Қазақстан! Алға, Respublica!
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
            <RouterLink :to="item.link" class="aboutUs-item-link">
              <span>{{ item.btn }}</span>
            </RouterLink>
          </div>
        </div>

        <div class="aboutUs-links">
          <Router-link
            to="/news-all"
            class="aboutUs-links-item"
          >
            <span>Новости</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <button
            v-for="item of btnList"
            :key="item.title"
            @click="item.func"
            class="aboutUs-links-item"
          >
            <span>{{ item.title }}</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Emits {
  (event: 'showJoinPartyModal', value: Function): void,
  (event: 'showSubmitAnAppeal', value: Function): void,
  (event: 'showMakeAnAppointment', value: Function): void,
}

const emits = defineEmits<Emits>()

const btnList = [
  {
    title: 'Вступить в партию',
    func: () => emits('showJoinPartyModal')
  },
  {
    title: 'Направить обращение',
    func: () => emits('showSubmitAnAppeal')
  },
  {
    title: 'Записаться на прием',
    func: () => emits('showMakeAnAppointment')
  }
]

const aboutUsList = [
  {
    title: 'Что мы делаем',
    text: `
      Партия Respublica – это партия людей дела. Мы опытные и эффективные управленцы, лидеры с опытом преодоления преград и решения сложных задач.<br>
      Мы связываем свое будущее с Казахстаном.
    `,
    btn: 'Узнать больше',
    link: '/about-party'
  },
  {
    title: 'Кто мы',
    text: `
      Мы не чиновники.<br>
      Мы – созидатели. Каждый из нас создает тысячи рабочих мест. За каждым – личная история успеха и помощь множеству сограждан найти себя и обрести веру в будущее.<br>
      Мы молоды, амбициозны и сильны. С нами необходимо считаться, мы создаем тысячи рабочих мест, мы платим налоги.
    `,
    btn: 'Узнать больше',
    link: '/about-party'
  },
  {
    title: 'Внесите свой вклад',
    text: `
      На территории всей страны у партии Respublica есть филиалы и действуют депутаты в Мажилисе Парламента и маслихатах всех уровней.<br>
      Ваша поддержка будет направлена на организацию работы на местах, усилия по защите избирателей и другие приоритеты.
    `,
    btn: 'Нажмите здесь, чтобы сделать пожертвование',
    link: '/donations'
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

    & span.blue {
      color: var(--accent-color);
      font-family: 'Montserrat';
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

      &:hover {
        & span::after {
          left: 10px;
        }
      }

      & span {
        color: var(--accent-color);
        font-size: 20px;
        font-weight: 600;
        line-height: 1;

        &::after {
          content: ' \2192';

          position: relative;
          top: 3px;
          left: 0;

          transition: all .3s ease-in-out;
        }
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
    align-items: flex-start;
    grid-gap: 25px;

    padding: 10px 0 20px 40px;
    border-left: 2px solid var(--accent-color);

    &-item {
      display: inline-flex;
      align-items: center;
      grid-gap: 7px;

      position: relative;

      &::after {
        content: '';

        display: block;
        width: 0;
        height: 0;

        position: absolute;
        top: 100%;
        left: 0;
        z-index: 2;

        border-bottom: 3.6px solid var(--accent-color);
        transition: all .3s ease-in-out;
      }

      &:hover {
        &::after {
          width: 100%;
        }

        & svg {
          right: -8px;
          bottom: 3px;
        }
      }

      & span {
        color: var(--accent-color);
        font-size: 28px;
        font-weight: 600;
        line-height: 1.8;
        text-wrap: nowrap;
      }

      & svg {
        height: 32px;
        width: 32px;
        fill: var(--accent-color);

        position: relative;
        right: 0;
        bottom: 0;
        transition: all .3s ease-in-out;
      }
    }
  }

}
</style>