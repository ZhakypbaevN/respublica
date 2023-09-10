<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <div class="content">
        <div class="wrapper-menu">
          <div class="left-menu">
            <div class="left-menu-about">
              <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
              <span>О партии</span>
            </div>
            <div class="left-menu-list">
              <ul>
                <a href="#newsList">
                  <li>Новости</li>
                </a>
                <a href="#pressAboutUS">
                  <li>Пресса о нас</li>
                </a>
                <a href="#videoGallery">
                  <li>Видеогалерея</li>
                </a>
                <a href="#photoGallery">
                  <li>Фотогалерея</li>
                </a>
                <a href="#announcements">
                  <li>Анонсы, объявления</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <section class="landing-block-content">
          <div class="wrapper wrapper-news">
            <div id="newsList" class="scroll-top">
              <NewsList />
            </div>
            
            <div id="pressAboutUS" class="scroll-top">
              <PressAboutUS />
            </div>
           
            <div id="videoGallery" class="scroll-top">
              <VideoGallery />
            </div>
            
            <div id="photoGallery" class="scroll-top">
              <PhotoGallery />
            </div>
            
            <div id="announcements" >
              <Announcements />
            </div>
          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import NewsList from '../../components/uiLanding/news/newsList.vue';
import PressAboutUS from '../../components/uiLanding/news/pressAboutUs.vue';
import VideoGallery from '../../components/uiLanding/news/videoGallery.vue';
import PhotoGallery from '../../components/uiLanding/news/photoGallery.vue';
import Announcements from '../../components/uiLanding/news/announcements.vue';
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
