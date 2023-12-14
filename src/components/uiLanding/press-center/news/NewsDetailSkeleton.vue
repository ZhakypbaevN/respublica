<template>
  <div class="wrapper landing-wrapper litle">
    <div class="newsDetail">
      <div class="newsDetail-title skeleton long-text" style="min-width: 80%;"></div>

      <div class="newsDetail-preview withZoomPreview-preview">
        <div class="newsDetail-preview-img bg-cover withZoomPreview-preview-img skeleton"></div>
      </div>

      <div class="newsDetail-subtitle">
        <p class="skeleton small-text" style="width: 100%;margin-bottom: 10px;"></p>
        <p class="skeleton small-text" style="min-width: 80%;"></p>
      </div>

      <div class="newsDetail-text">
        <h3 class="skeleton middle-text" style="min-width: 300px;margin-bottom: 20px;"></h3>

        <p
          class="skeleton small-text"
          style="width: 100%;margin-bottom: 10px;"
          v-for="item in 10"
          :key="item"
        ></p>
        <p class="skeleton small-text" style="min-width: 80%;"></p>
      </div>

      <div class="newsDetail-bottom">
        <div class="skeleton" style="width: 60px; height:30px;"></div>

        <div class="skeleton" style="width: 140px; height:30px;"></div>
      </div>

      <div class="newsDetail-comments"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsDetail {
  width: 100%;
  margin-bottom: 60px;

  &-title {
    color: var(--primary-color);
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  &-subtitle {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  &-text {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 30px;
  }

  &-preview {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;

    &-img {
      padding-bottom: 56.36%;
    }
  }

  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;

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
}
</style>