<template>
  <div
    v-if="pressAboutUs"
    class="newsItem withZoomPreview pressAboutUs"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img skeleton dark-gray"></div>
    </div>

    <div>
      <div class="newsItem-author skeleton middle-text dark-gray" style="width: 130px;"></div>

      <div class="newsItem-title">
        <h4
          class="skeleton dark-gray middle-text"
          style="width: 100%;margin-bottom: 10px;"
        ></h4>
        <h4 class="skeleton dark-gray middle-text" style="min-width: 40%;"></h4>
      </div>
    </div>
  </div>

  <div
    v-else-if="!litle"
    class="newsItem withZoomPreview"
  >
    <div class="newsItem-preview withZoomPreview-preview">
      <div class="newsItem-preview-img bg-cover withZoomPreview-preview-img skeleton dark-gray"></div>
    </div>

    <div>
      <div class="newsItem-title">
        <h4
          class="skeleton dark-gray middle-text"
          style="width: 100%;margin-bottom: 10px;"
        ></h4>
        <h4 class="skeleton dark-gray middle-text" style="min-width: 40%;"></h4>
      </div>
      
      <div class="newsItem-line skeleton dark-gray"></div>

      <div class="newsItem-description">
        <p
          class="skeleton dark-gray small-text"
          style="width: 100%;margin-bottom: 10px;"
        ></p>
        <p class="skeleton dark-gray small-text" style="min-width: 80%;"></p>
      </div>
    </div>
  </div>
  
  <div
    v-else
    class="newsItemMini withZoomPreview"
  >
    <div class="newsItemMini-preview withZoomPreview-preview">
      <div class="newsItemMini-preview-img bg-cover withZoomPreview-preview-img skeleton"></div>
    </div>
    <div class="newsItemMini-text">
      <h4 class="newsItemMini-title skeleton middle-text" style="min-width: 60%;"></h4>

      <p
        class="skeleton small-text"
        style="width: 100%;margin-bottom: 10px;"
      ></p>
      <p class="skeleton small-text" style="min-width: 80%;"></p>

      <div class="newsItemMini-bottom">
        <div class="skeleton" style="width: 60px; height:30px;"></div>

        <div class="skeleton" style="width: 140px; height:30px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
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

  &:hover .newsItemMini-title {
    color: var(--accent-color);
  }

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
    margin-top: 25px;
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
