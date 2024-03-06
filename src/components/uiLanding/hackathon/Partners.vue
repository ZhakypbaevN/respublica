<template>
  <section class="hackathonPartners landing-block" id="partners">
    <div class="wrapper landing-wrapper">
      <div class="hackathonPartners-inner">
        <h2 class="landing-title">{{ $t('hackathon.partners') }}</h2>

        <div class="hackathonPartners-items">
          <a
            class="hackathonPartners-item"
            href="https://codetau.com"
            target="_blank"
          >
            <SvgIcon
              class="codetau"
              name="logo-codetau"
              :viewboxWidth="301"
              :viewboxHeight="199"
            />
          </a>

          <RouterLink
            class="hackathonPartners-item"
            to="/"
          >
            <SvgIcon
              class="respublic"
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.hackathonPartners {
  &-items {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-gap: 200px;
  }

  &-item {
    opacity: .7;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    transition: all .3s ease-in-out;

    &:hover {
      opacity: 1;
      -webkit-filter: grayscale(0%);
      filter: grayscale(0%);
    }

    &:last-child {
      padding-top: 60px;
    }

    & svg.codetau {
      width: 300px;
      height: 200px;
    }

    & svg.respublic {
      width: 512px;
      height: 96px;
    }
  }
}
</style>