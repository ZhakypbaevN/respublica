<template>
<LandingLayout :list="sideBarlinks">
  <AboutUs />
  
  <section class="landing-block">
    <div class="wrapper">
      <div class="party-charter">
        <div class="party-charter-text">
          <span class="party-charter-title">Устав партии</span>
          <span class="party-charter-title-upper">Алға, Қазақстан! Алға, Respublica!</span>
        </div>
        <a href="/doc/ru/Устав_проект_новой_редакции_устав_в_новой_редакции_29_07_2023.pdf" target="_blank">
          <Button
            class="party-charter-download"
            name="Посмотреть устав"
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
        <h2 class="landing-title center">Организационная структура аппарата партии «Respublica»</h2>
      
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
import AboutUs from '../../components/uiLanding/about/aboutUs.vue';
import PartyLeaders from '../../components/uiLanding/about/partyLeaders.vue';
import PartyProgram from '../../components/uiLanding/about/partyProgram.vue';
import RespublicaJastary from '../../components/uiLanding/about/respublicaJastary.vue';
import History from '../../components/uiLanding/about/history.vue';

const sideBarlinks = [
  {
    title: 'Кто мы?',
    link: "#who-are-we"
  },
  {
    title: 'Restart. Reforma. Respublica (программа партии)',
    link: "#party-program"
  },
  {
    title: 'Это Новый Казахстан! (предвыборная программа партии)',
    link: "#party-program"
  },
  {
    title: 'Организационная структура',
    link: "#party-structure"
  },
  {
    title: 'История',
    link: "#history"
  },
  {
    title: 'Лидеры партии',
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
  
  background: url('/img/about/people.png') center no-repeat;
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
  