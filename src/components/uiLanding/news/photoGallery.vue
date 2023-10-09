<template>
  <section class="photoGallery landing-block" id="photoGallery">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Фотогалерея
        </h2>

        <RouterLink to="photo-gallery" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="gallery">
        <div class="gallery-photos">
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>

            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
            </div>

        </div>
        <div class="gallery-albums">
          <div
            class="gallery-album"
            v-for="albom of gallery"
            :key="albom.name"
          >
            <img :src="albom.photos[0]" alt="">
            <div class="gallery-album-info">
              <span class="gallery-album-info-name">{{ albom.name }}</span>
              <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
              <span class="gallery-album-info-city">Астана</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const gallery = [
  {
    name: 'Учредительный съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    photos: [
      'https://i.pinimg.com/564x/1b/84/99/1b8499e873f8462c9905612b76c51ef9.jpg',
      'https://i.pinimg.com/564x/db/14/fd/db14fdbaa66b3b4ff807c73d78282de8.jpg'
    ]
  },
  {
    name: 'II съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    photos: [
      'https://i.pinimg.com/564x/1b/84/99/1b8499e873f8462c9905612b76c51ef9.jpg',
      'https://i.pinimg.com/564x/db/14/fd/db14fdbaa66b3b4ff807c73d78282de8.jpg'
    ]
  },
  {
    name: 'III съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    photos: [
      'https://i.pinimg.com/564x/1b/84/99/1b8499e873f8462c9905612b76c51ef9.jpg',
      'https://i.pinimg.com/564x/db/14/fd/db14fdbaa66b3b4ff807c73d78282de8.jpg'
    ]
  },
  {
    name: 'Встречи с избирателями',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    photos: [
      'https://i.pinimg.com/564x/1b/84/99/1b8499e873f8462c9905612b76c51ef9.jpg',
      'https://i.pinimg.com/564x/db/14/fd/db14fdbaa66b3b4ff807c73d78282de8.jpg'
    ]
  },
  {
    name: 'Мероприятия',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    photos: [
      'https://i.pinimg.com/564x/1b/84/99/1b8499e873f8462c9905612b76c51ef9.jpg',
      'https://i.pinimg.com/564x/db/14/fd/db14fdbaa66b3b4ff807c73d78282de8.jpg'
    ]
  }
]
</script>

<style  scoped lang="scss">
.gallery {
  width: 100%;
  display: flex;

  &-photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }

  &-photo {
    & img {
      width: 271px;
      height: 190px;
    }
  }

  &-albums {
    display: flex;
    flex-direction: column;
    height: 650px;
    width: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 45px;
  }

  &-album {
    display: flex;
    height: 150px;
    width: 517px;
    padding: 20px 25px;
    border-bottom: 1px rgba(129, 143, 167, 0.50) solid;

    & img {
      width: 110px;
      height: 110px;
      border-radius: 100px;
    }

    &-info {
      display: flex;
      flex-direction: column;
      margin-left: 20px;

      &-name {
        font-weight: 700;
        color: var(--primary-color);
        font-size: 20px;
        margin-bottom: 15px;
      }

      &-date {
        font-size: 18px;
        color: var(--light-gray-color);
        font-weight: 500;
        margin-bottom: 15px;
      }

      &-city {
        font-size: 18px;
        font-weight: 400;
        color: var(--grey-color);
      }
    }
  }
}

.active {
  background-color: #4A78EC1A;
}
</style>