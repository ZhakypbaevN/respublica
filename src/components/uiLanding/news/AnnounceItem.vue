<template>
  <RouterLink
    class="announcement withZoomPreview"
    :class="{litle: litle}"
    :to="`/announce/${data.id}`"
  >
    <div class="announcement-preview withZoomPreview-preview">
      <div class="announcement-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(/img/announcement.png);`"></div>
    </div>

    <div class="announcement-content">
      <h4 class="announcement-title">{{ data.title }}</h4>
      <p class="announcement-text" v-html="data.content"></p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
interface IProps {
  data: any,
  litle?: boolean
}

withDefaults(defineProps<IProps>(), {
  litle: false
})
</script>

<style  scoped lang="scss">
.announcement {
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

  &.litle {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 20px;

    padding: 10px;

    border-radius: 10px;
    border-color: transparent;
    background-color: transparent;
    overflow: hidden;

    & .announcement-preview-img {
      padding-bottom: 60%;
    }

    & .announcement-content {
      padding: 0px;
      -webkit-line-clamp: 3;
      background-color: transparent !important;
    }

    &:hover {
      border-color: var(--accent-color);
      background-color: var(--accent-color-op05);
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
    
    min-height: 3pc;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
<style>
.announcement-text br:first-child {
  display: none;
}
</style>