<template>
  <section class="">
    <div class="newsEdit wrapper">
      <h2 class="landing-title">{{ route.params.news_id ? formData.title : 'Новое новость от прессы' }}</h2>

      <Form
        @finish="postNews"
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
            <label for="" class="newsEdit-formItem-label">Автор (пресса)</label>
            <Input
              name="subtitle"
              type="textarea"
              placeholder="Введите текст автора прессы"
              :maxSymbol="250"
              v-model="formData.subtitle"
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

          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Фото</label>
            <Button
              class="newsEdit-addFileBtn"
              name="Прикрепить файл"
              type="outline-blue"
              v-slot:left
              @click="clickInputFile"
            >
              <input
                type="file"
                id="upload-files"
                multiple
                style="display: none"
                @change="uploadFiles"
              />
              <SvgIcon
                name="plus"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>
          </div>

          <div class="newsEdit-doc">
            <h4 class="newsEdit-doc-title">Документ:</h4>
            <label v-if="!newsData.preview" for="upload-files" class="newsEdit-doc-name empty">Прикрепите обязательно файл заполненной формы</label>
            <div v-else class="newsEdit-doc-namEwithAction">
              <div class="newsEdit-doc-name">{{ newsData.preview?.name }}</div>
              <SvgIcon
                class="newsEdit-doc-remove"
                name="x"
                :viewboxHeight="14"
                :viewboxWidth="21"
                :width="24"
                :height="24"
                @click="deleteFile()"
              />
            </div>
          </div>

          <div class="newsEdit-formItem">
            <label for="content" class="newsEdit-formItem-label">Текст обращения</label>
            <Input
              name="content"
              type="textarea"
              placeholder="Введите текст обращения"
              v-model="formData.content"
              staticPlaceholder
            />
          </div>
        </div>

        <div class="newsEdit-form-btns">
          <Button
            :name="
              route.params.video_id
                ? 'Сохранить'
                : 'Создать новость'
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
import { useToast } from '../../../modules/toast'
import { useRoute } from 'vue-router';

const route = useRoute()
const { toast } = useToast()

const newsData = reactive({
  preview: null
})
const loading = ref(false)
const token = localStorage.getItem('TOKEN');
const fileTypes = ['png', 'jpg', 'jpeg', 'gif', 'JPG'];

const formData = reactive({
  title: '',
  subtitle: '',
  source: '',
  content: ''
})

const clickInputFile = () => {
  document.getElementById('upload-files')?.click();
}

const deleteFile = () => {
  newsData.preview = null;
}

const uploadFiles = (event) => {
  if (event.target.files.length > 0) {
    if (isDocx(event.target.files[0].name)) newsData.preview = event.target.files[0];
    else {
      toast({
        message: 'Документ должен быть с рачширением ' + fileTypes.join(', ')
      })
    }
  }
}

const isDocx = (fileName) => {
  const type = fileName.split(".")
  return fileTypes.includes(type[type.length - 1])
}

// Get News
onMounted(() => {
  if (route.params.news_id) {
    const url = `https://api.respublica.codetau.com/api/v1/admin/articles/{id}?article_id=${route.params.news_id}`;

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
        formData.source = response.data.source_url;
        
        
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
const postNews = ({ title, subtitle, source, content }: { title: string, subtitle: string, source: string, content: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles`;

  const formData = new FormData();
  const data = {
    category_id: 3, 
    title: title, 
    preview_text: subtitle, 
    content: content, 
    source_url: source, 
    published: true
  }
  
  formData.append("article", JSON.stringify(data));
  // formData.append("preview_image", newsData.preview!);

  axios({
    method: route.params.news_id ? "put" : "post",
    url: url,
    data: formData,
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
.wrapper {
  /* background-color: var(--accent-color-op05); */
  padding-top: 40px;
}

.newsEdit {
  &-form {
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

  &-addFileBtn {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 38px;
    margin-bottom: 8px;

    & svg {
      width: 24px;
      height: 24px;
      fill: var(--accent-color);
    }
  }
  &-doc {
    display: flex;
    grid-gap: 9px;
    margin-bottom: 50px;

    &-title {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
    }

    &-name {
      color: var(--accent-color);
      font-size: 20px;
      text-decoration-line: underline;
      margin-bottom: 0px !important;

      &.empty {
        
        color: var(--red-color);
      }
    }

    &-namEwithAction {
      display: flex;
      align-items: center;
      grid-gap: 10px;
    }

    &-remove {
      height: 20px;
      width: 20px;
      cursor: pointer;

      fill: var(--red-color);
    }
  }
}
</style>