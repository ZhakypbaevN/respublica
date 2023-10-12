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
          <button
            class="gallery-photo-btn withZoomPreview"
            v-for="photo of photosList"
            :key="photo"
          >
            <div class="gallery-photo withZoomPreview-preview">
              <div class="gallery-photo-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${photo});`"></div>
            </div>
          </button>
        </div>
        <div class="gallery-albums">
          <button
            v-for="(albom, idx) of gallerylist"
            :key="albom.name"
            class="gallery-album withZoomPreview"
            :class="{active: albom.active}"
            @click="() => toggleShow(idx)"
          >
            <div class="gallery-album-preview withZoomPreview-preview">
              <div class="gallery-album-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${albom.photos[0]});`"></div>
            </div>

            <div class="gallery-album-info">
              <span class="gallery-album-info-name">{{ albom.name }}</span>
              <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
              <span class="gallery-album-info-city">Астана</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const gallerylist = reactive([
  {
    name: 'Учредительный съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    active: true,
    photos: [
      'https://i.pinimg.com/564x/e6/e2/43/e6e2432cd3e481a74ae49ec4e069b0aa.jpg',
      'https://i.pinimg.com/564x/6e/86/6d/6e866d39774a9a3f1062c3aa2b9369bf.jpg',
      'https://i.pinimg.com/564x/cb/26/99/cb269935fad4870de6763bfc4a5b1a81.jpg',
      'https://i.pinimg.com/564x/1e/9f/a0/1e9fa0b9529a354fe875a3a180d9ce2c.jpg',
    ]
  },
  {
    name: 'II съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    active: false,
    photos: [
      'https://i.pinimg.com/564x/96/05/b2/9605b2f33b16d04440bde1ad8c0d26a7.jpg',
      'https://i.pinimg.com/564x/c4/c2/d2/c4c2d2b8304ab8c45bf5add1e3ecb295.jpg',
      'https://i.pinimg.com/564x/4c/02/a7/4c02a758e7086f2329f3c7371848792e.jpg',
      'https://i.pinimg.com/564x/96/f5/dd/96f5dd9b4ea0b3b70484e0beb7329d07.jpg'
    ]
  },
  {
    name: 'III съезд партии',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    active: false,
    photos: [
      'https://i.pinimg.com/564x/d5/87/81/d58781138d4fb33ec7622604e1cea887.jpg',
      'https://i.pinimg.com/564x/8b/f8/cb/8bf8cbbb5d6e9d75e37f440d41c6517a.jpg',
      'https://i.pinimg.com/564x/47/0c/32/470c3235328ee95aa972c1237fe3b888.jpg',
      'https://i.pinimg.com/564x/0d/71/3f/0d713f189c575579bf1080f511960b94.jpg'
    ]
  },
  {
    name: 'Встречи с избирателями',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    active: false,
    photos: [
      'https://i.pinimg.com/564x/c3/db/d8/c3dbd839997c16ceebd24078912f63b0.jpg',
      'https://i.pinimg.com/564x/2c/b4/61/2cb4617b4a5202fe9faaafebcf20994b.jpg',
      'https://i.pinimg.com/564x/cb/bd/cb/cbbdcbb3270b1ead73ef42e070d7592c.jpg',
      'https://i.pinimg.com/564x/dc/7d/a3/dc7da3c0cb5aede2baf3b721ffd1f099.jpg',
      'https://i.pinimg.com/564x/81/85/91/8185910b9087760ee3d5cb4afaec81c5.jpg'
    ]
  },
  {
    name: 'Мероприятия',
    date: 'Июль 20, 2023 01:51',
    location: 'Астана',
    active: false,
    photos: [
      'https://i.pinimg.com/564x/15/d7/87/15d7879cc386f8910c6e7ab648c6cdf0.jpg',
      'https://i.pinimg.com/564x/8c/b8/a8/8cb8a8d0a0667017843325bd0b0c23e4.jpg',
      'https://i.pinimg.com/736x/19/5b/94/195b945a4dd8aeaa6b3f69eaf4587349.jpg',
      'https://i.pinimg.com/564x/b6/d0/f5/b6d0f535cba26b7b11cb0877915094ac.jpg',
      'https://i.pinimg.com/564x/0e/b2/2c/0eb22c78b0c6b2348aaa28afb8eae2f6.jpg'
    ]
  }
]);

const photosList = ref(gallerylist[0].photos)

const toggleShow = (idx: number) => {
  for (let i = 0; i < gallerylist.length; i++) {
    gallerylist[i].active = false;
  }
  gallerylist[idx].active = true;
  photosList.value = gallerylist[idx].photos;

}
</script>

<style  scoped lang="scss">
.gallery {
  width: 100%;
  height: 650px;

  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr 500px;

  &-photos {
    max-height: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  &-photo {
    &-img {
      padding-bottom: 65%;
    }
  }

  &-albums {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    
    overflow-y: auto;
    
    margin-left: 45px;

    & .gallery-album:last-of-type::after {
      display: none;
    }
  }

  &-album {
    display: grid;
    grid-template-columns: 110px 1fr;

    padding: 20px 25px;
    border-radius: 5px;
    border: 2px transparent solid;
    
    cursor: pointer;
    transition: .3s ease-in-out;

    position: relative;

    &::after {
      content: '';

      display: block;
      width: 100%;
      height: 0;

      position: absolute;
      bottom: -12px;
      left: 0;

      border-bottom: 1px solid var(--light-gray-color-op20);
    }

    &:hover {
      background-color: var(--accent-color-op10);
      border-color: transparent;
    }

    &.active {
      border-radius: 10px;
      border-color: var(--accent-color-op30);
      background-color: var(--accent-color-op10);

      & .gallery-album-info-name {
        color: var(--accent-color);
      }
    }

    &-preview {
      border-radius: 100px;

      &-img {
        padding-bottom: 100%;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-left: 20px;

      &-name {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;

        transition: .3s ease-in-out;
      }

      &-date {
        font-size: 18px;
        color: var(--light-gray-color);
        font-weight: 500;
        margin-bottom: 10px;
      }

      &-city {
        font-size: 18px;
        font-weight: 400;
        color: var(--grey-color);
      }
    }
  }
}
</style>