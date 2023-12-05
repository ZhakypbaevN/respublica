<template>
  <LandingLayout :list="sideBarlinks">
    <AboutUs />
    
    <section class="landing-block">
      <div class="wrapper">
        <div class="party-charter">
          <div class="party-charter-text">
            <span class="party-charter-title">{{ $t('about-us-page.party-is-charter.title') }}</span>
            <span class="party-charter-title-upper">{{ $t('about-us-page.party-is-charter.alga-respublica') }}</span>
          </div>
          <a href="/doc/ru/Устав_проект_новой_редакции_устав_в_новой_редакции_29_07_2023.pdf" target="_blank">
            <Button
              class="party-charter-download"
              :name="$t('about-us-page.party-is-charter.view-the-charter-btn')"
              type="default-blue"
              uppercase
            />
          </a>
        </div>
      </div>
    </section>

    <PartyProgram />

    <section class="partyStructure">
      <div class="wrapper">
        <div class="partyStructure-inner landing-block" id="party-structure">
          <h2 class="landing-title center">{{ $t('about-us-page.organizational-structure') }}</h2>
        
          <img src="/img/icons/party-structure-2.svg" alt="">
        </div>
      </div>
    </section>

    <History />

    <PartyLeaders />

    <RespublicaJastary />

  </LandingLayout>
</template>
  
<script setup lang="ts">
  import AboutUs from '@/components/uiLanding/about-party/AboutUs.vue';
  import History from '@/components/uiLanding/about-party/History.vue';
  import PartyLeaders from '@/components/uiLanding/about-party/PartyLeaders.vue';
  import PartyProgram from '@/components/uiLanding/about-party/PartyProgram.vue';
  import RespublicaJastary from '@/components/uiLanding/about-party/RespublicaJastary.vue';

  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const sideBarlinks = [
    {
      title: t('who-are-we'),
      link: "#who-are-we"
    },
    {
      title: t('party-program-and-party-s-election-program'),
      link: "#party-program"
    },
    {
      title: t('about-us-page-menu-organizational-structure'),
      link: "#party-structure"
    },
    {
      title: t('about-us-page-menu-history'),
      link: "#history"
    },
    {
      title: t('about-us-page-menu-party-leaders'),
      link: "#party-leaders"
    },
    {
      title: 'Respublica Jastary',
      link: "#respublica-jastary"
    }
  ]
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
  }


  &-title {
    color: #FFF;
    font-size: 36px;
    font-weight: 700;
  }

  &-title-upper {
    color: #FFF;
    font-size: 36px;
    font-weight: 700;
    margin-top: 30px;
  }

  &-download {
    height: 64px;
  }
}

.partyStructure {
  border-radius: 10px;
  padding: 0px !important;

  
  &-inner {
    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 20px;
    background: white;
  }

  &-items {
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-gap: 80px;
  }

  & img {
    width: 100%;
    padding: 0 70px;
  }
}

.party-leaders {
  background-color: white;
}
</style>
  