<template>
  <div class="newsItem-item">
    <div class="newsItem-item-preview">
      <div class="newsItem-item-date">
        <SvgIcon
          name="calendar-check"
          :viewboxWidth="16"
          :viewboxHeight="17"
        />
        <span>12:30, 5 июля 2023</span>
      </div>
    </div>
    <h4 class="newsItem-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

    <div class="newsItem-item-line"></div>

    <p class="newsItem-item-description">Этому предшествовала большая работа фракции партии Respublica, государственных и общественных организаций.</p>
  </div>
  
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
</script>

<style scoped lang="scss">
.newsItem-item {
  &-preview {
    padding-bottom: 70%;
    margin-bottom: 15px;
    
    background: var(--accent-color) url('/img/uiLanding/news-example.jpg') center no-repeat;
    background-size: cover;
    border-radius: 10px;

    position: relative;
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

  &-title {
    font-size: 20px;
    font-weight: 700;

    margin-bottom: 20px;
  }

  &-line {
    width: 54px;
    height: 3px;

    background-color: var(--accent-color);
    margin-bottom: 15px;
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
