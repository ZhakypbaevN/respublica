<template>
<LandingLayout :list="sideBarlinks">
  <section class="news landing-block" id="newsList">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Новости
        </h2>

        <RouterLink to="news-all" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="landing-items">
        <NewsItem />
        <NewsItem />
        <NewsItem />

        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  </section>

  <section class="news landing-block" id="pressAboutUS">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Пресса о нас
        </h2>

        <RouterLink to="news-all" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="landing-items">
        <NewsItem />
        <NewsItem />
        <NewsItem />

        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  </section>

  <section class="news landing-block" id="videoGallery">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Видеогалерея
        </h2>

        <RouterLink to="news-all" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="landing-items">
        <NewsItem />
        <NewsItem />
        <NewsItem />

        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  </section>
  
  <PhotoGallery />
  
  <Announcements />

</LandingLayout>
</template>

<script setup lang="ts">
import NewsItem from '../../components/uiLanding/news/newsItem.vue'

import PhotoGallery from '../../components/uiLanding/news/photoGallery.vue';
import Announcements from '../../components/uiLanding/news/announcements.vue';

const sideBarlinks = [
  {
    title: 'Депутаты',
    link: "#fraction-composition"
  },
  {
    title: 'Депутатские запросы',
    link: "#deputy-requests"
  },
  {
    title: 'Встречи с избирателями',
    link: "#meetings-with-voters"
  },
  {
    title: 'Направить обращение',
    link: "#send-an-appeal"
  }
]
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;

}

.wrapper-news {
  width: 1540px;
}

.landing-block-content {
margin: 50px 0 50px 50px;
}

.content {
  display: flex;
  max-width: 1920px;
  margin: 0 auto;

}

.wrapper-menu {
  width: 325px;
  background: #042051;
}

.left-menu {
  top: 70px;


  height: 300px;
  position: sticky;


  &-about {
    width: 285px;
    height: 56px;
    border-radius: 10px;
    background: #0B2960;
    margin-left: 20px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      color: #FFF;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
    }

    & svg {
      width: 44px;
      height: 44px;
      fill: var(--accent-color);
    }
  }

  &-list {
    margin-top: 27px;
    margin-left: 47px;

    & ul {
      & li {
        color: #FFF;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
      }
    }
  }

}
.scroll-top {
  scroll-margin-top: 9.2rem;
}

.landing-title {
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  color: #042051;
}</style>
