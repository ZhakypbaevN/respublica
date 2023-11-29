<template>
<div class="wrapper-main">
  <div>
    <Header />
    <section class="faq-block landing-block">
      <div class="wrapper landing-wrapper">
        <h2 class="landing-title center">{{ $t('faq.faq-title') }}</h2>

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
                <div class="faq-item-answer">

                  <div v-html="faqItem.answer"></div>
                  <button
                    v-if="faqItem.name === 'faq-item-7'"
                    @click="showSubmitAnAppealModal = true"
                  >
                    «{{ t('button.sand') }}»
                  </button>

                </div>
              </div>
            </Transition>
          </div>
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
import { onMounted } from 'vue';

  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const showSubmitAnAppealModal = ref(false);

  const faqList = reactive([])

  onMounted(() => {
    for (let idx = 1; idx <= 8; idx++) {
      faqList.push({
        name: `faq-item-${idx}`,
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
    }
  }
</style>


<style>
  .faq-item-answer a {
    color: var(--accent-color);
  }
</style>