<template>
  <a
    v-if="pressAboutUs"
    class="newsItem withZoomPreview pressAboutUs"
    target="_blank"
    :href="data.source_url"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${getFileUrl(data.preview_image)});`"></div>
      <div class="newsItem-date">
        <SvgIcon
          name="calendar-check"
          :viewboxWidth="16"
          :viewboxHeight="17"
        />
        <span>{{ convertDateTime(data.created_at) }}</span>
      </div>
    </div>

    <div>
      <a href="kazinform.kz" class="newsItem-author">{{ data.source_title }}</a>

      <h4 class="newsItem-title">{{ data.title }}</h4>
    </div>
  </a>

  <RouterLink
    v-else-if="!litle"
    class="newsItem withZoomPreview"
    :to="`/news/${data.id}`"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${getFileUrl(data.preview_image)});`"></div>
      <div class="newsItem-date">
        <SvgIcon
          name="calendar-check"
          :viewboxWidth="16"
          :viewboxHeight="17"
        />
        <span>{{ convertDateTime(data.created_at) }}</span>
      </div>
    </div>

    <div>
      <h4 class="newsItem-title">{{ data.title }}</h4>
      
      <div class="newsItem-line"></div>

      <p class="newsItem-description">{{ data.preview_text }}</p>
    </div>
  </RouterLink>
  
  <RouterLink
    v-else
    class="newsItemMini withZoomPreview"
    :to="`/news/${data.id}`"
  >
    <div class="newsItemMini-preview withZoomPreview-preview">
      <div class="newsItemMini-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${getFileUrl(data.preview_image)});`"></div>
    </div>

    <div class="newsItemMini-content">
      <div>
        <h4 class="newsItemMini-title">{{ data.title }}</h4>

        <p class="newsItemMini-description">{{ data.preview_text }}</p>
      </div>

      <div class="newsItemMini-bottom">
        <div class="newsItemMini-views">
          <SvgIcon
            name="view"
            :viewboxWidth="24"
            :viewboxHeight="24"
          />
          <span>{{ data.views_count }}</span>
        </div>

        <div class="newsItemMini-date">
          <SvgIcon
            name="calendar"
            :viewboxWidth="24"
            :viewboxHeight="24"
          />
          <span>{{ convertDateTime(data.created_at) }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import { INews } from '@/types/news';
  import getFileUrl from '@/helpers/getFileUrlByDate'
  import convertDateTime from '@/helpers/convertDateTime.js';

  interface IProps {
    data: INews,
    pressAboutUs?: boolean,
    litle?: boolean,
  }

  withDefaults(defineProps<IProps>(), {
    pressAboutUs: false,
    litle: false
  })
</script>

<style scoped lang="scss">
.newsItem {
  overflow: hidden;
  &.pressAboutUs {
    & .newsItem-preview-img {
      padding-bottom: 50%;;
    }

    & .newsItem-title {
      margin-bottom: 0px !important;
    }
  }

  &:hover {
    & .newsItem-title {
      color: var(--accent-color);
    }

    & .newsItem-line {
      max-width: 100%;
    }
  }

  &-preview {
    border-radius: 10px;
    
    margin-bottom: 15px;
    position: relative;
    
    &-img {
      padding-bottom: 56.36%;
    }
  }

  &-date {
    display: flex;
    align-items: center;
    grid-gap: 7px;

    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--primary-color);

    padding: 5px 15px;
    border-top-right-radius: 10px;

    & svg {
      width: 16px;
      height: 17px;
      fill: var(--accent-color);
    }

    & span {
      color: white;
      font-size: 16px;
      line-height: 1.4;
      font-weight: 500;
    }
  }

  &-author {
    display: inline-block;
    color: var(--light-gray-color);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  &-title,
  &-description {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
            line-clamp: 2; 
    -webkit-box-orient: vertical;
  }

  &-title {
    font-size: 20px;
    font-weight: 700;

    margin-bottom: 20px;
    transition: all .3s ease-in-out;
  }

  &-line {
    width: 100%;
    max-width: 54px;
    height: 3px;

    background-color: var(--accent-color);
    margin-bottom: 15px;
    transition: all .3s ease-in-out;
  }

  &-description {
    font-size: 20px;
    line-height: 1.2;
  }

  // Adaptation
  @media (max-width: 1200px) {
    &-preview {
      border-radius: 10px;
      margin-bottom: 12px;
    }

    &-date {
      grid-gap: 7px;
      padding: 5px 15px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }

    &-author {
      font-size: 18px;
      margin-bottom: 12px;
    }

    &-title {
      font-size: 20px;
      margin-bottom: 16px;
    }

    &-line {
      height: 3px;
      margin-bottom: 12px;
    }

    &-description {
      font-size: 18px;
    }
  }

  @media (max-width: 992px) {
    &-preview {
      border-radius: 10px;
      margin-bottom: 12px;
    }

    &-date {
      grid-gap: 7px;
      padding: 5px 15px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }

    &-author {
      font-size: 18px;
      margin-bottom: 12px;
    }

    &-title {
      font-size: 20px;
      margin-bottom: 12px;
    }

    &-line {
      height: 3px;
      margin-bottom: 10px;
    }

    &-description {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {
    &-preview {
      border-radius: 8px;
      margin-bottom: 10px;
    }

    &-date {
      grid-gap: 7px;
      padding: 4px 10px;

      & svg {
        width: 16px;
        height: 17px;
      }

      & span {
        font-size: 16px;
      }
    }

    &-author {
      font-size: 18px;
      margin-bottom: 10px;
    }

    &-title {
      font-size: 20px;
      margin-bottom: 10px;
    }

    &-line {
      height: 2.6px;
      margin-bottom: 8px;
    }

    &-description {
      font-size: 18px;
    }
  }

  @media (max-width: 380px) {
    &-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
.newsItemMini {
  display: grid;
  align-items: flex-start;
  grid-template-columns: 220px 1fr;
  grid-gap: 25px;

  &:hover .newsItemMini-title {
    color: var(--accent-color);
  }

  &-preview {
    border-radius: 10px;

    &-img {
      padding-bottom: 72%;
    }
  }

  &-content {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;

    transition: all .3s ease-in-out;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
            line-clamp: 2; 
    -webkit-box-orient: vertical;
  }


  &-description {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
            line-clamp: 2; 
    -webkit-box-orient: vertical;
  }

  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-date {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid var(--light-gray-color-op50);

    & svg {
      width: 20px;
      height: 20px;

      /* fill: var(--accent-color); */
    }

    & span {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-views {
    display: flex;
    align-items: center;
    grid-gap: 4px;

    & span {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }

    & svg {
      width: 22px;
      height: 22px;

      fill: var(--accent-color);
    }
  }

  // Adaptation
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
    
    &-preview {
      border-radius: 10px;

      &-img {
        padding-bottom: 50%;
      }
    }

    &-content {
      grid-gap: 24px;
    }

    &-title {
      font-size: 20px;
      margin-bottom: 8px;
    }

    &-date {
      grid-gap: 8px;

      padding: 5px 10px;
      border-radius: 3px;

      & svg {
        width: 20px;
        height: 20px;
      }
    }

    &-views {
      & svg {
        width: 22px;
        height: 22px;
      }
    }
  }

  @media (max-width: 380px) {
    grid-gap: 18px;
    
    &-preview {
      border-radius: 8px;
    }

    &-content {
      grid-gap: 22px;
    }

    &-title {
      font-size: 18px;
      margin-bottom: 4px;
    }

    &-date {
      grid-gap: 4px;

      padding: 3px 7px;
      border-radius: 3px;

      & svg {
        width: 18px;
        height: 18px;
      }
    }

    &-views {
      & svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
