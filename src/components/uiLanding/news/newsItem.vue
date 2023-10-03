<template>
  <RouterLink
    class="newsItem withZoomPreview"
    :class="{pressAboutUs: pressAboutUs}"
    to="/news/1"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img"></div>
      <div class="newsItem-date">
        <SvgIcon
          name="calendar-check"
          :viewboxWidth="16"
          :viewboxHeight="17"
        />
        <span>12:30, 5 июля 2023</span>
      </div>
    </div>

    <div v-if="pressAboutUs">
      <a href="kazinform.kz" class="newsItem-author">kazinform.kz</a>

      <h4 class="newsItem-title">Полный запрет вейпов будет введен в Казахстане</h4>
    </div>

    <div v-else>
      <h4 class="newsItem-title">Полный запрет вейпов будет введен в Казахстане</h4>
      
      <div class="newsItem-line"></div>

      <p class="newsItem-description">Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.</p>
    </div>
  </RouterLink>
  
  <!-- <div class="newsItemMini">
    <img class="newsItemMini-preview" src="/img/uiLanding/news-example.jpg" alt="">
    <div class="newsItemMini-text">
      <h4 class="newsItemMini-title">Полный запрет вейпов будет введен в Казахстане</h4>

      <p class="newsItemMini-description">Этому предшествовала большая работа фракции партии Respublica,
        государственных и общественных организаций.</p>

      <div class="newsItemMini-bottom">
        <div class="newsItemMini-comment">
          <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
          <span>0</span>
        </div>
        <div class="newsItemMini-date">
          <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
          <span>12:30, 5 июля 2023</span>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
interface IProps {
  pressAboutUs?: boolean
}

withDefaults(defineProps<IProps>(), {
  pressAboutUs: false
})


</script>

<style scoped lang="scss">
.newsItem {
  &.pressAboutUs {
    & .newsItem-preview {
      padding-bottom: 44%;;
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
      padding-bottom: 70%;
      background-image: url('/img/uiLanding/news-example.jpg');
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
    line-height: 1.5;
    margin-bottom: 15px;
  }
}
.newsItemMiniMini {
  display: flex;
  border-radius: 10px;
  background: #FFF;
  padding: 25px;
  margin-right: 25px;

  &-preview {
    width: 223px;
    height: 161px;
    border-radius: 10px;
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
      fill: var(--accent-color);
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
