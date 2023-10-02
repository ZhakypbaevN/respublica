<template>
<div class="wrapper-main">
  <div>
  <Header />
  <section class="faq-block landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title">Часто задаваемые вопросы и ответы</h2>

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
              <p class="faq-item-answer">{{ faqItem.answer }}</p>
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
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';

import { reactive } from 'vue';

const faqList = reactive([
  {
    question: 'Что нужно для вступления в партию?',
    answer: 'Для вступления в партию нужно ваше желание, а также подтверждение того, что вы не являетесь членом другой партии. Вы можете направить онлайн заявление на вступление в партию. Для этого необходимо ввести ваши ФИО, ИИН, регион, номер контактного телефона. На указанный номер вам придет СМС-уведомление и электронная ссылка на партийный билет. Кроме того, заявление на членство в партию можно подать в региональном филиале партии Respublica.',
    active: false
  },
  {
    question: 'Как записаться на прием руководства партии, депутатов фракции партии «Respublica»?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Каковы главная цель и задачи партии?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Подскажите адрес и контакты филиала партии в регионе?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Есть ли у партии депутаты в регионах? Можно ли к ним обратиться?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Куда направлять обращение?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Могу ли я получить помощь от партии в решении своего вопроса?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'Можно ли, не вступая в партию, участвовать в ваших мероприятиях?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    active: false
  },
  {
    question: 'В нашем городе существует проблема. Может ли партия помочь в ее решении?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
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

.landing-title {
  text-align: center;
  margin-bottom: 50px;
}

.faq {
  &-block {
    margin-top: 50px;
  }
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
    }
  }
}
</style>