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
        
        <div class="landing-items" v-if="newsValues.isEmpty">
          Empty
        </div>
        <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
          Loading
        </div>
        <div class="landing-items" v-else>
          <NewsItem
            v-for="news of newsValues.tableValues"
            :key="news.title"
            :data="news"
          />
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

        <div class="landing-items" v-if="newsPressAboutUsValues.isEmpty">
          Empty
        </div>
        <div class="landing-items disabled" v-else-if="!newsPressAboutUsValues.tableValues">
          Loading
        </div>
        <div class="landing-items" v-else>
          <NewsItem
            v-for="news of newsPressAboutUsValues.tableValues"
            :key="news.title"
            :data="news"
            pressAboutUs
          />
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

        <div class="landing-items" v-if="youtubeVideosValues.isEmpty">
          Empty
        </div>
        <div class="landing-items disabled" v-else-if="!youtubeVideosValues.tableValues">
          Loading
        </div>
        <div class="landing-items" v-else>
          <YoutubeVideo
            v-for="(vidoe, idx) of youtubeVideosValues.tableValues"
            :key="idx"
            :src="vidoe.content"
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
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
  import YoutubeVideo from '@/components/uiLanding/press-center/youtube/YoutubeVideo.vue'

  import PhotoGallery from '@/components/uiLanding/press-center/photo-gallery/PhotoGallery.vue';

  import { onMounted, reactive } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  onMounted(() => {
  })

  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })
  const newsPressAboutUsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })
  const youtubeVideosValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  onMounted(() => {
    onGetNews();
    onGetNewsYoutube();
    onGetNewsPressAboutUs();
  })

  const onGetNews = async () => {
    newsValues.isEmpty = false
    const { data, total } = await getNewsList('news', {offset: 0,limit: 3})
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }

  const onGetNewsPressAboutUs = async () => {
    newsPressAboutUsValues.isEmpty = false
    const { data, total } = await getNewsList('press-about-us', {offset: 0,limit: 3})
    newsPressAboutUsValues.tableValues = data;
    newsPressAboutUsValues.total = total;
    if (!total) {
      newsPressAboutUsValues.isEmpty = true
    }
  }

  const onGetNewsYoutube = async () => {
    youtubeVideosValues.isEmpty = false
    const { data, total } = await getNewsList('video-gallery', {offset: 0,limit: 3})
    youtubeVideosValues.tableValues = data;
    youtubeVideosValues.total = total;
    if (!total) {
      youtubeVideosValues.isEmpty = true
    }
  }

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
      title: 'Контакты пресс-службы',
      link: "#contacts"
    }
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
