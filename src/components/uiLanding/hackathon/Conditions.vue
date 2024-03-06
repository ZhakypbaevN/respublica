<template>
  <section class="hackathonConditions landing-block" id="conditions">
    <div class="wrapper landing-wrapper">
      <div class="hackathonConditions-inner">
        <h2 class="landing-title">{{ $t(`hackathon.conditions.title`) }}</h2>

        <div class="hackathonConditions-items">
          <div
            class="hackathonConditions-items-item"
            v-for="item in 4"
            :key="item"
          >
            <p
              class="hackathonConditions-items-item-text"
              :class="{alignRight: item % 2 === 0}"
              v-html="$t(`hackathon.conditions.item-${item}`)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.hackathonConditions {
  position: relative;

  &::after {
    content: '';

    display: block;
    height: 80%;
    padding-left: 40%;

    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;

    background: url('/img/uiLanding/hackathon/globe.png') center no-repeat;
    background-size: cover;
    filter: blur(8px);
    opacity: .2;
  }

  &-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px 58px;

    position: relative;

    &::after {
      content: '';

      width: 320px;
      height: 320px;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      background: url('/img/uiLanding/hackathon/globe.png') center no-repeat;
      background-size: cover;
    }

    &-item {
      display: flex;
      align-items: center;
      
      padding: 40px;

      border: 1.5px solid var(--accent-color);
      border-radius: 20px;

      &-text {
        width: 100%;

        font-size: 24px;
        font-weight: 400;
        color: var(--accent-color);

        &.alignRight {
          text-align: right;
        }
      }
    }
  }
}
</style>