<template>
  <div class="title">
    <span>Новости</span>
    <div>
      <RouterLink to="/news-all" class="title-link">
        <span>Смотреть все новости</span>
        <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
      </RouterLink>
    </div>
  </div>

  <div class="news-items">
    <RouterLink to="/news-in-full" class="newsSlider-item-link">
      <div class="news-item">
        <div class="news-item-img">
          <img src="/img/news.png" alt="">
          <div class="news-item-img-date">
            <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
            <span>05.08.2023</span>
          </div>
        </div>
        <div class="news-item-name">
          <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
        </div>
        <div class="news-item-line"></div>
        <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
      </div>
    </RouterLink>
    <div class="news-item">
      <div class="news-item-img">
        <img src="/img/news.png" alt="">
        <div class="news-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="news-item-name">
        <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
      </div>
      <div class="news-item-line"></div>
      <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="news-item">
      <div class="news-item-img">
        <img src="/img/news.png" alt="">
        <div class="news-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="news-item-name">
        <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
      </div>
      <div class="news-item-line"></div>
      <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="news-item">
      <div class="news-item-img">
        <img src="/img/news.png" alt="">
        <div class="news-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="news-item-name">
        <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
      </div>
      <div class="news-item-line"></div>
      <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="news-item">
      <div class="news-item-img">
        <img src="/img/news.png" alt="">
        <div class="news-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="news-item-name">
        <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
      </div>
      <div class="news-item-line"></div>
      <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="news-item">
      <div class="news-item-img">
        <img src="/img/news.png" alt="">
        <div class="news-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="news-item-name">
        <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
      </div>
      <div class="news-item-line"></div>
      <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
  </div>
</template>
<style  scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    color: #042051;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }

  &-link {
    display: inline-flex;
    align-items: center;
    grid-gap: 10px;

    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 600;
    }

    & svg {
      width: 24px;
      height: 24px;
      fill: var(--primary-color);
    }
  }

}

.news-items {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 60px 50px;
}

.news-item {

  &-img {
    width: 463px;
    height: 330px;
    position: relative;


    & img {
      width: 463px;
      height: 330px;
      border-radius: 10px;
    }

    &-date {
      display: flex;
      grid-gap: 5px;
      align-items: center;
      background-color: #042051;
      padding: 5px 15px;
      width: 137px;
      height: 30px;
      border-radius: 0px 10px;
      position: absolute;
      bottom: 0;

      & svg {
        width: 24px;
        height: 24px;
        fill: var(--white-color);
      }

      & span {
        color: var(--white-color);
      }

    }

  }

  &-name {
    margin-top: 15px;

    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 700;
    }
  }

  &-text {
    display: block;
    width: 461px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(4, 32, 81, 0.80);

  }

  &-line {
    width: 54px;
    height: 3px;
    background-color: var(--accent-color);
    margin-bottom: 15px;
    margin-top: 20px;
  }
}
</style>