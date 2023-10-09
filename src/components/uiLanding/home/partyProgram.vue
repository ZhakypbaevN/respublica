<template>
  <section class="partyProgram landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title">Программа партии Respublica</h2>
    </div>
    <div class="partyProgram-main">
      <div class="partyProgram-preview"></div>
      <div class="partyProgram-items-block">
        <div class="partyProgram-items">
          <div class="partyProgram-item" v-for="block of blockList" :key="block.title">
            <h4 class="partyProgram-item-title">{{ block.title }}</h4>
            <a :href="block.pdf" target="_blank">
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
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const blockList = [
  {
    title: "Программа партии",
    pdf: "/doc/ru/Программа партии_.pdf",
  },
  {
    title: "Предвыборная программа партии",
    pdf: "/doc/ru/Программа предвыборная рус.pdf",
  },
];
</script>

<style scoped lang="scss">
.partyProgram {
  &-main {
    padding-bottom: 75px;
    position: relative;
  }

  &-preview {
    padding-top: 34%;
    background: url("/img/uiLanding/slides/slider-3.jpg") center no-repeat;
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
      width: 1440px;
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 50px;

    padding: 70px 0 75px;

    border-radius: 10px 10px 0 0;
    background: #fff;

    &-title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
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
        position: relative;
        right: 0;

        transition: all 0.3s ease-in-out;
      }

      &:hover svg {
        right: -8px;
      }
    }
  }
}
</style>
