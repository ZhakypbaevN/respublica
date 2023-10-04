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
            <div
              v-for="step of steps"
              :key="step.num"
              class="donations-right-block-steps-circles"
              :class="{ 'current-step': step.num === currentStep }"
            >
              <span class="donations-right-block-steps-circles-text">{{ step.title }}</span>
              <div class="donations-right-block-steps-circles-number">{{ step.num }}</div>
            </div>
          </div>

          <Form v-if="currentStep === 1" @finish="enterSum">
            <div class="donations-right-block-title">Введите сумму (тенге)</div>
            <div class="donations-right-block-description">
              Ваше пожертвование пойдет на пользу Национальному комитету Демократической
              партии.
            </div>
            <div class="donations-right-block-inputs">
              <Input
                name="sum"
                type="number" 
                placeholder="Введите сумму, тенге"
                required
              />
            </div>
            <div class="donations-right-block-pay">
              <Button
                htmlType="submit"
                name="Оплатить картой"
                v-slot:left
              >
                <img src="/public/img/visa-mastercard.png" alt="visa-mastercard" />
              </Button>
            </div>
          </Form>

          <Form v-else-if="currentStep === 2" @finish="enterFullName">
            <div class="donations-right-block-title">Завершите свой взнос в размере {{ formData.sum }} тенге KZ</div>
            <div class="donations-right-block-description grey">
              *Все поля обязательны для заполнения, если не указано иное.
            </div>
            <div class="donations-right-block-inputs">
              <Input
                placeholder="Фамилия"
                name="lastName"
                required
              />
              <Input
                placeholder="Имя" 
                name="name"
                required
              />
            </div>

            <div class="donations-right-block-confirm">
              <input type="checkbox" id="confirm">
              <label for="confirm">
                Я подтверждаю, что я гражданин или постоянный житель Казахстана, делая это пожертвование из моих личных средств, а не деловых или корпоративных средств. Никакое физическое или юридическое лицо не возместит мне.
              </label>
            </div>

            <div class="donations-right-block-btns">
              <Button
                type="outline-default"
                name="Назад"
                @click="backStep"
              />

              <Button
                type="default-blue"
                htmlType="submit"
                name="Сделующий"
              />
            </div>
          </Form>

          <img v-else src="/img/pay-test.jpg">

        </div>
      </div>

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
import { reactive, ref } from 'vue';

const formData = reactive({
  sum: 0,
  name: '',
  lastName: '',
  confirm: false
})
const currentStep = ref(1);
const steps = [
  {
    title: 'Сумма',
    num: 1
  },
  {
    title: 'Детали',
    num: 2
  },
  {
    title: 'Оплата',
    num: 3
  }
]


const enterSum = (data: any) => {
  formData.sum = data.sum;
  currentStep.value = 2;
}

const enterFullName = (data: any) => {
  formData.name = data.name;
  formData.lastName = data.lastName;
  currentStep.value = 3;
}

const backStep = () => {
  currentStep.value--;
}
</script>

<style scoped lang="scss">
.content {
  max-width: 1920px;
  margin: 0 auto;
}
.donations {
  margin-top: 50px;
  display: flex;
  grid-gap: 50px;

  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 40px;
  margin-bottom: 40px;

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
      margin-bottom: 25px;
    }

    &-inputs {
      width: 100%;
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
      margin-bottom: 25px;
    }

    &-confirm {
      margin-bottom: 50px;
    }

    &-pay button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 10px;
      padding: 7px 0;
    }

    &-btns {
      display: flex;
      justify-content: space-between;
    }

    &-steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      overflow: hidden;

      position: relative;

      &::after {
        content: '';

        display: block;
        height: 1.2px;
        width: 1000px;

        position: absolute;
        right: 25px;
        bottom: 25px;
        z-index: -1;

        background-color: var(--light-gray-color-op5);
        transition: all .3s ease-in-out;
      }

      &-circles {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 10px;
        position: relative;

        &.current-step {
          & span {
            color: var(--accent-color);
          }
          & div {
            background-color: var(--accent-color);
            color: var(--white-color);
          }
        }

        &-text {
          color: var(--light-gray-color);
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
        }
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
</style>
