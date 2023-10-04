<template>
  <div class="notFoundPage">
    <Header />
    <div class="wrapper wrapper-landing">
      <h2 class="title">404</h2>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: url('/img/landing/travel-ideas.jpg') no-repeat center;
  background-size: cover;
}

.notFoundPage {
}

.title {
  font-size: 200px;
  color: white;

  @media (max-width: 576px) {
    font-size: 100px;
  }
}
img {
  height: 100%;
}
</style>
