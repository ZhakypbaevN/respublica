<template>
  <div>
    <section class="pressCenter landing-block" id="newsList">
      <div class="wrapper">
        <div class="landing-header">
          <h2 class="landing-title">
            {{ $t('page.news') }}
          </h2>

          <RouterLink to="/client/news-all" class="itemsList-viewAll">
            <span>{{ $t('button.view-all') }}</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </RouterLink>
        </div>
        
        <div class="landing-items empty" v-if="newsValues.isEmpty">
          <Empty />
        </div>
        <div class="landing-items disabled" v-else-if="!newsValues.tableValues">
          <NewsItemSkeleton
            v-for="news in 5"
            :key="news"
          />
        </div>
        <div class="landing-items" v-else>
          <NewsItem
            v-for="news of newsValues.tableValues"
            :key="news.title"
            :data="news"
            toClient
          />
        </div>
      </div>
    </section>

    <section class="pressCenter landing-block" id="pressAboutUS">
      <div class="wrapper">
        <div class="landing-header">
          <h2 class="landing-title">
            {{ $t('page.the-press-about-us') }}
          </h2>

          <RouterLink to="/client/press-about-us-list" class="itemsList-viewAll">
            <span>{{ $t('button.view-all') }}</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </RouterLink>
        </div>

        <div class="landing-items empty" v-if="newsPressAboutUsValues.isEmpty">
          <Empty />
        </div>
        <div class="landing-items disabled" v-else-if="!newsPressAboutUsValues.tableValues">
          <NewsItemSkeleton
            v-for="news in 5"
            :key="news"
            pressAboutUs
          />
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

    <section class="pressCenter landing-block" id="videoGallery">
      <div class="wrapper">
        <div class="landing-header">
          <h2 class="landing-title">
            {{ $t('page.video-gallery') }}
          </h2>

          <RouterLink to="/client/video-gallery" class="itemsList-viewAll">
            <span>{{ $t('button.view-all') }}</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </RouterLink>
        </div>

        <div class="landing-items empty" v-if="youtubeVideosValues.isEmpty">
          <Empty />
        </div>
        <div class="landing-items disabled" v-else-if="!youtubeVideosValues.tableValues">
          <div
            class="skeleton dark-gray"
            style="padding-bottom: 56.25%;"
            v-for="news in 5"
            :key="news"
          ></div>
        </div>
        <div class="landing-items" v-else>
          <YoutubeVideo
            v-for="(vidoe, idx) of youtubeVideosValues.tableValues"
            :key="idx"
            :src="vidoe.content"
          />
        </div>
      </div>
    </section>

    <section class="photo-gallery landing-block" id="photoGallery">
      <div class="wrapper">
        <div class="landing-header">
          <h2 class="landing-title">{{ $t('page.photo-gallery') }}</h2>

          <RouterLink to="/client/photo-gallery" class="itemsList-viewAll">
            <span>{{ $t('button.view-all') }}</span>
            <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
          </RouterLink>
        </div>
        
        <PhotoGallery />
      </div>
    </section>

    <section class="contacts landing-block" id="contacts">
      <div class="wrapper">
        <div class="contacts-inner">
          <h2 class="contacts-title">
            {{ $t('contacts.press-service-for-the-media.title-the-republica-party') }}
          </h2>

          <a class="contacts-link" :href="`tel:${$t('contacts.press-service-for-the-media.phone')}`">
            <SvgIcon name="call-white" :viewboxWidth="52" :viewboxHeight="52" />
            <span>{{ $t('contacts.press-service-for-the-media.phone') }}</span>
          </a>

          <a class="contacts-link" :href="`mailto:a.ensebaeva@respublica-partiyasy.kz`">
            <SvgIcon name="mail-white" :viewboxWidth="52" :viewboxHeight="52" />
            <span>a.ensebaeva@respublica-partiyasy.kz</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
  import YoutubeVideo from '@/components/uiLanding/press-center/youtube/YoutubeVideo.vue'
  import PhotoGallery from '@/components/uiLanding/press-center/photo-gallery/PhotoGallery.vue';
  import NewsItemSkeleton from '@/components/uiLanding/press-center/news/NewsItemSkeleton.vue';

  import { onMounted, reactive } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  const { t } = useI18n()

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
    const { data, total } = await getNewsList('news', {offset: 0,limit: 6})
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }

  const onGetNewsPressAboutUs = async () => {
    newsPressAboutUsValues.isEmpty = false
    const { data, total } = await getNewsList('press-about-us', {offset: 0,limit: 6})
    newsPressAboutUsValues.tableValues = data;
    newsPressAboutUsValues.total = total;
    if (!total) newsPressAboutUsValues.isEmpty = true
  }

  const onGetNewsYoutube = async () => {
    youtubeVideosValues.isEmpty = false
    const { data, total } = await getNewsList('video-gallery', {offset: 0,limit: 6})
    youtubeVideosValues.tableValues = data;
    youtubeVideosValues.total = total;
    if (!total) youtubeVideosValues.isEmpty = true
  }

  const sideBarlinks = [
    {
      title: t('page.news'),
      link: "#newsList"
    },
    {
      title: t('page.the-press-about-us'),
      link: "#pressAboutUS"
    },
    {
      title: t('page.video-gallery'),
      link: "#videoGallery"
    },
    {
      title: t('page.photo-gallery'),
      link: "#photoGallery"
    },
    {
      title: t('contacts.press-service-for-the-media.title'),
      link: "#contacts"
    }
  ]
</script>

<style scoped lang="scss">
  .pressCenter .landing-items {
    // Adaptation
    @media (max-width: 1400px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  .photo-gallery {
    background-color: white;
  }
  .contacts {
    margin-top: 40px;
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
      display: grid;
      align-items: center;
      grid-template-columns: 52px 1fr;
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

    // Adaptation
    @media (max-width: 1700px) {
      &-inner {
        grid-gap: 60px;
      }

      &-title {
        font-size: 34px;
      }

      &-link {
        grid-template-columns: 52px 1fr;
        grid-gap: 20px;

        & svg {
          height: 52px;
          width: 52px;
        }

        & span {
          font-size: 24px;
        }
      }
    }

    @media (max-width: 1570px) {
      padding: 20px 0;

      &-inner {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px 40px;
      }

      &-title {
        grid-column: 1/3;
        font-size: 34px;
      }

      &-link {
        grid-template-columns: 52px 1fr;
        grid-gap: 20px;

        & svg {
          height: 52px;
          width: 52px;
        }

        & span {
          font-size: 24px;
        }
      }
    }

    @media (max-width: 1200px) {
      padding: 20px 0;

      &-inner {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px 40px;
      }

      &-title {
        font-size: 28px;
      }

      &-link {
        grid-template-columns: 48px 1fr;
        grid-gap: 18px;

        & svg {
          height: 48px;
          width: 48px;
        }

        & span {
          font-size: 20px;
        }
      }
    }

    @media (max-width: 660px) {
      &-title {
        font-size: 24px;
      }

      &-link {
        grid-template-columns: 32px 1fr;
        grid-gap: 10px;

        & svg {
          height: 32px;
          width: 32px;
        }

        & span {
          font-size: 18px;
        }
      }
    }

    @media (max-width: 500px) {
      margin-top: 30px;

      &-inner {
        grid-template-columns: 1fr;
        grid-gap: 14px;
      }

      &-title {
        grid-column: 1/2;
      }
    }

    @media (max-width: 380px) {
    }
  }
</style>
