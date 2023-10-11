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
              name="ВСТУПИТЬ В ПАРТИЮ"
              type="default-blue"
              @click="() => showModals.joinPartyModal = true"
              data-aos="fade-up"
            />
            <Button
              name="ПОДАТЬ ОБРАЩЕНИЕ"
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
          <Slider title="Новости" link="/news-all">
            <NewsItem />
            <NewsItem />
            <NewsItem />
          </Slider>
        </div>
      </section>

      <PartyProgram />

      <section class="videos landing-block">
        <div class="wrapper landing-wrapper">
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
              v-for="vidoe of youtubeLinks"
              :key="vidoe"
              :src="vidoe"
            ></YoutubeVideo>
          </div>
        </div>
      </section>

      <AboutParty
        @showJoinPartyModal="() => showModals.joinPartyModal = true"
      />

      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <div class="landing-header">
            <h2 class="landing-title">Анонсы, объявления</h2>
            
            <RouterLink to="news-all" class="landing-header-link">
              <span>Смотреть все</span>
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
import Slider from '../../components/common/Slider.vue';
import JoinPartyModal from '../../components/uiLanding/feedback/joinPartyModal.vue';
import SubmitAnAppealModal from '../../components/uiLanding/feedback/submitAnAppealModal.vue';
import MakeAnAppointmentModal from '../../components/uiLanding/feedback/makeAnAppointmentModal.vue';

import AboutUs from '../../components/uiLanding/home/aboutUs.vue'
import NewsItem from '../../components/uiLanding/news/newsItem.vue'
import YoutubeVideo from '../../components/uiLanding/news/youtubeVideo.vue'
import PartyProgram from '../../components/uiLanding/home/partyProgram.vue'
import AboutParty from '../../components/uiLanding/home/aboutParty.vue'
import AnnounceItem from '../../components/uiLanding/news/announceItem.vue';


import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';
import { useToast } from '../../modules/toast'

const { toast } = useToast()

const announceList = ref(null);

onMounted(() => {
  getAnnounce();
})

const getAnnounce = () => {
  const url = `https://tri.codetau.com/announceList`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      announceList.value = null;

      announceList.value = response.data;
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
// const youtubeLinks = [
//   'https://youtu.be/NWPdwjlhk8E',
// ]
const youtubeLinks = [
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NWPdwjlhk8E?si=IEuuidab_4uKs3pl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/f6atkSucpRI?si=yFDSiVThhj19Iant&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/exuF3jsEE90?si=LGYdxg8tws2QvHDh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aJCMDFBN3fs?si=vrV7dQSHErof1VVI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qjM1eRjdcJU?si=pHwlKnwr0UuJHpum&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7U4tuGk7zcM?si=BIpEuleVi90nvMDA&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wkkPY1l3X-0?si=bqfs3ypFTPzFcm5P&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pHGjAux3mhc?si=KSb7TPbTbLzockHv&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/36gqFVb0vbg?si=nOWmyR3mud94GkRX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZqGEOeBSwW8?si=Jy7bRQVrm74wqF6S&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D2BY2C8Zo-E?si=Kgah_QedL72NfMDb&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OB6OISsCA0Y?si=4wErgjR9WqUykjQj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9uF5juD5zL0?si=uzT75F12DeF7_9_L&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Rdp-HhsAlog?si=REPMREFGzEz8xh72&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/t9PuqQ3TX7c?si=GjCSp4E397BajrYg&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  // `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XZIS8ZUS50I?si=LoO7SHD6D8i3PDnX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
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

.videos {
  margin-bottom: 120px;
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
