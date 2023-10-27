<template>
  <section class="">
    <div class="newsEdit wrapper" v-if="route.params.news_id ? !loading.page : true">
      <h2 class="landing-title">{{ route.params.news_id ? formData.title : 'Новая новость' }}</h2>

      <Form
        @finish="postNews"
        class="newsEdit-form"
      >
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
            />
          </div>
        </div>

        <Upload
          class="newsEdit-preview"
          v-model="formData.newPhoto"
          v-model:preview="formData.preview"
          :aspectRatio="16 / 9"
        />

        <div class="newsEdit-formItem-content">
          <ckeditor :editor="ClassicEditor" v-model="formData.content" :config="{}"></ckeditor>
        </div>

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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  newPhoto: null
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
        formData.preview = response.data.preview_image;

        
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
  data.append("category_id", '1');
  data.append("preview_text", formData.subtitle);
  data.append("content", formData.content);
  data.append("published", 'true');

  data.append("preview_image", formData.newPhoto!);

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
    display: grid;
    grid-template-columns: auto 680px;
    grid-gap: 40px;

    &-inputs {
      margin-bottom: 40px;
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
      grid-column: 1/3;
    }
  }

  &-preview {
    height: 380px;
    width: 680px;
  }
}
</style>