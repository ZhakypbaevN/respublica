<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <section class="landing-block">
        <div class="wrapper landing-wrapper litle">
          <div class="news">
            <div class="news-title">
              {{ $t('meeting-with-voters.title') }}
            </div>

            <div class="news-preview">
              <img src="/img/gallery/trips-to-regions/6.jpg" alt="photo" />
              <img src="/img/gallery/trips-to-regions/2.jpg" alt="photo" />
              <img src="/img/gallery/trips-to-regions/3.jpg" alt="photo" />
            </div>
            <div class="news-preview">
              <img src="/img/gallery/trips-to-regions/4.jpg" alt="photo" />
              <img src="/img/gallery/trips-to-regions/5.jpg" alt="photo" />
              <img src="/img/gallery/trips-to-regions/1.jpeg" alt="photo" />
            </div>

            <div class="news-text">
              {{ $t('meeting-with-voters.content') }}
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news {
  margin-bottom: 100px;

  &-title {
    color: var(--primary-color);
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  &-text {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 30px;
  }

  &-preview {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;

    & img {
  

      background-size: contain;
      background-repeat: no-repeat;
      width: 250px;

    }
  }
}
</style>
