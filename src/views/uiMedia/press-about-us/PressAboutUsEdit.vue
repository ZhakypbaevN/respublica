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
            :aspectRatio="16 / 8"
            :height="440"
            :width="880"
            :previewBottom="50"
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
        
        formData.content = response.data.content;
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
  data.append("category_id", '3');
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