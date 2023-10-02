<template>
<section class="landing-block" id="announcements">
  <div :class="`wrapper ${landing ? 'landing-wrapper' : ''}`">
    <h2 class="landing-title">Анонсы, объявления</h2>
    <div class="landing-items">

      <div
        class="announcement-item"
        v-for="item of list"
        :key="item.title"
      >
        <div class="announcement-preview" :style="`background-image: url('${item.img}');`"></div>

        <div class="announcement-content">
          <h4 class="announcement-title">{{ item.title }}</h4>
          <p class="announcement-text">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">

interface IProps {
  landing: boolean
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
    border-radius: 10px;
  }

  &-preview {
    padding-bottom: 44%;
    border-radius: 10px;
  }

  &-content {
    padding: 25px 25px 30px;
  }

  &-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  &-text {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>