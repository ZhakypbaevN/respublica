<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <div class="wrapper-page">
        <div class="back-btn">
          <RouterLink to="/news">
            <Button name="Назад" type="outline-grey-light">
              <SvgIcon name="arrow-left" :viewboxWidth="24" :viewboxHeight="24" />
            </Button>
          </RouterLink>
        </div>
        <div>
          <div class="title">
            <span>Видеогалерея</span>
          </div>
          <div class="news-items">
            <YoutubeVideo
              v-for="vidoe of youtubeVideos"
              :key="vidoe"
              :vidoe="vidoe"
            ></YoutubeVideo>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';

import YoutubeVideo from '../../components/uiLanding/news/youtubeVideo.vue'

const youtubeVideos = [
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/NWPdwjlhk8E?si=IEuuidab_4uKs3pl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/f6atkSucpRI?si=yFDSiVThhj19Iant&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/exuF3jsEE90?si=LGYdxg8tws2QvHDh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/aJCMDFBN3fs?si=vrV7dQSHErof1VVI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/qjM1eRjdcJU?si=pHwlKnwr0UuJHpum&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/7U4tuGk7zcM?si=BIpEuleVi90nvMDA&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/wkkPY1l3X-0?si=bqfs3ypFTPzFcm5P&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/pHGjAux3mhc?si=KSb7TPbTbLzockHv&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/36gqFVb0vbg?si=nOWmyR3mud94GkRX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/ZqGEOeBSwW8?si=Jy7bRQVrm74wqF6S&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/D2BY2C8Zo-E?si=Kgah_QedL72NfMDb&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/OB6OISsCA0Y?si=4wErgjR9WqUykjQj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/9uF5juD5zL0?si=uzT75F12DeF7_9_L&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/Rdp-HhsAlog?si=REPMREFGzEz8xh72&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/t9PuqQ3TX7c?si=GjCSp4E397BajrYg&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  `<iframe width="440" height="248" src="https://www.youtube-nocookie.com/embed/XZIS8ZUS50I?si=LoO7SHD6D8i3PDnX&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
]
</script>
<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;
}

.wrapper-page {
    display: flex;
    margin-top: 40px;
    max-width: 1920px;
    margin-bottom: 50px;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        color: #042051;
        text-align: center;
        font-size: 36px;
        font-weight: 600;
    }

}

.back-btn {

    margin-right: 50px;
    margin-left: 60px;

    & button {
        display: flex;
        justify-content: flex-end;
        flex-direction: row-reverse;
        height: 60px;
        width: 152px;

        & svg {
            padding-top: 4px;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
    }


}

.news-items {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px 30px;
}

.news-item {

    &-img {
        width: 440px;
        height: 313px;
        position: relative;


        & img {
            width: 440px;
            height: 313px;
            border-radius: 10px;
        }

        &-date {
            display: flex;
            grid-gap: 5px;
            align-items: center;
            background-color: #042051;
            padding: 5px 15px;
            width: 137px;
            height: 30px;
            border-radius: 0px 10px;
            position: absolute;
            bottom: 0;

            & svg {
                width: 24px;
                height: 24px;
                fill: var(--white-color);
            }

            & span {
                color: var(--white-color);
            }

        }

    }

    &-name {
        margin-top: 15px;

        & span {
            color: var(--primary-color);
            font-size: 20px;
            font-weight: 700;
        }
    }

    &-text {
        display: block;
        width: 461px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(4, 32, 81, 0.80);

    }

    &-line {
        width: 54px;
        height: 3px;
        background-color: var(--accent-color);
        margin-bottom: 15px;
        margin-top: 20px;
    }
}
</style>