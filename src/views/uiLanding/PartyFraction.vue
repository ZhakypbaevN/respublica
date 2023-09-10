<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <div class="content">
        <div class="wrapper-menu">
          <div class="left-menu">

            <div class="left-menu-list">
              <ul>
                <a href="#fractionComposition">
                  <li>Состав фракции</li>
                </a>
                <a href="#deputyRequests">
                  <li>Депутатские запросы</li>
                </a>
                <a href="#links">
                  <li>Аппарат фракции</li>
                </a>
                <a href="#links">
                  <li>Эксперты аппарата фракции</li>
                </a>
                <a href="#links">
                  <li>Встречи с избирателями</li>
                </a>
                <a href="#links">
                  <li>Направить обращение</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <section class="landing-block-content">
          <div class="wrapper wrapper-news">

            <div id="fractionComposition" class="scroll-top">
              <FractionComposition />
            </div>

            <div id="deputyRequests" class="scroll-top">
              <DeputyRequests />
            </div>


            <div class="links-wrapper scroll-top" id="links">
              <div class="links">
                <RouterLink to="/" class="links-item">
                  <span>АППАРАТ фракции</span>
                  <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
                </RouterLink>
                <RouterLink to="/" class="links-item">
                  <span>ЭКСПЕРТЫ аппарата фракции</span>
                  <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
                </RouterLink>
                <RouterLink to="/" class="links-item">
                  <span>Встречи с избирателями</span>
                  <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
                </RouterLink>
                <RouterLink to="/" class="links-item">
                  <span>Направить обращение</span>
                  <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
                </RouterLink>
              </div>
            </div>


            <div class="party-program">
              <span>Программа партии</span>
              <Button class="party-charter-download" name="ПОСМОТРЕТЬ ПРОГРАММУ ПАРТИИ" type="default-blue" />
            </div>


          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import FractionComposition from '../../components/uiLanding/partyFraction/fractionComposition.vue';
import DeputyRequests from '../../components/uiLanding/partyFraction/deputyRequests.vue';
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;


}

.wrapper-news {
  width: 1540px;
}

.landing-block-content {
  margin: 50px 0 50px 50px;
}

.content {
  display: flex;
  max-width: 1920px;
  margin: 0 auto;

}

.wrapper-menu {
  width: 325px;
  background: #042051;
}

.left-menu {
  top: 165px;


  height: 300px;
  position: sticky;


  &-list {
    margin-top: 27px;
    margin-left: 47px;

    & ul {
      & li {
        color: #FFF;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
      }
    }
  }

}

.scroll-top {
  scroll-margin-top: 9.2rem;
}

.landing-title {
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  color: #042051;
}

.links-wrapper {
  display: flex;
  justify-content: center
}

.links {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-item {
    display: flex;
    align-items: center;
    grid-gap: 36px;

    border-left: 5px var(--accent-color) solid;
    padding: 5px 0 5px 15px;

    margin-bottom: 20px;

    & span {
      color: var(--primary-color);
      font-size: 36px;
      font-weight: 600;
    }

    & svg {
      width: 32px;
      height: 32px;
      fill: var(--accent-color);
    }
  }

}

.party-program {
  margin-top: 100px;
  background-color: var(--primary-color);
  width: 1490px;
  height: 164px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & span {
    color: var(--white-color);
    font-size: 36px;
    font-weight: 700;
    text-transform: uppercase;
  }

}
</style>
  