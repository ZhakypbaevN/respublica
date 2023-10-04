<template>
<section class="landing-block" id="announcements">
  <div :class="`wrapper ${landing ? 'landing-wrapper' : ''}`">
    <h2 class="landing-title">Анонсы, объявления</h2>
    <div class="landing-items">

      <RouterLink
        class="announcement-item withZoomPreview"
        v-for="item of list"
        :key="item.title"
        to="/news/1"
      >
        <div class="announcement-preview withZoomPreview-preview">
          <div class="announcement-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url('${item.img}');`"></div>
        </div>

        <div class="announcement-content">
          <h4 class="announcement-title">{{ item.title }}</h4>
          <p class="announcement-text">
            {{ item.description }}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">

interface IProps {
  landing?: boolean
}

withDefaults(defineProps<IProps>(), {
  landing: false
})

const list = [
  {
    title: 'Обьяление',
    img: '/img/announcement.png',
    description: 'Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в топовые IT компании, прокачать свои soft скиллы, научиться'
  },
  {
    title: 'Обьяление',
    img: '/img/announcement.png',
    description: 'Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в топовые IT компании, прокачать свои soft скиллы, научиться'
  },
  {
    title: 'Обьяление',
    img: '/img/announcement.png',
    description: 'Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в топовые IT компании, прокачать свои soft скиллы, научиться'
  }
]
</script>

<style  scoped lang="scss">
.announcement {
  &-item {
    display: flex;
    flex-direction: column;
    background-color: var(--white-color);
    border: 1px solid var(--border-light-gray);
    filter: drop-shadow(0px 4px 13px rgba(74, 120, 236, 0.0));
    border-radius: 10px;

    transition: all .3s ease-in-out;

    &:hover {
      border-color: var(--accent-color);
      filter: drop-shadow(0px 4px 13px rgba(74, 120, 236, 0.10));
      & .announcement-title {
        color: var(--accent-color);
      }

      & .announcement-content {
        background-color: var(--accent-color-op05);
      }
    }
  }

  &-preview {
    border-radius: 10px;
    
    &-img {
      padding-bottom: 44%;
    }
  }

  &-content {
    padding: 25px 25px 30px;
    border-radius: 10px;
    background-color: transparent;

    transition: all .3s ease-in-out
  }

  &-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;

    transition: all .3s ease-in-out
  }

  &-text {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>