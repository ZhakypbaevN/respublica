<template>
  <section class="partyProgram landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title">Программа партии</h2>
    </div>
    <div class="partyProgram-main">
      <div class="partyProgram-preview"></div>
      <div class="wrapper partyProgram-items-block">
        <div class="partyProgram-items">
          <div class="partyProgram-item">
            <h4 class="partyProgram-item-title">Программа партии Respublica </h4>
            <RouterLink to="/">
              <Button
                name="Посмотреть"
                type="outline-blue"
                class="partyProgram-item-link"
              >
                <SvgIcon
                  name="double-arrow-right"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </RouterLink>
          </div>
          
          <div class="partyProgram-item">
            <h4 class="partyProgram-item-title">Программа партии Respublica </h4>
            <RouterLink to="/">
              <Button
                name="Посмотреть"
                type="outline-blue"
                class="partyProgram-item-link"
              >
                <SvgIcon
                  name="double-arrow-right"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
import Button from '../../../components/common/Button.vue'
</script>

<style scoped lang="scss">
.partyProgram {
  &-main {
    padding-bottom: 75px;
    position: relative;
  }

  &-preview {
    padding-top: 34%;
    background: url('/img/uiLanding/party-program-bg.jpg') center no-repeat;
    background-size: cover;
  }

  &-items {
    width: 100%;
    
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;

    &-block {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 50px;

    padding: 70px 0 75px;

    border-radius: 10px 10px 0 0;
    background: #FFF;

    &-title {
      font-size: 32px;
      font-weight: 700;
    }

    &-link {
      display: flex;
      align-items: center;
      grid-gap: 10px;
      border-radius: 100px;

      & svg {
        height: 24px;
        width: 24px;
        fill: var(--accent-color);
      }
    }
  }
}
</style>