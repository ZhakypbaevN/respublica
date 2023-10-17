<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <section class="faq-block landing-block">
        <div class="wrapper landing-wrapper">
          <SvgIcon
            class="icon"
            name="grid-masonry"
            :viewboxHeight="24"
            :viewboxWidth="24"
          />
          <h2 class="title">Страница в разработке!</h2>
        </div>
      </section>
    </div>

    <Footer /> 
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* background: url('/img/landing/travel-ideas.jpg') no-repeat center; */
  background-size: cover;
}
.icon {
  display: block;
  height: 200px;
  width: 200px;
}
.title {
  font-size: 60px;

  @media (max-width: 576px) {
    font-size: 100px;
  }
}
img {
  height: 100%;
}
</style>
