<template>
  <section class="">
    <div class="newsEdit wrapper">
      <h2 class="landing-title">{{ route.params.news_id ? formData.title : 'Новая видео' }}</h2>

      <Form
        @finish="postNews"
      >
        <div class="newsEdit-form-block">
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
              <label for="content" class="newsEdit-formItem-label">YouTube код видео (iframe)</label>
              <Input
                name="content"
                type="textarea"
                placeholder="Введите YouTube код видео"
                staticPlaceholder
                v-model="formData.content"
              />
            </div>
          </div>
          <div class="newsEdit-videoPreview" v-html="formData.content"></div>
        </div>

        <div class="newsEdit-form-btns">
          <Button
            :name="
              route.params.news_id
                ? 'Сохранить'
                : 'Создать видео'
            "
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
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { useToast } from '@/modules/toast'
import { useRoute } from 'vue-router';

const route = useRoute()
const { toast } = useToast()

const loading = ref(false)
const token = localStorage.getItem('TOKEN');

const formData = reactive({
  title: '',
  content: '',
})

// Get News
onMounted(() => {
  if (route.params.news_id) {
    const url = `https://api.respublica-partiyasy.kz/api/v1/admin/articles/${route.params.news_id}`;

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
        
        formData.content = response.data.content;
        
      })
      .catch((err) => {
        console.log('err', err);
        
        toast({
          message: 'Возникли ошибки при запросе'
        })
        loading.value = false
      });

  }
})


// Post
const postNews = () => {
  loading.value = true;
  const url = route.params.news_id
    ? `https://api.respublica-partiyasy.kz/api/v1/admin/articles/${route.params.news_id}`
    : `https://api.respublica-partiyasy.kz/api/v1/admin/articles`;

  const data = new FormData();
  
  data.append("title", formData.title);
  data.append("alias_category", 'video-gallery');
  data.append("content", formData.content);
  data.append("published", 'true');

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
        message: route.params.news_id
          ? 'Видео успешно редактирование'
          : 'Видео успешно создана',
        type: 'success'
      })
      
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
      loading.value = false
    });
}

</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.newsEdit {
  &-form {
    &-block {
      max-width: 1200px;

      display: grid;
      grid-template-columns: 1fr 300px;
      grid-gap: 40px;
    }
    &-inputs {
      margin-bottom: 40px;
    }
    &-btns {
      display: flex;
      grid-gap: 20px;
    }
  }

  &-formItem {
    max-width: 800px;
    margin-bottom: 24px;

    &-label {
      display: inline-block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;

      margin-bottom: 10px;
    }
  }
}
</style>