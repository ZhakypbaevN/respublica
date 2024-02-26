<template>
  <LandingLayout :list="sideBarlinks">
    <AboutUs />
    
    <section class="landing-block">
      <div class="wrapper">
        <div
          class="party-charter"
          @click="focusToDropDown(`partyProgram-pdfDropDown-charter`)"
        >
          <div class="party-charter-text">
            <h2 class="party-charter-title">{{ $t('about-us-page.party-is-charter.title') }}</h2>
            <h2 class="party-charter-title">{{ $t('about-us-page.party-is-charter.alga-respublica') }}</h2>
          </div>

          <DropDownPDF
            :pdflinks="charterLangs"
            :name="$t('about-us-page.party-is-charter.view-the-charter-btn').toUpperCase()"
            id="partyProgram-pdfDropDown-charter"
            btnStyle="default-blue"
          />
        </div>
      </div>
    </section>

    <PartyProgram />

    <PartyStructure />

    <History />

    <PartyLeaders />

    <RespublicaJastary />

  </LandingLayout>
</template>
  
<script setup lang="ts">
  import DropDownPDF from '@/components/common/DropDownPDF.vue';

  import AboutUs from '@/components/uiLanding/about-party/AboutUs.vue';
  import History from '@/components/uiLanding/about-party/History.vue';
  import PartyLeaders from '@/components/uiLanding/about-party/PartyLeaders.vue';
  import PartyProgram from '@/components/uiLanding/about-party/PartyProgram.vue';
  import PartyStructure from '@/components/uiLanding/about-party/PartyStructure.vue';
  import RespublicaJastary from '@/components/uiLanding/about-party/RespublicaJastary.vue';

  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const sideBarlinks = [
    {
      title: t('home.about-us.who-are-we'),
      link: "#who-are-we"
    },
    {
      title: `${t('about-us-page.party-program.restart-reforma-respublica-subtitle')},\n ${t('about-us-page.party-program.party-election-program-respublica')}`,
      link: "#party-program"
    },
    {
      title: t('about-us-page.organizational-structure'),
      link: "#party-structure"
    },
    {
      title: t('about-us-page.history.title'),
      link: "#history"
    },
    {
      title: t('about-us-page.party-leaders.title'),
      link: "#party-leaders"
    },
    {
      title: 'Respublica Jastary',
      link: "#respublica-jastary"
    }
  ]

  const charterLangs = {
    ru: '/doc/ru/Устав_проект_новой_редакции_устав_в_новой_редакции_29_07_2023.pdf',
    kz: '/doc/kz/Устав Respublica.pdf'
  }

  const focusToDropDown = (idName) => {
    setTimeout(() => {
      const button = document.querySelector(`#${idName} .ac-dropdown_btn`);
      if (button) button.click();
    }, 100)
  }
</script>
  
<style scoped lang="scss">
.party-charter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 54px 140px 54px 80px;
  
  background: url('/img/uiLanding/about-party/people.jpg') center no-repeat;
  background-size: cover;
  border-radius: 20px;

  &-text {
    display: flex;
    flex-direction: column;
      grid-gap: 30px;
  }

  &-title {
    color: #FFF;
    font-size: 36px;
    font-weight: 700;
  }
}

.party-leaders {
  background-color: white;
}

// Adaptation
@media (max-width: 1600px) {
  .party-charter {
    padding: 46px 110px 46px 60px;
    border-radius: 20px;

    &-text {
      grid-gap: 26px;
    }

    &-title {
      font-size: 36px;
    }
  }
}

@media (max-width: 1400px) {
  .party-charter {
    padding: 24px 40px 24px 30px;
    border-radius: 18px;

    &-text {
      grid-gap: 12px;
    }

    &-title {
      font-size: 30px;
    }

    &-pdfBtn {
      padding: 16px 18px;
    }
  }
}

@media (max-width: 768px) {
  .party-charter {
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 30px;

    padding: 28px 30px;
    border-radius: 16px;

    &-text {
      grid-gap: 10px;
    }

    &-title {
      font-size: 28px;
    }

    &-pdfBtn {
      padding: 16px 18px;
    }
  }
}

@media (max-width: 576px) {
  .party-charter {
    grid-gap: 24px;

    padding: 22px 20px;
    border-radius: 14px;

    &-text {
      grid-gap: 8px;
    }

    &-title {
      font-size: 22px;
    }
  }
}
</style>
<style lang="scss">
  .party-charter .pdfDropDown .ac-dropdown_btn {
    padding: 20px 30px !important;
    
    & svg {
      fill: white;
    }

    @media (max-width: 1400px) {
      padding: 16px 18px !important;
    }

    @media (max-width: 768px) {
      padding: 16px 18px !important;
    }
    
    @media (max-width: 576px) {
      padding: 14px 16px !important;
    }
  }
</style>