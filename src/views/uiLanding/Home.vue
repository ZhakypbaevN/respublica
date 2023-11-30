<template>
  <div class="home wrapper-main">
    <div>
      <Header defaultFixed withoutPaddingBottom dark />

      <Intro />

      <AboutUs />

      <PartyProgram />

      <section class="news landing-block">
        <div class="wrapper landing-wrapper">
          <div class="landing-header">
            <h2 class="landing-title">
              {{ $t('home-news') }}
            </h2>

            <RouterLink to="/news-all" class="landing-header-link">
              <span>{{ $t('home-news-see-all') }}</span>
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

      <AboutParty
        @showJoinPartyModal="() => showJoinPartyModal = true"
      />

      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <div class="landing-header">
            <h2 class="landing-title">{{ $t('home-announcements') }}</h2>
            
            <RouterLink to="announce-list" class="landing-header-link">
              <span>{{ $t('home-announcements-see-all') }}</span>
              <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
            </RouterLink>
          </div>

          <div class="landing-items">
            <AnnounceItem
              v-for="announce of announceValues.tableValues"
              :key="announce.title"
              :data="announce"
            />
          </div>
        </div>
      </section>
    </div>

    <Footer /> 
  </div>

  <JoinPartyModal
    :show="showJoinPartyModal"
    @hide="() => showJoinPartyModal = false"
  />
</template>

<script setup lang="ts">
  import Intro from '@/components/uiLanding/home-page/Intro.vue'
  import AboutUs from '@/components/uiLanding/home-page/AboutUs.vue'
  import PartyProgram from '@/components/uiLanding/home-page/PartyProgram.vue'
  import AboutParty from '@/components/uiLanding/home-page/AboutParty.vue'
  import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
  import AnnounceItem from '@/components/uiLanding/press-center/announces/AnnounceItem.vue';
  import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

  import { onMounted, reactive, ref } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  const showJoinPartyModal = ref(false)
  const newsValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })
  const announceValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  onMounted(() => {
    getData();
  })

  const getData = async () => {
    newsValues.isEmpty = false
    const { data, total } = await getNewsList('news', {offset: 0,limit: 3})
    newsValues.tableValues = data;
    newsValues.total = total;
    if (!total) {
      newsValues.isEmpty = true
    }
  }
</script>