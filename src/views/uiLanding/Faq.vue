<template>
<div class="wrapper-main">
  <div>
    <Header />

    <section class="faq-block landing-block">
      <div class="wrapper landing-wrapper">
        <h2 class="landing-title center">{{ $t('faq.faq-title') }}</h2>

        <div
          class="faqItem"
          v-for="(faqItem, idx) of faqList"
          :key="faqItem.question"
          :class="{active: faqItem.active}"
        >
          <button class="faqItem-btn" @click="() => toggleShow(idx)">
            <h4 class="faqItem-title">{{ faqItem.question }}</h4>

            <SvgIcon
              class="faqItem-btn-arrow"
              name="arrow-outline-down"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </button>

          <Transition>
            <div v-if="faqItem.active" v-collapse>
              <div class="faqItem-answer">

                <div v-html="faqItem.answer"></div>
                <button
                  v-if="faqItem.name === 'faqItem-7'"
                  @click="showSubmitAnAppealModal = true"
                >
                  «{{ t('button.sand') }}»
                </button>

              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>

  <Footer /> 

  <SubmitAnAppealModal
    :show="showSubmitAnAppealModal"
    @hide="() => showSubmitAnAppealModal = false"
  />
</div>
</template>

<script setup lang="ts">
  import SubmitAnAppealModal from '@/components/uiLanding/feedback/SubmitAnAppealModal.vue';

  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const showSubmitAnAppealModal = ref(false);

  const faqList = reactive([])

  onMounted(() => {
    for (let idx = 1; idx <= 8; idx++) {
      faqList.push({
        name: `faqItem-${idx}`,
        question: t(`faq.faq-item-${idx}.question`),
        answer: t(`faq.faq-item-${idx}.answer`),
        active: false
      });
    }
  })

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

.faqItem {
  border-radius: 10px;
  background: white;
  margin-bottom: 15px;

  &.active .faqItem-btn-arrow {
    transform: rotate(-180deg);
  }

  &-btn {
    padding: 28px 30px;
    width: 100%;

    display: grid;
    align-items: center;
    grid-template-columns: 1fr 32px;
    grid-gap: 80px;

    &-arrow {
      height: 32px;
      width: 32px;
      stroke: var(--primary-color);

      transition:  .3s ease-in-out;
    }

    &:hover {
      & .faqItem-title {
        color: var(--accent-color);
      }

      & .faqItem-btn-arrow {
        stroke: var(--accent-color);
      }
    }
  }

  &-title {
    font-size: 25px;
    font-weight: 500;
    line-height: 1.2;
    text-align: left;

    transition: color .3s ease-in-out;
  }

  &-answer {
    padding: 2px 30px 30px;
    
    & * {
      display: inline-block;

      font-size: 20px;
      line-height: 1.4;

      margin-bottom: 0px !important;
    }

    & a, & button {
      color: var(--accent-color);
    }

    & button {
      margin-top: 20px;
    }
  }

  // Adaptation
  @media (max-width: 1200px) {
    &-btn {
      padding: 26px 28px;
    }

    &-answer {
      padding: 2px 28px 28px;
    }
  }

  @media (max-width: 992px) {
    border-radius: 10px;
    margin-bottom: 15px;

    &-btn {
      padding: 26px 24px;

      grid-template-columns: 1fr 30px;
      grid-gap: 40px;

      &-arrow {
        height: 30px;
        width: 30px;
      }
    }

    &-title {
      font-size: 22px;
    }

    &-answer {
      padding: 2px 24px 24px;
      
      & * {
        font-size: 18px;
      }

      & button {
        margin-top: 18px;
      }
    }
  }

  @media (max-width: 768px) {
    border-radius: 10px;
    margin-bottom: 12px;

    &-btn {
      padding: 24px 22px;

      grid-template-columns: 1fr 28px;
      grid-gap: 30px;

      &-arrow {
        height: 28px;
        width: 28px;
      }
    }

    &-title {
      font-size: 20px;
    }

    &-answer {
      padding: 2px 22px 22px;
      
      & * {
        font-size: 18px;
      }

      & button {
        margin-top: 18px;
      }
    }
  }

  @media (max-width: 576px) {
    border-radius: 8px;
    margin-bottom: 10px;

    &-btn {
      padding: 22px 18px;

      grid-template-columns: 1fr 22px;
      grid-gap: 20px;

      &-arrow {
        height: 22px;
        width: 22px;
      }
    }

    &-title {
      font-size: 18px;
    }

    &-answer {
      padding: 2px 18px 18px;
      
      & * {
        font-size: 16px;
      }

      & button {
        margin-top: 12px;
      }
    }
  }

  @media (max-width: 380px) {
    &-btn {
      padding: 20px 14px;

      grid-template-columns: 1fr 20px;
      grid-gap: 20px;

      &-arrow {
        height: 20px;
        width: 20px;
      }
    }

    &-title {
      font-size: 16px;
    }

    &-answer {
      padding: 2px 14px 14px;
      
      & * {
        font-size: 16px;
      }

      & button {
        margin-top: 10px;
      }
    }
  }
}
</style>


<style>
  .faqItem-answer a {
    color: var(--accent-color);
  }
</style>