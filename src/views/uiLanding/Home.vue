<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="intro">
        <div class="wrapper landing-wrapper">
          <div class="intro-btns">
            <Button name="ВСТУПИТЬ В ПАРТИЮ" type="default-blue" />
            <Button name="ПОДАТЬ ОБРАЩЕНИЕ" type="default-blue" />
          </div>
        </div>
      </section>

      <AboutUs />

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
          <Slider title="Видеогалерея" link="/videos">
            <YoutubeVideo
              v-for="vidoe of youtubeVideos"
              :key="vidoe"
              :vidoe="vidoe"
            ></YoutubeVideo>
          </Slider>
        </div>
      </section>

      <AboutParty />

      <Announcements landing />

    </div>

    <Footer /> 
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import Slider from '../../components/common/Slider.vue';

import AboutUs from '../../components/uiLanding/home/aboutUs.vue'
import NewsItem from '../../components/uiLanding/news/newsItem.vue'
import YoutubeVideo from '../../components/uiLanding/news/youtubeVideo.vue'
import PartyProgram from '../../components/uiLanding/home/partyProgram.vue'
import AboutParty from '../../components/uiLanding/home/aboutParty.vue'
import Announcements from '../../components/uiLanding/news/announcements.vue';

const youtubeVideos = [
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NWPdwjlhk8E?si=IEuuidab_4uKs3pl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/f6atkSucpRI?si=yFDSiVThhj19Iant&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/exuF3jsEE90?si=LGYdxg8tws2QvHDh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aJCMDFBN3fs?si=vrV7dQSHErof1VVI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qjM1eRjdcJU?si=pHwlKnwr0UuJHpum&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7U4tuGk7zcM?si=BIpEuleVi90nvMDA&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wkkPY1l3X-0?si=bqfs3ypFTPzFcm5P&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pHGjAux3mhc?si=KSb7TPbTbLzockHv&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/36gqFVb0vbg?si=nOWmyR3mud94GkRX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZqGEOeBSwW8?si=Jy7bRQVrm74wqF6S&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D2BY2C8Zo-E?si=Kgah_QedL72NfMDb&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OB6OISsCA0Y?si=4wErgjR9WqUykjQj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9uF5juD5zL0?si=uzT75F12DeF7_9_L&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Rdp-HhsAlog?si=REPMREFGzEz8xh72&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/t9PuqQ3TX7c?si=GjCSp4E397BajrYg&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XZIS8ZUS50I?si=LoO7SHD6D8i3PDnX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
]
</script>

<style scoped lang="scss">
.intro {
  padding-top: 34%;
  background: url('/img/uiLanding/intro-preview.jpg') center no-repeat;
  background-size: cover;

  position: relative;

  &-btns {
    display: flex;
    grid-gap: 30px;

    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
  }
}
</style>
