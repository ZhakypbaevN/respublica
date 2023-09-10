<template>
  <div class="title">
    <span>Пресса о нас </span>
    <div>
      <RouterLink to="/press-all" class="title-link">
        <span>Смотреть все новости</span>
        <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
      </RouterLink>
    </div>
  </div>
  <div class="press-items">
    <RouterLink to="/press-in-full">
      <div class="press-item">
        <div class="press-item-img">
          <img src="/img/uiLanding/news-example.jpg" alt="">
          <div class="press-item-img-date">
            <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
            <span>05.08.2023</span>
          </div>
        </div>
        <div class="press-item-source">
          <span class="">kazinform.kz</span>
        </div>
        <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
      </div>
    </RouterLink>
    <div class="press-item">
      <div class="press-item-img">
        <img src="/img/uiLanding/news-example.jpg" alt="">
        <div class="press-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="press-item-source">
        <span class="">kazinform.kz</span>
      </div>
      <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="press-item">
      <div class="press-item-img">
        <img src="/img/uiLanding/news-example.jpg" alt="">
        <div class="press-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="press-item-source">
        <span class="">kazinform.kz</span>
      </div>
      <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
    <div class="press-item">
      <div class="press-item-img">
        <img src="/img/uiLanding/news-example.jpg" alt="">
        <div class="press-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="press-item-source">
        <span class="">kazinform.kz</span>
      </div>
      <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>

    <div class="press-item">
      <div class="press-item-img">
        <img src="/img/uiLanding/news-example.jpg" alt="">
        <div class="press-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="press-item-source">
        <span class="">kazinform.kz</span>
      </div>
      <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>

    <div class="press-item">
      <div class="press-item-img">
        <img src="/img/uiLanding/news-example.jpg" alt="">
        <div class="press-item-img-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>05.08.2023</span>
        </div>
      </div>
      <div class="press-item-source">
        <span class="">kazinform.kz</span>
      </div>
      <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, - Р.Берденов</span>
    </div>
  </div>
</template>
<style  scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;

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

.press-items {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 75px 40px;
}

.press-item {

  &-img {
    width: 463px;
    height: 225px;
    position: relative;


    & img {
      width: 463px;
      height: 225px;
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

  &-source {
    margin-top: 18px;

    & span {
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 700;
    }
  }

  &-text {
    display: block;
    width: 461px;
    height: 48px;
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);

  }

}
</style>
