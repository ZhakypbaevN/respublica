<template>
  <section class="wrapper-main">
    <div class="news wrapper">

      <div class="news-header">
        <Input
          placeholder="Поиск по проекту"
          staticPlaceholder
        />
        <RouterLink to="/media/video-gallery/create">
          <Button
            class="news-header-addNewsBtn"
            type="default-blue"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </RouterLink>
      </div>
      <div class="news-items">
        <YoutubeItem
          v-for="vidoe of youtubeLinks"
          :key="vidoe"
          :vidoe="vidoe"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import YoutubeItem from '../../../components/uiMedia/youtubeItem.vue'

const youtubeLinks = [
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
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.news {
  &-header {
    max-width: 1160px;

    display: grid;
    grid-template-columns: 1fr 60px;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-addNewsBtn {
      width: 60px;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px !important;

      & svg {
        height: 40px;
        width: 40px;

        fill: white;
      }
    }
  }
  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
}
</style>