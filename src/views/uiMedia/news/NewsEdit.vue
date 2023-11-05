<template>
  <section class="">
    <div class="newsEdit wrapper" v-if="route.params.news_id ? !loading.page : true">
      <h2 class="landing-title">{{ formData.title ? formData.title : route.params.news_id ? 'Редактирование новости' : 'Новая новость' }}</h2>

      <Form
        @finish="postNews"
        class="newsEdit-form"
      >
        <div class="newsEdit-form-main">
          <div class="newsEdit-form-inputs">
            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">Заголовок</label>
              <Input
                name="title"
                type="textarea"
                placeholder="Введите текст обращения"
                :maxSymbol="150"
                v-model="formData.title"
                staticPlaceholder
                required
              />
            </div>

            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">Подзаголовок</label>
              <Input
                name="subtitle"
                type="textarea"
                placeholder="Введите текст обращения"
                :maxSymbol="250"
                v-model="formData.subtitle"
                staticPlaceholder
                required
              />
            </div>
          </div>

          <Upload
            class="newsEdit-preview"
            v-model="formData.newPhotoFile"
            :preview="formData.preview"
            :aspectRatio="16 / 9"
            :height="495"
            :width="880"
            :previewBottom="56.36"
            required
          />
        </div>

        <Input
          name="content"
          type="editor"
          v-model="formData.content"
          staticPlaceholder
          placeholder="Контент"
          class="newsEdit-formItem-content"
          required
        />

        <div class="newsEdit-form-btns">
          <Button
            :name="
              route.params.news_id
                ? 'Сохранить'
                : 'Создать новость'
            "
            :loading="loading.btn"
            htmlType="submit"
          />
          <Button
            name="Отмена"
            htmlType="submit"
            type="default-grey"
          />
        </div>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import getFileUrl from '../../../helpers/getFileUrlByDate'

import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useToast } from '../../../modules/toast'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute()
const { toast } = useToast()

const loading = reactive({
  page: true,
  btn: false
})
const token = localStorage.getItem('TOKEN');

const formData = reactive({
  title: '',
  subtitle: '',
  content: '',
  preview: null,
  newPhotoFile: null
})

// Get News
onMounted(() => {
  if (route.params.news_id) {
    const url = `https://api.respublica.codetau.com/api/v1/admin/articles/${route.params.news_id}`;

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
        formData.title = response.data.title;
        formData.subtitle = response.data.preview_text;
        formData.preview = getFileUrl(response.data.preview_image);
        
        // formData.content = response.data.content;
        formData.content = `<![CDATA[ <header><h1>Партия Respublica начала Road Show</h1></header><figure><img src="https://static.tildacdn.com/tild3834-3564-4565-b764-326262646266/IMG_2694.jpeg"/></figure><div class="t-redactor__text"><strong>Официальная поездка сотрудников центрального аппарата в регионы началась с области Жетысу. В первый день роуд-шоу состоялся ряд встреч и партийных мероприятий.</strong><br /><br />Так, проведена встреча с партийным активом области и депутатами маслихатов всех уровней, избранными от партии Respublica. Депутаты и активисты обсудили волнующие жителей региона вопросы и представили свои предложения.<br /><br />Кроме того, сотрудники центрального аппарата и регионального филиала встретились с игроками футбольной команды Qareket, которая стала многократным победителем в соревнованиях среди работников СМИ. 12 членов команды стали членами партии Respublica.<br /><br />В коллективе строительной компании "Жетісу жилстрой" 30 работников получили партийные билеты, здесь открыта первичная партийная организация. <br /><br />В Доме матери организована встреча с мамами, в подарок учреждению от партии переданы детская коляска и принтер. «Благодаря работе нашего фонда 172 мамы получили помощь в сложной ситуации», - сказала депутат Талдыкорганского городского маслихата от партии Respublica, глава общественного фонда «Дом матери» Алсу Габдракипова.<br /><br />Кроме того, прошла встреча с молодежью Жетысу, на которой презентован документальный фильм «Одержимость» о последствиях и жертвах лудомании. В организации съемок фильма, режиссером которого выступил Ринат Балгабаев, принял участие депутат Мажилиса Парламента, сопредседатель партии Руслан Берденов.</div><img src="https://static.tildacdn.com/tild3665-3063-4562-b931-366462653164/8233aa7b-1788-4372-b.jpeg"><img src="https://static.tildacdn.com/tild6430-3062-4531-b635-633035653437/7fc0a028-a0eb-4e33-9.jpeg"><img src="https://static.tildacdn.com/tild6439-3432-4263-b035-393463633739/d2abb28d-e625-454d-8.jpeg"><img src="https://static.tildacdn.com/tild6664-6164-4432-b535-363430633137/4b761258-a809-4539-9.jpeg"><img src="https://static.tildacdn.com/tild3466-3661-4733-b231-373935373933/d910a834-967a-4648-a.jpeg"><img src="https://static.tildacdn.com/tild6231-6432-4635-a265-336236623464/c320155e-7f6a-47c7-8.jpeg"><img src="https://static.tildacdn.com/tild6363-3132-4638-b231-616633326432/4d1bb129-847c-4d31-9.jpeg"> ]]>`;
        loading.page = false
        
      })
      .catch((err) => {
        console.log('err', err);
        
        toast({
          message: 'Возникли ошибки при запросе'
        })
        loading.page = false
      });

  }
})

watch(
  () => formData.preview,
  () => {
    console.log('formData.preview', new File([formData.preview!], "filename"));
  }
)


// Post
const postNews = () => {
  loading.btn = true;
  const url = route.params.news_id
    ? `https://api.respublica.codetau.com/api/v1/admin/articles/${route.params.news_id}`
    : `https://api.respublica.codetau.com/api/v1/admin/articles`;

  const data = new FormData();
  
  data.append("title", formData.title);
  data.append("category_id", '1');
  data.append("preview_text", formData.subtitle);
  data.append("content", formData.content);
  data.append("published", 'true');

  if (formData.newPhotoFile) data.append("preview_image", formData.newPhotoFile);

  axios({
    method: route.params.news_id ? "put" : "post",
    url: url,
    data: data,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Новость успешно создана',
        type: 'success'
      })
      loading.btn = false
      
    })
    .catch((err) => {
      console.log('err', err);
      
      if (err.response.data.detail === 'Incorrect username or password') {
        toast({
          message: 'Неверный логин или пароль!'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      loading.btn = false
    });
}

</script>

<style scoped lang="scss">
.wrapper {
  /* background-color: var(--accent-color-op05); */
  padding-top: 40px;
}

.newsEdit {
  &-form {
    &-main {
      display: grid;
      grid-template-columns: 1fr 440px;
      grid-gap: 40px;
      margin-bottom: 40px;
    }

    &-inputs .newsEdit-formItem:last-child {
      margin-bottom: 0px;
    }

    &-preview {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;
    }

    &-btns {
      display: flex;
      grid-gap: 20px;
    }
  }

  &-formItem {
    margin-bottom: 24px;

    &-label {
      display: inline-block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;

      margin-bottom: 10px;
    }

    &-content {
      margin-bottom: 40px !important;
    }
  }
}
</style>