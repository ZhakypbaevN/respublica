<template>
<LandingLayout :list="sideBarlinks">
  <FractionComposition />

  <DeputyRequests />

  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <div class="links-wrapper scroll-top" id="links">
        <div class="links">
          <RouterLink to="/" class="landing-link with-line" id="meetings-with-voters">
            <span>ВСТРЕЧИ с избирателями</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </RouterLink>
          <RouterLink to="/" class="landing-link with-line" id="send-an-appeal">
            <span>Направить обращение</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <div class="party-program">
        <span>Программа партии</span>
        <a href="/doc/Программа партии_.pdf" target="_blank">
          <Button class="party-charter-download" name="Открыть" type="default-blue" uppercase />
        </a>
      </div>
    </div>
  </section>

</LandingLayout>
</template>
  
<script setup lang="ts">
import FractionComposition from '../../components/uiLanding/partyFraction/fractionComposition.vue';
import DeputyRequests from '../../components/uiLanding/partyFraction/deputyRequests.vue';

const sideBarlinks = [
  {
    title: 'Депутаты',
    link: "#fraction-composition"
  },
  {
    title: 'Депутатские запросы',
    link: "#deputy-requests"
  },
  {
    title: 'Встречи с избирателями',
    link: "#meetings-with-voters"
  },
  {
    title: 'Направить обращение',
    link: "#send-an-appeal"
  }
]
</script>
  
<style scoped lang="scss">
.links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 32%;
}

.party-program {
  background-color: var(--primary-color);
  width: 1490px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 100px;

  & span {
    color: var(--white-color);
    font-size: 36px;
    font-weight: 700;
    text-transform: uppercase;
  }

}
</style>
  