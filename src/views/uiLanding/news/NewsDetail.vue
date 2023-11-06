<template>
    <div class="wrapper-main">
      <div class="content">
        <Header />
        <section class="landing-block">
          <div class="wrapper landing-wrapper litle">
            <div class="news" v-if="newsData">
              <div class="news-title">{{ newsData.title }}</div>
  
              <div class="news-preview withZoomPreview-preview">
                <div class="news-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(https://api.respublica.codetau.com/${newsData.preview_image});`"></div>
              </div>

              <div class="news-subtitle">{{ newsData.preview_text }}</div>
  
              <div class="news-text ck-content" v-html="newsData.content"></div>
            </div>
  
            <div class="news-items" v-if="newsList">
              <NewsItem
                v-for="news of newsList"
                :key="news.title"
                :data="news"
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
// import convertDateTime from '../../../helpers/convertDateTime.js';

import NewsItem from '../../../components/uiLanding/news/newsItem.vue';

import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const newsData = ref(null);
const newsList = ref(null);

onMounted(() => getData())

const getData = () => {
  getNewsData();
  getNewsList();
}

watch(
  () => route.params.announce_id,
  getData
)

const getNewsData = () => {
const url = `https://api.respublica.codetau.com/api/v1/articles/${route.params.news_id}`;
axios({
  method: "get",
  url: url,
})
  .then((response) => {
    newsData.value = response.data;
    newsData.value!.content = `<![CDATA[ <header><h1>Партия Respublica начала Road Show</h1></header><figure><img src="https://static.tildacdn.com/tild3834-3564-4565-b764-326262646266/IMG_2694.jpeg"/></figure><div class="t-redactor__text"><strong>Официальная поездка сотрудников центрального аппарата в регионы началась с области Жетысу. В первый день роуд-шоу состоялся ряд встреч и партийных мероприятий.</strong><br /><br />Так, проведена встреча с партийным активом области и депутатами маслихатов всех уровней, избранными от партии Respublica. Депутаты и активисты обсудили волнующие жителей региона вопросы и представили свои предложения.<br /><br />Кроме того, сотрудники центрального аппарата и регионального филиала встретились с игроками футбольной команды Qareket, которая стала многократным победителем в соревнованиях среди работников СМИ. 12 членов команды стали членами партии Respublica.<br /><br />В коллективе строительной компании "Жетісу жилстрой" 30 работников получили партийные билеты, здесь открыта первичная партийная организация. <br /><br />В Доме матери организована встреча с мамами, в подарок учреждению от партии переданы детская коляска и принтер. «Благодаря работе нашего фонда 172 мамы получили помощь в сложной ситуации», - сказала депутат Талдыкорганского городского маслихата от партии Respublica, глава общественного фонда «Дом матери» Алсу Габдракипова.<br /><br />Кроме того, прошла встреча с молодежью Жетысу, на которой презентован документальный фильм «Одержимость» о последствиях и жертвах лудомании. В организации съемок фильма, режиссером которого выступил Ринат Балгабаев, принял участие депутат Мажилиса Парламента, сопредседатель партии Руслан Берденов.</div><img src="https://static.tildacdn.com/tild3665-3063-4562-b931-366462653164/8233aa7b-1788-4372-b.jpeg"><img src="https://static.tildacdn.com/tild6430-3062-4531-b635-633035653437/7fc0a028-a0eb-4e33-9.jpeg"><img src="https://static.tildacdn.com/tild6439-3432-4263-b035-393463633739/d2abb28d-e625-454d-8.jpeg"><img src="https://static.tildacdn.com/tild6664-6164-4432-b535-363430633137/4b761258-a809-4539-9.jpeg"><img src="https://static.tildacdn.com/tild3466-3661-4733-b231-373935373933/d910a834-967a-4648-a.jpeg"><img src="https://static.tildacdn.com/tild6231-6432-4635-a265-336236623464/c320155e-7f6a-47c7-8.jpeg"><img src="https://static.tildacdn.com/tild6363-3132-4638-b231-616633326432/4d1bb129-847c-4d31-9.jpeg"> ]]>`;
    
  })
  .catch((err) => {
    console.log('err', err);
    toast({
      message: 'Возникли ошибки при запросе'
    })
  });
}

const getNewsList = () => {
const url = `https://api.respublica.codetau.com/api/v1/admin/articles?offset=0&limit=3&category_id=1`;
axios({
    method: "get",
    url: url,
})
  .then((response) => {
    newsList.value = [];

    response.data.forEach(news => {
      if (news.id.toString() !== route.params.news_id) newsList.value.push(news);
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

  &-subtitle {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 600;
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
      padding-bottom: 56.36%;
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
}
</style>