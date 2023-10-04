<template>
<div class="wrapper-main">
  <div>
  <Header />
  <section class="faq-block landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title center">Часто задаваемые вопросы и ответы</h2>

      <div class="faq-items">
        <div
          class="faq-item"
          v-for="(faqItem, idx) of faqList"
          :key="faqItem.question"
          :class="{active: faqItem.active}"
        >
          <button class="faq-item-btn" @click="() => toggleShow(idx)">
            <h4 class="faq-item-title">{{ faqItem.question }}</h4>

            <SvgIcon
              class="faq-item-btn-arrow"
              name="arrow-outline-down"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </button>
          <Transition>
            <div v-if="faqItem.active" v-collapse>
              <p class="faq-item-answer" v-html="faqItem.answer"></p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
  </div>

  <Footer /> 
</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const faqList = reactive([
  {
    question: 'Что нужно для вступления в партию?',
    answer: `
      <p>Для вступления в партию нужно ваше желание, а также подтверждение того, что вы не являетесь членом другой партии.</p><br>
      <p>Вы можете направить онлайн заявление на вступление в партию. Для этого необходимо ввести ваши ФИО, ИИН,  регион, номер контактного телефона. На указанный номер вам придет СМС-уведомление и электронная ссылка на партийный билет.</p><br>
      <p>Кроме того, заявление на членство в партию можно подать в региональном филиале партии Respublica.</p>
    `,
    active: false
  },
  {
    question: 'Как записаться на прием руководства партии, депутатов фракции партии «Respublica»?',
    answer: `
      <p>На нашем сайте в разделе «Контакты» указаны почтовый и электронный адрес, на который вы можете отправить свое обращение к руководству партии или к депутату.</p><br>
      <p>Также вы можете обратиться в региональный филиал, адреса расположены в этом же разделе. </p>
    `,
    active: false
  },
  {
    question: 'Каковы главная цель и задачи партии?',
    answer: `
      <p>Партия «Respublica» – это политическая сила, выступающая за создание современной и высокотехнологичной национальной экосистемы. Мы хотим жить в надежной, процветающей и справедливой стране – стране свободных людей, где каждый может честно трудиться и получать достойный заработок, где здоровая и образованная молодежь, и где каждый гордится своей страной.</p><br>
      <p>Партия «Respublica» – это МЕТА-партия. Мы нацелены на структурные преобразования во всех сферах общественной жизни. Мы являемся людьми нового Казахстана, цифровыми номадами!</p> <br>
      <p>Партия «Respublica» – это партия людей дела. Мы опытные и эффективные управленцы, лидеры с чистой деловой репутацией. Мы не чиновники, а созидатели. Каждый из нас создает тысячи рабочих мест. За каждым – личная история успеха и помощь множеству согражданам найти себя и обрести веру в будущее.</p>
    `,
    active: false
  },
  {
    question: 'Подскажите адрес и контакты филиала партии в регионе?',
    answer: '<p>Адреса и контакты филиалов партии в регионах вы можете найти, открыв раздел «Контакты» на официальном сайте партии.</p>',
    active: false
  },
  {
    question: 'Есть ли у партии депутаты в регионах? Можно ли к ним обратиться?',
    answer: '<p>Да, в большинстве регионов от партии Respublica избраны депутаты областного и районных маслихатов. Обратиться к ним можно, обратившись в региональный филиал партии или через сервис записи на прием на сайте местного маслихата.</p>',
    active: false
  },
  {
    question: 'Куда направлять обращение?',
    answer: '<p>Свое обращение вы можете отправить по адресу г.Астана, пр. Мангилик ел, 33/1, Бизнес-центр IPLAZA, 9 этаж или по электронной почте <a href="mailto:info@respublica-partiyasy.kz">info@respublica-partiyasy.kz</a>.</p>',
    active: false
  },
  {
    question: 'Могу ли я получить помощь от партии в решении своего вопроса?',
    answer: '<p>В партии действует общественная приемная онлайн, посредством которой вы можете написать обращение. Вам необходимо войти в раздел «Контакты», внести ваши данные (ФИО, регион, контактный номер телефона), текст обращения и нажать на кнопку <a href="#">«Отправить»</a>.</p>',
    active: false
  },
  {
    question: 'Можно ли, не вступая в партию, участвовать в ваших мероприятиях?',
    answer: '<p>Конечно, вы можете участвовать в мероприятиях партии, не вступая в ее ряды. Если у вас есть интересные идеи для сотрудничества, вам необходимо обратиться в местный филиал партии. Контакты филиалов указаны на официальном сайте партии, а также в актуальных историях в инстаграм-аккаунте партии <a href="https://www.instagram.com/respublica_partiyasy/" target="_blank">@respublica_partiyasy</a>.</p>',
    active: false
  }
])

const toggleShow = (idx: number) => {
  if (faqList[idx].active) faqList[idx].active = false;
  else {
    for (let i = 0; i < faqList.length; i++) {
      faqList[i].active = false;
    }
    faqList[idx].active = true;
  }
}
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}

.faq {
  &-item {
    border-radius: 10px;
    background: #FFF;
    margin-bottom: 15px;

    &.active .faq-item-btn-arrow {
      transform: rotate(-180deg);
    }

    &-btn {
      padding: 28px 30px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      grid-gap: 80px;

      &-arrow {
        height: 32px;
        width: 32px;
        stroke: var(--primary-color);

        transition:  .3s ease-in-out;
      }

      &:hover {
        & .faq-item-title {
          color: var(--accent-color);
        }

        & .faq-item-btn-arrow {
          stroke: var(--accent-color);
        }
      }
    }

    &-title {
      font-size: 25px;
      font-weight: 500;
      line-height: 1.2;

      transition: color .3s ease-in-out;
    }

    &-answer {
      display: inline-block;

      font-size: 20px;
      line-height: 1.4;

      padding: 2px 30px 30px;
      margin-bottom: 0px !important;

      & a {
        color: var(--accent-color);
      }
    }
  }
}
</style>

<style>
.faq-item-answer a {
  color: var(--accent-color);
}
</style>