<template>
  <section class="aboutUs landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="aboutUs-title">
        <span>Мы</span> Демократическая партия.
      </h2>
      <p class="aboutUs-description">Мы боремся за более светлое и равноправное будущее: закатываем рукава и организуемся повсюду, чтобы построить лучшую Америку для всех.</p>

      <div class="aboutUs-inner">
        <div class="aboutUs-items">
          <div
            class="aboutUs-item"
            v-for="item of aboutUsList"
            :key="item.title"
          >
            <h4 class="aboutUs-item-title">{{ item.title }}</h4>
            <p class="aboutUs-item-description">{{ item.text }}</p>
            <RouterLink to="/" class="aboutUs-item-link">
              <span>{{ item.btn }}</span>
              <SvgIcon
                name="double-arrow-right"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </RouterLink>
          </div>
        </div>

        <div class="aboutUs-links">
          <Router-link to="/" class="aboutUs-links-item">
            <span>События</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <Router-link to="/" class="aboutUs-links-item">
            <span>Все новости</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <Router-link to="/" class="aboutUs-links-item red">
            <span>Действовать</span>
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
    text: 'DNC стремится развивать наши победы в 2020 и 2022 годах. Мы прилагаем все усилия, чтобы избирать демократов вверх и вниз в бюллетенях, расширяя возможности активистов на низовом уровне, мобилизуя избирателей и организуясь в каждом почтовом индексе.',
    btn: 'Узнать больше',
  },
  {
    title: 'Байден-Харрис демократы',
    text: 'Президент Байден работает над тем, чтобы сделать Америку лучше, инвестируя в средний класс и сокращая расходы для работающих семей. Вместе мы построим нашу экономику снизу вверх и от середины к краю.',
    btn: 'Узнать больше',
  },
  {
    title: 'Пожертвуйте, чтобы помочь избранным демократам',
    text: 'DNC - единственный партийный комитет, ответственный за избрание демократов на всех уровнях по всей стране. Ваша поддержка будет направлена ​​на организацию на местах, усилия по защите избирателей и многое другое.',
    btn: 'Нажмите здесь, чтобы сделать пожертвование ',
  }
]
</script>

<style scoped lang="scss">
.aboutUs {
  &-title {
    text-align: center;
    font-family: 'Montserrat';
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
      }

      & svg {
        height: 42px;
        width: 42px;
        fill: var(--accent-color);
      }
    }
  }

}
</style>