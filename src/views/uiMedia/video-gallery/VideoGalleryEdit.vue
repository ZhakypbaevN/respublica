<template>
  <section class="">
    <div class="newsEdit wrapper">
      <h2 class="landing-title">Новое видео</h2>

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
            />
          </div>
        </div>

        <div class="newsEdit-form-btns">
          <Button
            name="Создать новость"
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
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

const loading = ref(false)
const token = localStorage.getItem('TOKEN');

// Post
const postNews = ({ title, content }: { title: string, content: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles`;

  const formData = new FormData();
  const data = {
    category_id: 4, 
    title: title, 
    content: content, 
    source_url: null, 
    published: true
  }
  formData.append("article", JSON.stringify(data));

  axios({
    method: "post",
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
        message: 'Новость успешно создана'
      })
      
    })
    .catch((err) => {
      console.log('err', err);
      
      toast({
        message: 'Возникли ошибки при запросе'
      })
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