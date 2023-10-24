<template>
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
    </div>

    <Swiper
      :slidesPerView="4"
      :centeredSlides="true"
      :spaceBetween="30"
      :autoplay="{
        delay: 4200,
        disableOnInteraction: true,
      }"
      :mousewheel="true"
      :loop="true"
      :navigation="true"
      :pagination="false"
      :modules="[Pagination, Mousewheel, Autoplay, Navigation]"
      class="videoSlider"
    >
      <SwiperSlide
        v-for="vidoe of youtubeLinks"
        :key="vidoe.title"
      >
        <YoutubeVideo :src="vidoe.content"></YoutubeVideo>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import YoutubeVideo from '../news/youtubeVideo.vue'


import axios from 'axios';
import { onMounted, ref } from 'vue';

import { useToast } from '../../../modules/toast'

const { toast } = useToast()

const isLoading = ref(false)
const token = localStorage.getItem('TOKEN');
const youtubeLinks = ref([]);

onMounted(() => getVideo());
const getVideo = () => {
  const url = `https://api.respublica.codetau.com/api/v1/articles?category_id=4&offset=0&limit=100`;

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

      youtubeLinks.value = response.data;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log('err', err);

      if (err.response.data.detail === 'Pending resignation request already exists.') {
        toast({
          message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      isLoading.value = false;
    });
}

// const youtubeLinks = [
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NWPdwjlhk8E?si=IEuuidab_4uKs3pl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/f6atkSucpRI?si=yFDSiVThhj19Iant&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/exuF3jsEE90?si=LGYdxg8tws2QvHDh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aJCMDFBN3fs?si=vrV7dQSHErof1VVI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qjM1eRjdcJU?si=pHwlKnwr0UuJHpum&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7U4tuGk7zcM?si=BIpEuleVi90nvMDA&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wkkPY1l3X-0?si=bqfs3ypFTPzFcm5P&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pHGjAux3mhc?si=KSb7TPbTbLzockHv&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/36gqFVb0vbg?si=nOWmyR3mud94GkRX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZqGEOeBSwW8?si=Jy7bRQVrm74wqF6S&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D2BY2C8Zo-E?si=Kgah_QedL72NfMDb&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OB6OISsCA0Y?si=4wErgjR9WqUykjQj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9uF5juD5zL0?si=uzT75F12DeF7_9_L&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Rdp-HhsAlog?si=REPMREFGzEz8xh72&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/t9PuqQ3TX7c?si=GjCSp4E397BajrYg&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//   `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XZIS8ZUS50I?si=LoO7SHD6D8i3PDnX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
// ]
</script>

<style lang="scss">

.videoSlider {
  overflow-y: visible !important;
  overflow-x: clip !important;
  margin-bottom: 190px;
  
  & .swiper {

    &-button {
      &-prev,
      &-next {
        top: auto;
        bottom: -80px;
      }

      &-prev {
        left: calc(50% - 95px);
        transform: translateX(-50%);
      }

      &-next {
        right: calc(50% - 95px);
        transform: translateX(-50%);
      }
    }
  }
}
</style>
