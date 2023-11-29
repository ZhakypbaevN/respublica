<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <section class="faq-block landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="title">404</h2>
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
  align-items: center;
  justify-content: center;

  /* background: url('/img/landing/travel-ideas.jpg') no-repeat center; */
  background-size: cover;
}

.title {
  font-size: 200px;

  @media (max-width: 576px) {
    font-size: 100px;
  }
}
</style>
