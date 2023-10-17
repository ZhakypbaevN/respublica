<template>
  <section class="aboutParty landing-block">
    <div class="wrapper landing-wrapper">
      <div class="aboutParty-inner">
        <div class="aboutParty-item">
          <img src="/img/uiLanding/about-party/events-1.jpg" alt="">
          <img src="/img/uiLanding/about-party/events-4.jpg" alt="">
        </div>
        <div class="aboutParty-item">
          <img src="/img/uiLanding/about-party/events-2.jpg" alt="">
          <img src="/img/uiLanding/about-party/events-5.jpg" alt="">
        </div>
        <div class="aboutParty-item">
          <img src="/img/uiLanding/about-party/events-3.jpg" alt="">
          <img src="/img/uiLanding/about-party/events-6.jpg" alt="">
        </div>
      </div>

      <div class="aboutParty-bottom">
        <p class="aboutParty-description">
           {{ $t('home-about-party-descritption') }}
        </p>

        <Button
          :name="$t('home-about-party-join-the-party')"
          type="default-blue"
          uppercase
          @click="() => $emit('showJoinPartyModal')"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Emits {
  (event: 'showJoinPartyModal', value: Function): void,
}

defineEmits<Emits>()
</script>

<style scoped lang="scss">
.aboutParty {
  padding-top: 35px;
  &-description {
    max-width: 1200px;

    text-align: center;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;

    margin-bottom: 40px;

    & span {
      color: var(--accent-color);
      margin-bottom: 40px;
    }
  }

  &-inner {
    display: grid;
    grid-template-columns: 23% 1fr 31%;
    grid-gap: 40px;
    padding: 40px 0;
    margin-bottom: 40px;

    position: relative;

    &::before {
      content: '';

      display: block;
      width: calc(100% - 80px);
      height: 100%;

      position: absolute;
      left: 50%;
      top: 0;
      z-index: -1;
      transform: translateX(-50%);
      
      background-color: var(--accent-color-op10);
    }

    & .aboutParty-item:first-child,
    & .aboutParty-item:last-child {
      top: -75px;
    }
  }

  &-item {
    position: relative;

    & img {
      position: absolute;
      left: 0;
      top: 40px;
      z-index: 1;
      opacity: 0;
      animation: slideshow 10s infinite;
      
    }

    & img:nth-child(1) {
      animation-delay: 0s;
    }

    & img:nth-child(2) {
      animation-delay: 5s;
    }
  }

  &-item:first-child {
    width: 322px;
    height: 320px;
  }

  &-item:nth-child(2) {
    width: 560px;
    height: 402px;
  }

  &-item:last-child {
    width: 440px;
    width: 345px;
  }

  &-links {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;

    padding: 10px 0 20px 40px;
    border-left: 2px solid var(--accent-color);

    &-item {
      display: inline-flex;
      align-items: center;
      grid-gap: 7px;

      &.red {
        & span {
          color: var(--red-color);
        }

        & svg {
          fill: var(--red-color);
        }
      }

      & svg {
        height: 42px;
        width: 42px;
        fill: var(--accent-color);
      }
    }
  }
  &-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@keyframes slideshow {
  0% {
    opacity: 0;
    top: 40px;
  }
  20% {
    opacity: 1;
    top: 0;
  }
  50% {
    opacity: 1;
    top: 0;
  }
  70% {
    opacity: 0;
    top: 40px;
  }
  100% {
    opacity: 0;
    top: 40px;
  }
}
</style>