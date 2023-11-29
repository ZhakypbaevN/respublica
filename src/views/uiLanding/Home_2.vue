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
          
          <div class="landing-items">
            <NewsItem
              v-for="news of newsList"
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
              v-for="announce of announceList"
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
import Intro from '@/components/uiLanding/home-page/Intro_2.vue'
import AboutUs from '@/components/uiLanding/home-page/AboutUs.vue'
import PartyProgram from '@/components/uiLanding/home-page/PartyProgram.vue'
import AboutParty from '@/components/uiLanding/home-page/AboutParty.vue'
import NewsItem from '@/components/uiLanding/press-center/news/NewsItem.vue'
import AnnounceItem from '@/components/uiLanding/press-center/announces/AnnounceItem.vue';
import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '../../modules/toast'

const { toast } = useToast()

const announceList = ref();
const newsList = ref();
const token = localStorage.getItem('TOKEN');

const showJoinPartyModal = ref(false)

onMounted(() => {
  getAnnounce();
  getNews();
})

const getAnnounce = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=3&category_id=6`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      announceList.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

const getNews = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=3&category_id=1`;

  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);

      newsList.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);

      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}
</script>