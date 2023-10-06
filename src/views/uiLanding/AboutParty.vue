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
        <a href="/doc/ru/Respublica.pdf" target="_blank">
          <Button class="party-charter-download" name="СКАЧАТЬ УСТАВ" type="default-blue" />
        </a>
      </div>
    </div>
  </section>

  <PartyProgram />

  <section class="partyStructure landing-block" id="party-structure">
    <div class="wrapper">
      <h2 class="landing-title">Организационная структура аппарата партии «Respublica»</h2>
    
      <img src="/img/about/party-structure-1.svg" alt="">
    </div>
  </section>

  <section class="partyStructure landing-block">
    <div class="wrapper">
      <h2 class="landing-title">Организационная структура аппарата партии «Respublica»</h2>
    
      <img src="/img/about/party-structure-2.svg" alt="">
    </div>
  </section>

  <History />


  <PartyLeaders />
</LandingLayout>
</template>
  
<script setup lang="ts">
import AboutUs from '../../components/uiLanding/about/aboutUs.vue';
import PartyLeaders from '../../components/uiLanding/about/partyLeaders.vue';
import PartyProgram from '../../components/uiLanding/about/partyProgram.vue';
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
    title: 'Respublica jastary',
    link: "#"
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
    width: 213px;
    height: 64px;
  }
}

.partyStructure {
  border-radius: 10px;
  margin: 0 50px;

  border-radius: 20px;
  background: white;

  & .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

.partyStructure#party-structure {
  margin-bottom: 35px;
}

.party-leaders {
  background-color: white;
}
</style>
  