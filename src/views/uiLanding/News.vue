<template>
<LandingLayout :list="sideBarlinks">
  <section class="news landing-block" id="newsList">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Новости
        </h2>

        <RouterLink to="/news-all" class="landing-header-link">
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

        <RouterLink to="/press-about-us-list" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="landing-items">
        <NewsItem pressAboutUs />
        <NewsItem pressAboutUs />
        <NewsItem pressAboutUs />

        <NewsItem pressAboutUs />
        <NewsItem pressAboutUs />
        <NewsItem pressAboutUs />
      </div>
    </div>
  </section>

  <section class="news landing-block" id="videoGallery">
    <div class="wrapper">
      <div class="landing-header">
        <h2 class="landing-title">
          Видеогалерея
        </h2>

        <RouterLink to="/video-gallery" class="landing-header-link">
          <span>Смотреть все</span>
          <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
        </RouterLink>
      </div>
      
      <div class="landing-items">
        <YoutubeVideo
          v-for="vidoe of youtubeVideos"
          :key="vidoe"
          :vidoe="vidoe"
        ></YoutubeVideo>
      </div>
    </div>
  </section>
  
  <PhotoGallery />

  <section class="contacts landing-block" id="contacts">
    <div class="wrapper">
      <div class="contacts-inner">
        <h2 class="contacts-title">
          Пресс-служба партии Respublica
        </h2>

        <a class="contacts-link" href="tel:+77017228251">
          <SvgIcon name="call-white" :viewboxWidth="52" :viewboxHeight="52" />
          <span>8 701 722 8251</span>
        </a>

        <a class="contacts-link" href="mailto:akparat2020@gmail.com">
          <SvgIcon name="mail-white" :viewboxWidth="52" :viewboxHeight="52" />
          <span>akparat2020@gmail.com</span>
        </a>
      </div>
    </div>
  </section>

</LandingLayout>
</template>

<script setup lang="ts">
import NewsItem from '../../components/uiLanding/news/NewsItem.vue'
import YoutubeVideo from '../../components/uiLanding/news/YoutubeVideo.vue'

import PhotoGallery from '../../components/uiLanding/news/PhotoGallery.vue';

const sideBarlinks = [
  {
    title: 'Новости',
    link: "#newsList"
  },
  {
    title: 'Пресса о нас',
    link: "#pressAboutUS"
  },
  {
    title: 'Видеогалерея',
    link: "#videoGallery"
  },
  {
    title: 'Фотогалерея',
    link: "#photoGallery"
  },
  {
    title: 'Анонсы, объявления',
    link: "#announcements"
  },
  {
    title: 'Контакты пресс-службы',
    link: "#contacts"
  }
]

const youtubeVideos = [
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/NWPdwjlhk8E?si=IEuuidab_4uKs3pl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/f6atkSucpRI?si=yFDSiVThhj19Iant&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/exuF3jsEE90?si=LGYdxg8tws2QvHDh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/aJCMDFBN3fs?si=vrV7dQSHErof1VVI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/qjM1eRjdcJU?si=pHwlKnwr0UuJHpum&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="535" height="300" src="https://www.youtube-nocookie.com/embed/7U4tuGk7zcM?si=BIpEuleVi90nvMDA&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
]
</script>

<style scoped lang="scss">
.contacts {
  margin-top: 120px;
  background-color: var(--accent-color);
  
  &-inner {
    display: flex;
    align-items: center;
    grid-gap: 60px;
  }

  &-title {
    color: white;
    font-size: 36px;
    font-weight: 600;
  }

  &-link {
    display: flex;
    align-items: center;
    grid-gap: 20px;

    & svg {
      height: 52px;
      width: 52px;
    }

    & span {
      color: white;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>
