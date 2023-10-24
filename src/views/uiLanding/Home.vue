<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="intro withZoomPreview-preview">
        <div
          class="intro-preview bg-cover withZoomPreview-preview-img"
          v-for="slide of slides"
          :key="slide"
          :style="`background-image: url('${slide}');`"
        ></div>
        <div class="wrapper landing-wrapper">
          <div class="intro-btns">
            <Button
              :name="$t('home-join-the-party')"
              type="default-blue"
              @click="() => showModals.joinPartyModal = true"
              data-aos="fade-up"
            />
            <Button
              :name="$t('home-submit-an-apeal')"
              type="default-blue"
              @click="() => showModals.submitAnAppeal = true"
              data-aos="fade-up"
            />
          </div>
        </div>
      </section>

      <AboutUs
        @showJoinPartyModal="() => showModals.joinPartyModal = true"
        @showSubmitAnAppeal="() => showModals.submitAnAppeal = true"
        @showMakeAnAppointment="() => showModals.makeAnAppointment = true"
      />


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



      <PartyProgram />

      
      <YoutubeSlider />


      <AboutParty
        @showJoinPartyModal="() => showModals.joinPartyModal = true"
      />

      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <div class="landing-header">
            <h2 class="landing-title">{{ $t('home-announcements') }}</h2>
            
            <RouterLink to="news-all" class="landing-header-link">
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

  <SubmitAnAppealModal
    :show="showModals.submitAnAppeal"
    @hide="() => showModals.submitAnAppeal = false"
  />

  <JoinPartyModal
    :show="showModals.joinPartyModal"
    @hide="() => showModals.joinPartyModal = false"
  />

  <MakeAnAppointmentModal
    :show="showModals.makeAnAppointment"
    @hide="() => showModals.makeAnAppointment = false"
  />

</template>

<script setup lang="ts">
import JoinPartyModal from '../../components/uiLanding/feedback/joinPartyModal.vue';
import SubmitAnAppealModal from '../../components/uiLanding/feedback/submitAnAppealModal.vue';
import MakeAnAppointmentModal from '../../components/uiLanding/feedback/makeAnAppointmentModal.vue';

import AboutUs from '../../components/uiLanding/home/aboutUs.vue'
import NewsItem from '../../components/uiLanding/news/newsItem.vue'
import YoutubeSlider from '../../components/uiLanding/home/youtubeSlider.vue'
import PartyProgram from '../../components/uiLanding/home/partyProgram.vue'
import AboutParty from '../../components/uiLanding/home/aboutParty.vue'
import AnnounceItem from '../../components/uiLanding/news/announceItem.vue';


import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';
import { useToast } from '../../modules/toast'

const { toast } = useToast()

const announceList = ref();
const newsList = ref();
const token = localStorage.getItem('TOKEN');

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

const showModals = reactive({
  joinPartyModal: false,
  submitAnAppeal: false,
  makeAnAppointment: false,
});

const slides = [
  '/img/uiLanding/slides/slider-1.jpg',
  '/img/uiLanding/slides/slider-2.jpg',
  '/img/uiLanding/slides/slider-3.jpg',
  '/img/uiLanding/slides/slider-4.jpg',
]
</script>

<style scoped lang="scss">
.intro {
  padding-top: 34%;
  position: relative;

  &-preview {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    opacity: 0;
  }

  &-preview:nth-child(1) {
    animation: slideAnimation 12s infinite;
  }

  &-preview:nth-child(2) {
    animation: slideAnimation 12s infinite 3s;
  }

  &-preview:nth-child(3) {
    animation: slideAnimation 12s infinite 6s;
  }

  &-preview:nth-child(4) {
    animation: slideAnimation 12s infinite 9s;
  }

  &-btns {
    display: flex;
    grid-gap: 30px;

    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
  }
}

@keyframes slideAnimation {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
