<template>
  <section :class="`hackathonInformation landing-block ${bg}`">
    <div class="wrapper landing-wrapper">
      <div class="hackathonInformation-inner">
        <div class="hackathonInformation-inner-left">
          <SvgIcon
            name="logo-mini"
            :viewboxWidth="96"
            :viewboxHeight="95"
          />

          <div class="hackathonInformation-titles">
            <h4 class="hackathonInformation-subtitle">{{ $t('hackathon.information.subtitle') }}</h4>
            <h4 class="hackathonInformation-title">{{ $t('hackathon.information.title') }}</h4>
          </div>
        </div>

        <a href="https://forms.office.com/r/C2vGaALmV1" target="_blank">
          <Button
            class="hackathonIntro-content-btns-play"
            :name="$t('hackathon.information.btn')"
            type="outline-light"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface IProps {
    bg?: string,
  }

  withDefaults(defineProps<IProps>(), {
    bg: 'blue'
  })
</script>

<style scoped lang="scss">
.hackathonInformation {
  background-color: var(--accent-color);

  &.light-orange {
    background-color: var(--light-orange-color);
  }

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 60px;

    &-left {
      display: flex;
      align-items: center;
      grid-gap: 45px;

      & svg {
        height: 120px;
        width: 120px;
        fill: var(--white-color);
      }
    }
  }

  &-subtitle {
    color: var(--white-color);
    font-size: 20px;
    font-weight: 400;
  }

  &-title {
    color: var(--white-color);
    font-size: 30px;
    font-weight: 700;
  }
}
</style>