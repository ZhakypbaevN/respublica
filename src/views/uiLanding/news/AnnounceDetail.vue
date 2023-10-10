<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <section class="landing-block">
        <div class="wrapper landing-wrapper litle">
          <div class="news" v-if="announceData">
            <div class="news-title">{{ announceData.title }}</div>

            <div class="news-preview withZoomPreview-preview">
              <div class="news-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(/img/announcement.png);`"></div>
            </div>

            <div class="news-text" v-html="announceData.content"></div>

          </div>

          <div class="news-items" v-if="announceList">
            <AnnounceItem
              v-for="announce of announceList"
              :key="announce.title"
              :data="announce"
              litle
            />
          </div>

        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import AnnounceItem from '../../../components/uiLanding/news/announceItem.vue';

import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const announceData = ref(null);
const announceList = ref(null);

onMounted(() => getData())

const getData = () => {
  getAnnounceData();
  getAnnounceList();
}

watch(
  () => route.params.announce_id,
  getData
)

const getAnnounceData = () => {
  const url = `https://tri.codetau.com/announceList/${route.params.announce_id}`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      announceData.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

const getAnnounceList = () => {
  const url = `https://tri.codetau.com/announceList`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      announceList.value = [];

      response.data.forEach(announce => {
        if (announce.id.toString() !== route.params.announce_id) announceList.value.push(announce);
      });
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news {
  margin-bottom: 100px;

  &-title {
    color: var(--primary-color);
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  &-text {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 30px;
  }

  &-preview {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;

    &-img {
      padding-bottom: 20%;
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
}
</style>