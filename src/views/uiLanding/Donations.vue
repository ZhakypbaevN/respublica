<template>
  <div class="wrapper-main">
    <Header />
    <div class="content">
      <div class="donations">
        <div class="donations-left-text">
          <div class="donations-left-text-title">
            Сделайте пожертвование, чтобы проголосовать за демократов по всей стране
          </div>
          <div class="donations-left-text-description">
            Демократическая партия рассчитывает на вашу поддержку в борьбе за повестку дня
            Байдена-Харриса, привлечении к ответственности Республиканской партии и
            избрании большего числа демократов по всей стране.
          </div>

          <div class="donations-left-text-description">
            Сделайте пожертвование DNC сегодня, чтобы инвестировать в организацию на
            местах, общенациональные усилия по защите избирателей и многое другое, на что
            наши кандидаты полагаются, чтобы конкурировать и побеждать в каждом почтовом
            индексе.
          </div>
        </div>
        <div class="donations-right-block">
          <div class="donations-right-block-steps-line"></div>

          <div class="donations-right-block-steps">
            <div class="donations-right-block-steps-circles current-step">
              <span class="donations-right-block-steps-circles-text">Сумма</span>
              <div class="donations-right-block-steps-circles-number">1</div>
            </div>
            <div class="donations-right-block-steps-circles">
              <span class="donations-right-block-steps-circles-text">Детали</span>
              <div class="donations-right-block-steps-circles-number">2</div>
            </div>
            <div class="donations-right-block-steps-circles">
              <span class="donations-right-block-steps-circles-text">Оплата</span>
              <div class="donations-right-block-steps-circles-number">3</div>
            </div>
          </div>
          <div class="donations-right-block-title">Введите сумму (тенге)</div>
          <div class="donations-right-block-description">
            Ваше пожертвование пойдет на пользу Национальному комитету Демократической
            партии.
          </div>
          <div class="donations-right-block-input">
            <Input type="number" grey placeholder="Введите сумму, тенге" required />
          </div>
          <div class="donations-right-block-pay">
            <Button
              ><img src="/public/img/visa-mastercard.png" alt="visa-mastercard" />
              Оплатить картой</Button
            >
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="donations-rules">
        Правила внесения взносов <br />
        Я являюсь гражданином США или законно признанным постоянным жителем (т.е.
        обладателем грин-карты). <br />
        Этот взнос сделан из моих собственных средств, и средства не предоставляются мне
        другим физическим или юридическим лицом с целью внесения этого взноса. <br />
        Мне по меньшей мере восемнадцать лет. <br />
        Я не федеральный подрядчик. <br />
        Я вношу этот взнос с помощью своей личной кредитной карты, а не с помощью
        корпоративной или бизнес-кредитной карты или карты, выданной другому лицу. <br />
        Примечание: Американцев, проживающих за границей, попросят предоставить копию
        страницы с фотографией в их паспорте, чтобы обеспечить соответствие федеральному
        закону о выборах.
        <br />
        <br />
        <br />
        Взносы или подарки Национальному комитету Демократической партии не облагаются
        налогом. Оплачено Национальным комитетом Демократической партии, democrats.org .
        Не санкционировано ни одним кандидатом или кандидатским комитетом.
        <br /><br />
        Вводя свой номер телефона, вы даете согласие на получение повторяющихся
        автоматических текстовых сообщений и звонков от DNC с новостями и информацией о
        нашей работе. Для SMS, сообщений и скорости передачи данных ma
      </div>
    </div>

    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "../../components/uiLanding/layouts/header.vue";
import Footer from "../../components/uiLanding/layouts/footer.vue";
</script>
<style scoped lang="scss">
.wrapper-main {
  background-color: #f6f9fd;
}
.content {
  max-width: 1920px;
  margin: 0 auto;
}
.donations {
  margin-top: 50px;
  display: flex;
  grid-gap: 50px;
  &-left-text {
    width: 590px;
    &-title {
      color: var(--primary-color);
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 35px;
    }
    &-description {
      color: rgba(4, 32, 81, 0.8);
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-top: 30px;
    }
  }
  &-right-block {
    width: 600px;
    &-title {
      color: var(--primary-color);
      font-size: 24px;
      font-weight: 700;
      line-height: 35px;
    }
    &-description {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
    }
    &-input {
      margin-top: 25px;
    }
    &-pay {
      margin-top: 50px;
      & button {
        width: 100%;
        color: var(--white-color);
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        grid-gap: 10px;
        padding: 7px 0;
      }
    }
    &-steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      &-circles {
        display: flex;
        flex-direction: column;
        grid-gap: 10px;
        &-text {
          color: var(--light-gray-color);
          font-family: Tilda Sans;
          font-size: 18px;
          font-weight: 400;
        }
        &-number {
          width: 50px;
          height: 50px;
          border-radius: 100px;
          background-color: #dadee5;
          color: var(--light-gray-color);
          font-size: 20px;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }
      }
      &-line {
        width: 560px;
        height: 1px;
        background: #dadee5;
        position: fixed;
        margin-top: 60px;
        z-index: 1;
      }
    }
  }
  &-rules {
    max-width: 1240px;
    color: rgba(4, 32, 81, 0.8);
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 100px;
  }
}
.current-step {
  & span {
    color: var(--accent-color);
  }
  & div {
    background-color: var(--accent-color);
    color: var(--white-color);
  }
}
.line {
  background-color: var(--light-gray-color);
  height: 1px;
  width: 1240px;
  margin-top: 50px;
  margin-bottom: 40px;
}
</style>
