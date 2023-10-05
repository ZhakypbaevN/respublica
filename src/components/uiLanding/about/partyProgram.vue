<template>
  <section class="partyProgram landing-block" id="party-program">
    <div class="wrapper">
      <div class="partyProgram-item">
        <img src="/img/about/program-one.jpg" alt="">
        <span class="partyProgram-title">Restart. Reforma. Respublica </span>
        <span class="partyProgram-sub-title">программа партии</span>
        
        <a href="/doc/ru/Программа партии_.pdf" target="_blank">
          <Button name="Скачать PDF" type="outline-blue" class="partyProgram-btn">
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </a>
      </div>
      
      <div class="partyProgram-item">
        <img src="/img/about/program-two.jpg" alt="">
        <span class="partyProgram-title">Это Новый Казахстан!</span>
        <span class="partyProgram-sub-title">предвыборная программа партии</span>
        
        <a href="/doc/ru/Программа предвыборная рус..pptx" target="_blank">
          <Button name="Скачать PDF" type="outline-blue" class="partyProgram-btn">
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.partyProgram {
  & .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }

  &-item {
    background-color: var(--white-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 20px;
  }

  & img {
    width: 100%;
    margin-bottom: 20px;
  }

  &-title {
    font-size: 28px;
    font-weight: 700;
    line-height: 40px;
    text-transform: uppercase;
    color: var(--primary-color);

  }

  &-sub-title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    text-transform: uppercase;
    color: var(--primary-color);
    margin-bottom: 21px;
  }

  &-btn {
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
</style>