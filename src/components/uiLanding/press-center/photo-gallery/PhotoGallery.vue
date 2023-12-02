<template>
  <section class="photoGallery landing-block" id="photoGallery">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">{{ $t('page.photo-gallery') }}</h2>

        <RouterLink to="photo-gallery" class="landing-header-link">
          <span>{{ $t('button.view-all') }}</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>

      <div class="gallery">
        <div class="gallery-photos">
          <button
            class="gallery-photo-btn withZoomPreview"
            v-for="photo of photosList"
            :key="photo.src"
          >
            <div class="gallery-photo withZoomPreview-preview">
              <div
                class="gallery-photo-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${photo.src});`"
              ></div>
            </div>
          </button>
        </div>
        <div class="gallery-albums">
          <button
            v-for="(albom, idx) of gallerylist"
            :key="albom.name"
            class="gallery-album withZoomPreview"
            :class="{ active: albom.active }"
            @click="() => toggleShow(idx)"
          >
            <div class="gallery-album-preview withZoomPreview-preview">
              <div
                class="gallery-album-preview-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${albom.photos[0].src});`"
              ></div>
            </div>

            <div class="gallery-album-info">
              <span class="gallery-album-info-name">{{ albom.name }}</span>
              <span class="gallery-album-info-date"></span>
              <span class="gallery-album-info-city">Астана</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const gallerylist = reactive([
  {
    name: "Мероприятия",
    date: "",
    location: "",
    active: true,
    photos: [
      { src: "/img/gallery/events/3.png", descrition: "Встреча в Атырау" },
      { src: "/img/gallery/events/1.jpg", descrition: "акция Образованное поколение" },
      { src: "/img/gallery/events/2.JPG", descrition: "Акция ТАГЗЫМ - 31.05.23" },
      { src: "/img/gallery/events/4.jpg", descrition: "День защиты детей - 1.06.2023" },
      { src: "/img/gallery/events/5.JPG", descrition: "День защиты детей - дети в Мажилисе - 1.06.2023" },
      { src: "/img/gallery/events/6.jpeg", descrition: "Итоги конкурса рисунков Моя республика - 6.06.2023" },
      { src: "/img/gallery/events/7.jpg", descrition: "Открытие площади" },
      { src: "/img/gallery/events/8.jpg", descrition: "Послание - Н.Тау" },
      { src: "/img/gallery/events/9.jpg", descrition: "Фракция - встреча по КТЖ" },
      { src: "/img/gallery/events/10.jpeg", descrition: "Фракция - встреча Р.Берденова по лудомании" },
      { src: "/img/gallery/events/11.JPG", descrition: "Фракция - встреча с Минздрав" },
      { src: "/img/gallery/events/12.JPG", descrition: "Фракция - Динара Наумова - рабочая группа" },
      { src: "/img/gallery/events/13.PNG", descrition: "Фракция - заседаие" }
    ],
  },
  {
    name: "III съезд партии",
    date: "",
    location: "",
    active: false,
    photos: [
      { src: "/img/gallery/conference-three/1.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/2.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/3.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/4.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/5.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/6.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/7.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/8.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/9.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/10.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/11.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/12.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/13.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/14.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/15.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/16.jpg", descrition: "III съезд" },
      { src: "/img/gallery/conference-three/17.jpg", descrition: "III съезд" }
    ],
  },  {
    name: "Поездки в регионы",
    date: "",
    location: "",
    active: false,
    photos: [
      { src: "/img/gallery/trips-to-regions/1.jpeg", descrition: "Акмола - О.Куспеков" },
      { src: "/img/gallery/trips-to-regions/2.jpg", descrition: "Актобе - Д.Наумова" },
      { src: "/img/gallery/trips-to-regions/3.jpg", descrition: "Алматы - Н.Тау" },
      { src: "/img/gallery/trips-to-regions/4.jpg", descrition: "Атырау - Р.Берденов" },
      { src: "/img/gallery/trips-to-regions/5.jpg", descrition: "ВКО - Берденов" },
      { src: "/img/gallery/trips-to-regions/6.jpg", descrition: "Жамбыл - А.Ходжаназаров" },
      { src: "/img/gallery/trips-to-regions/7.jpg", descrition: "ЗКО - А.Ходжаназаров и Д.Шукижанова" },
      { src: "/img/gallery/trips-to-regions/8.jpeg", descrition: "Семей - Д.Шукижанова" }
    ],
  }
]);

const photosList = ref(gallerylist[0].photos);

const toggleShow = (idx: number) => {
  for (let i = 0; i < gallerylist.length; i++) {
    gallerylist[i].active = false;
  }
  gallerylist[idx].active = true;
  photosList.value = gallerylist[idx].photos;
};
</script>

<style scoped lang="scss">
.gallery {
  width: 100%;
  height: 650px;

  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr 500px;

  &-photos {
    /*max-height: 100px;*/
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    overflow-y: scroll;
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
    transition: 0.3s ease-in-out;

    position: relative;

    &::after {
      content: "";

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

        transition: 0.3s ease-in-out;
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
