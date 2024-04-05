<template>
  <section class="partyProgram landing-block" id="party-program">
    <div class="wrapper">
      <div class="partyProgram-items">
        <button
          class="partyProgram-item withZoomPreview"
          v-for="(item, idx) of partyList"
          :key="item.title"
          :id="item.id"
          @click="focusToDropDown(`partyProgram-pdfDropDown-${idx}`)"
        >
          <div class="partyProgram-item-preview withZoomPreview-preview">
            <div class="partyProgram-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url('${item.img}');`"></div>
          </div>
          
          <span class="partyProgram-title">{{ item.title }}</span>
          <span class="partyProgram-sub-title">{{ item.subtitle }}</span>
          
          <DropDownPDF
            :id="`partyProgram-pdfDropDown-${idx}`"
            :pdflinks="item.pdflinks"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import DropDownPDF from '@/components/common/DropDownPDF.vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const partyList = [
    {
      img: '/img/uiLanding/about-party/program-one.jpg',
      id: 'restart-reforma-respublica',
      title: t('about-us-page.party-program.restart-reforma-respublica'),
      subtitle: t('about-us-page.party-program.restart-reforma-respublica-subtitle'),
      pdflinks: {
        ru: '/doc/ru/Программа партии_.pdf',
        kz: '/doc/kz/Re_Предвыборная_программа_партии_max_КАЗ.pdf'
      }
    },
    {
      img: '/img/uiLanding/about-party/program-two.jpg',
      id: 'this-is-new-kazakhstan',
      title: t('about-us-page.party-program.this-is-new-kazakhstan'),
      subtitle: t('about-us-page.party-program.party-election-program-respublica'),
      pdflinks: {
        ru: '/doc/ru/Идеологическая платформа партии.pdf',
        kz: '/doc/kz/Идеологиялық бағдарламасы.pdf'
      }
    }
  ]

  const focusToDropDown = (idName) => {
    setTimeout(() => {
      const button = document.querySelector(`#${idName} .ac-dropdown_btn`);
      if (button) button.click();
    }, 100)
  }
</script>

<style scoped lang="scss">
.partyProgram {
  &-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }

  &-item {
    background-color: var(--white-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 20px;
    cursor: pointer;

    &-preview {
      width: 100%;
      border-radius: 20px;
      margin-bottom: 20px;
  
      &-img {
        width: 100%;
        padding-bottom: 36.22%;
      }
    }
  }

  &-title {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    text-transform: uppercase;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  &-sub-title {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    line-height: 1.4;
    text-transform: uppercase;
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  // Adaptation
  @media (max-width: 1400px) {
    &-items {
      grid-gap: 30px;
    }

    &-item {
      padding: 18px;
      padding-bottom: 26px;
      border-radius: 20px;

      &-preview {
        border-radius: 20px;
        margin-bottom: 20px;
      }
    }

    &-title {
      font-size: 26px;
      margin-bottom: 10px;
    }

    &-sub-title {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 1200px) {
    &-items {
      grid-gap: 20px;
    }

    &-item {
      padding: 16px;
      padding-bottom: 26px;
      border-radius: 18px;

      &-preview {
        border-radius: 18px;
        margin-bottom: 18px;
      }
    }

    &-title {
      font-size: 24px;
      margin-bottom: 10px;
    }

    &-sub-title {
      font-size: 18px;
      margin-bottom: 22px;
    }
  }

  @media (max-width: 992px) {
    &-items {
      grid-gap: 20px;
    }

    &-item {
      padding: 14px;
      padding-bottom: 22px;
      border-radius: 16px;

      &-preview {
        border-radius: 16px;
        margin-bottom: 16px;
      }
    }

    &-title {
      font-size: 22px;
      margin-bottom: 8px;
    }

    &-sub-title {
      font-size: 18px;
      margin-bottom: 22px;
    }
  }

  @media (max-width: 768px) {
    &-items {
      grid-template-columns: 1fr;
    }

    &-item {
      padding-bottom: 30px;
    }

    &-sub-title {
      margin-bottom: 18px;
    }
  }

  @media (max-width: 576px) {
    &-item {
      padding: 12px;
      padding-bottom: 26px;
      border-radius: 14px;

      &-preview {
        border-radius: 14px;
        margin-bottom: 14px;
      }
    }

    &-title {
      font-size: 18px;
      margin-bottom: 6px;
    }

    &-sub-title {
      font-size: 16px;
      margin-bottom: 18px;
    }
  }
}
</style>
<style>
  .partyProgram .pdfDropDown .ac-dropdown_btn {
    border-radius: 100px;
  }
</style>