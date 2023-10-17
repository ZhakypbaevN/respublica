<template>
  <section class="">
    <div class="newsEdit wrapper">
      <h2 class="landing-title">Новая новость</h2>

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
            <label for="" class="newsEdit-formItem-label">Подзаголовок</label>
            <Input
              name="subtitle"
              type="textarea"
              placeholder="Введите текст обращения"
              :maxSymbol="250"
              staticPlaceholder
            />
          </div>

          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Фото / Видео</label>
            <Button
              class="newsEdit-addFileBtn"
              name="Прикрепить файл"
              type="outline-blue"
              v-slot:left
            >
              <SvgIcon
                name="plus"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>
          </div>

          <div class="newsEdit-formItem">
            <label for="content" class="newsEdit-formItem-label">Текст обращения</label>
            <Input
              name="content"
              type="textarea"
              placeholder="Введите текст обращения"
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
const token = ref();

const postNews = ({ title, subtitle, content }: { title: string, subtitle: string, content: string }) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/auth/login`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category_id", '6');
  formData.append("preview_text", subtitle);
  formData.append("content", content);
  formData.append("published", 'true');

  axios({
    method: "post",
    url: url,
    data: formData
  })
    .then((response) => {
      
      token.value = response.data['access_token'];
      localStorage.setItem('TOKEN', token.value);
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
}
</style>