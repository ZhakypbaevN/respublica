<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <!-- <RouterLink to="/news">
        <Button name="Назад" type="outline-grey-light">
          <SvgIcon name="arrow-left" :viewboxWidth="24" :viewboxHeight="24" />
        </Button>
      </RouterLink> -->
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title center">Видеогалерея</h2>
          <div class="landing-items">
            <YoutubeVideo
              v-for="vidoe of youtubeLinks"
              :key="vidoe"
              :src="vidoe.content"
            ></YoutubeVideo>
          </div>

        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import YoutubeVideo from '@/components/uiLanding/press-center/youtube/YoutubeVideo.vue'

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '@/modules/toast'

const { toast } = useToast()

const youtubeLinks = ref();
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getVideo();
})

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
    });
}
</script>
<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;
}

/* .back-btn {

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
} */
</style>