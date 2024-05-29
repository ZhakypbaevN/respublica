<template>
  <section class="hackathonConditions landing-block" id="conditions">
    <div class="wrapper landing-wrapper">
      <div class="hackathonConditions-inner">
        <h2 class="landing-title">{{ $t(`hackathon.conditions.title`) }}</h2>

        <div class="hackathonConditions-items">
          <div
            class="hackathonConditions-items-item"
            :class="{alignRight: item % 2 === 0}"
            v-for="item in 4"
            :key="item"
          >
            <p
              class="hackathonConditions-items-item-text"
              v-html="$t(`hackathon.conditions.item-${item}`)"
            />
          </div>

          <div class="hackathonConditions-items-globus"></div>
        </div>


        <div class="hackathonConditions-items mobile">
          <div
            class="hackathonConditions-items-item"
            v-for="item of [1,2]"
            :key="item"
          >
            <p
              class="hackathonConditions-items-item-text"
              v-html="$t(`hackathon.conditions.item-${item}`)"
            />
          </div>

          <div class="hackathonConditions-items-globus"></div>

          <div
            class="hackathonConditions-items-item"
            v-for="item of [3,4]"
            :key="item"
          >
            <p
              class="hackathonConditions-items-item-text"
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
  overflow: hidden;

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

    &.mobile {
      display: none;
    }

    &-globus {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &::after {
        content: '';
        
        display: block;
        width: 320px;
        height: 320px;

        background: url('/img/uiLanding/hackathon/globe.png') center no-repeat;
        background-size: cover;
        animation: rotate 10s linear infinite;
      }
    }


    &-item {
      display: flex;
      align-items: center;
      
      padding: 40px;

      border: 1.5px solid var(--accent-color);
      border-radius: 20px;

      &.alignRight {
        justify-content: end;

        & .hackathonConditions-items-item-text {
          text-align: right;
        }
      }

      &-text {
        width: 100%;
        max-width: 92%;

        font-size: 24px;
        font-weight: 400;
        color: var(--accent-color);
      }
    }
  }

  // Adaptation
  @media (max-width: 1200px) {
    &-items {
      grid-gap: 30px 58px;

      &-globus {
        &::after {
          width: 270px;
          height: 270px;
        }
      }

      &-item {
        padding: 34px 28px;
        border-radius: 20px;

        &-text {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-items {
      grid-gap: 28px 48px;

      &-globus {
        &::after {
          width: 240px;
          height: 240px;
        }
      }

      &-item {
        padding: 30px 24px;
        border-radius: 18px;

        &-text {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    &-items {
      grid-gap: 24px 40px;

      &-globus {
        &::after {
          width: 210px;
          height: 210px;
        }
      }

      &-item {
        padding: 28px 20px;
        border-radius: 16px;

        &-text {
          font-size: 16px;
        }
      }
    }
  }

  @media (max-width: 576px) {

    &::after {
      width: 500px;
      height: 500px;
      padding-left: 0;

      right: -100px;
      bottom: auto;
      top: 70%;
      transform: translateY(-50%);
    }

    &-items {
      display: none;

      &.mobile {
        display: flex;
        flex-direction: column;
        grid-gap: 0px;
      }

      &-item {
        padding: 20px 18px;
        border-radius: 14px;
        margin-bottom: 20px;

        &-text {
          width: 100%;
          font-size: 16px;
        }

        &.alignRight {
          & .hackathonConditions-items-item-text {
            text-align: left;
          }
        }
      }

      &-item:nth-child(2),
      &-item:nth-child(5) {
        margin-bottom: 0;
      }
      
      &-globus {
        height: 200px;
        width: 200px;
        
        position: relative;
        top: auto;
        left: auto;
        transform: none;

        margin: 10px auto;

        &::after {
          width: 200px;
          height: 200px;
        }
      }
    }
  }

  @media (max-width: 380px) {
    &-items {
      &-globus {
        height: 180px;
        width: 180px;
        margin: 8px auto;
        
        &::after {
          width: 180px;
          height: 180px;
        }
      }
    }
  }
}


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>