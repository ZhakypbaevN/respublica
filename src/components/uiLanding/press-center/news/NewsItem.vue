<template>
  <RouterLink
    v-if="!litle"
    class="newsItem withZoomPreview"
    :class="{pressAboutUs: pressAboutUs}"
    :to="`/${pressAboutUs ? 'press-about-us-list' : 'news'}/${data.id}`"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(https://api.respublica.codetau.com/${data.preview_image});`"></div>
      <div class="newsItem-date">
        <SvgIcon
          name="calendar-check"
          :viewboxWidth="16"
          :viewboxHeight="17"
        />
        <span>{{ convertDateTime(data.created_at) }}</span>
      </div>
    </div>

    <div v-if="pressAboutUs">
      <a href="kazinform.kz" class="newsItem-author">kazinform.kz</a>

      <h4 class="newsItem-title">{{ data.title }}</h4>
    </div>

    <div v-else>
      <h4 class="newsItem-title">{{ data.title }}</h4>
      
      <div class="newsItem-line"></div>

      <p class="newsItem-description">{{ data.preview_text }}</p>
    </div>
  </RouterLink>
  
  <RouterLink
    v-else
    class="newsItemMini withZoomPreview"
    :class="{pressAboutUs: pressAboutUs}"
    :to="`/${pressAboutUs ? 'press-about-us-list' : 'news'}/${data.id}`"
  >
    <div class="newsItemMini-preview withZoomPreview-preview">
      <div class="newsItemMini-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(https://api.respublica.codetau.com/${data.preview_image});`"></div>
    </div>
    <div class="newsItemMini-text">
      <h4 class="newsItemMini-title">{{ data.title }}</h4>

      <p class="newsItemMini-description">{{ data.preview_text }}</p>

      <div class="newsItemMini-bottom">
        <div class="newsItemMini-comment">
          <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
          <span>0</span>
        </div>
        <div class="newsItemMini-date">
          <SvgIcon
            name="calendar-check-dark"
            :viewboxWidth="16"
            :viewboxHeight="17"
          />
          <span>{{ convertDateTime(data.created_at) }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import convertDateTime from '@/helpers/convertDateTime.js';

interface IProps {
  data: any,
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
  &.pressAboutUs {
    & .newsItem-preview-img {
      padding-bottom: 50%;;
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
    border-radius: 0px 10px 0px 0px;

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

    margin-bottom: 15px;
  }
}
.newsItemMini {
  display: flex;
  border-radius: 10px;
  background: #FFF;
  padding: 25px;
  margin-right: 25px;

  &-preview {
    width: 223px;
    height: 161px;
    border-radius: 10px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-text {
    width: 446px;
    margin-left: 25px;

  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
  }


  &-description {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }

  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
  }

  &-date {
    display: flex;
    grid-gap: 5px;

    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid rgba(129, 143, 167, 0.50);

    & svg {
      width: 28px;
      height: 24px;

      /* fill: var(--accent-color); */
    }

    & span {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-comment {
    display: flex;

    & span {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }

    & svg {
      width: 28px;
      height: 24px;
      fill: var(--accent-color);
    }
  }
}
.svg-btn{
  width: 24px;
  height: 24px;
  fill: #818FA7;
  margin-left: 10px;
}
.content-centre {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}
</style>
