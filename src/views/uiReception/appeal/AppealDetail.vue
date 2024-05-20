<template>
  <section class="appealDetail wrapper-main" v-if="appealData">
    <div class="newsEdit-header wrapper">
      <BackButton />
    </div>

    <div class="appealDetail-inner wrapper">
      <div>
        <div class="appealDetail-block">
          <div class="appealDetail-top">
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Вид обращения:</h4>
              <p class="appealDetail-info-value">Жалоба</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Категория обращения:</h4>
              <div class="appealDetail-info-value appealDetail-category">Экология</div>
            </div>

            <h4 class="appealDetail-info-title">Содержание:</h4>
            <p>
              Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com;
              На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция;
              Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.

            </p>
          </div>

          <h3 class="appealDetail-block-title">Прикрепленные файлы</h3>

          <div class="appealDetail-block-userInfos">
            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Фото:</h4>
              <div class="appealDetail-info-value-mediaFiles">
                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-7.jpg);`"
                ></div>

                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-6.jpg);`"
                ></div>
              </div>
            </div>

            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Видео:</h4>
              <div class="appealDetail-info-value-mediaFiles">
                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-7.jpg);`"
                ></div>
              </div>
            </div>

            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Документ:</h4>
              <div class="appealDetail-info-value-docs">
                <a class="appealDetail-info-value-docs-item" href="#">ТЗ по мобильному приложению (1).docx</a>
              </div>
            </div>
          </div>
        </div>

        <div class="appealDetail-block">
          <Input
            type="textarea"
            placeholder="Оставить комментарий"
            staticPlaceholder
            :maxSymbol="1000"
          />

          <div>
            <p class="appealDetail-info-title">Фото / Видео</p>

            <Button
              class="appealDetail-addFileBtn"
              :name="$t('button.attach-a-file')"
              type="outline-blue"
              v-slot:left
            >
              <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
            </Button>

            <p class="appealDetail-description" v-html="$t('formdata.the-maximum-size-of-a-single-file-is-19-mb')"></p>
          </div>
        </div>
        
        <!-- <div class="appealDetail-block answer">
          <div class="appealDetail-answer">Ответ на обращение”</div>
          <p>
            Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; <br>
            На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; <br>
            Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.
          </p>
          <br>
          
          <h3 class="appealDetail-block-title">Прикрепленные файлы</h3>

          <div class="appealDetail-block-userInfos">
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Фото:</h4>
              <p class="appealDetail-info-value">-</p>
            </div>
          </div>
        </div> -->

        <div class="appealDetail-btns">
          <Button
            name="Направить на рассмотрение"
            type="default-blue"
          />
          <Button
            name="Ответить и завершить"
            type="default-green"
          />
        </div>
      </div>

      <div>
        <div class="appealDetail-block">
          <h3 class="appealDetail-block-title">Ваши личные данные</h3>

          <div class="appealDetail-userInfos">
            <div class="appealDetail-userInfos-mainInfo">
              <h3 class="appealDetail-userInfos-mainInfo-fullname">САРСЕНОВА АЙГЕРИМ БАУБЕКОВНА</h3>
              <div class="appealDetail-userInfos-mainInfo-status"><span>Находящиеся в отпуске по уходу за детьми</span></div>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Пол:</h4>
              <p class="appealDetail-info-value">Женщина</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Дата рождения:</h4>
              <p class="appealDetail-info-value">17.05.86</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">ИИН:</h4>
              <p class="appealDetail-info-value">930512589658</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Телефон:</h4>
              <p class="appealDetail-info-value">+7 707 875 58 58</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">E-mail:</h4>
              <p class="appealDetail-info-value">baubekovna@gmail.com</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Статус:</h4>
              <p class="appealDetail-info-value blue">Член партии Respublica</p>
            </div>
          </div>
        </div>

        <div class="appealDetail-block">
          <div class="appealDetail-info-item">
            <h4 class="appealDetail-info-title">Создано:</h4>
            <p class="appealDetail-info-value">15 июля 2023 г.</p>
          </div>
        </div>

        <div class="appealDetail-block">
          <div class="appealDetail-info-item status">
            <h4 class="appealDetail-info-title">Статус обращения:</h4>
            <p class="appealDetail-info-value">25 июля 2023 г.</p>
          </div>

          <Button
            name="В компетентный орган"
            type="default-grey-dark"
            class="appealDetail-block-btn"
          />
        </div>
          
        <Button
          name="Показать все действия по обращению"
          type="outline-grey"
          class="appealDetail-block-btn-changeStatus"
          style="width: 100%;"
        />

        <Button
          class="appealDetail-block-btn-download"
          name="Скачать PDF"
          type="outline-blue"
          v-slot:left
        >
          <SvgIcon
            name="download"
            :viewboxWidth="32"
            :viewboxHeight="32"
          />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const appealData = ref({
  id: 1,
  appleanCategory: {
    title: 'Иммиграция и миграция',
    color: '#28C397',
  },
  file: 4,
  region: 'Алматы',
  status: {
    title: 'В компетентный орган'
  },
  dayOfAcceptance: '12-05-2024',
  locality: '',
  streat: '',
  house: '',
  appartment: '',
  appleanType: '',
  messege: ''
});

// onMounted(() => {

//   const url = `https://tri.codetau.com/appealList?id=${route.params.appeal_id}`;
//   axios({
//     method: "get",
//     url: url,
//   })
//     .then((response) => {
//       appealData.value = null;

//       response.data.forEach(user => {
//         appealData.value = user;
//       });
//     })
//     .catch((err) => {
//       console.log('err', err);
//       toast({
//         message: 'Возникли ошибки при запросе'
//       })
//     });
// })
</script>

<style scoped lang="scss">
.wrapper-main {
  min-height: 100%;
  grid-gap: 20px;
  
  padding: 40px 0;
  background-color: var(--accent-color-op05);

  justify-content: start !important;
}

.appealDetail {
  &-inner {
    display: grid;
    grid-template-columns: 1fr 425px;
    grid-gap: 20px;
  }

  &-top {
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    margin-bottom: 25px;
  }

  &-block {
    border-radius: 10px;
    background: #FFF;
    
    padding: 25px;
    margin-bottom: 20px;

    &.answer {
      border: 1px solid var(--green-color);
      border-radius: 0px 10px 10px 10px;
    }

    &-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    &-userInfos {
      display: flex;
      flex-direction: column;
      grid-gap: 8px;

      margin-bottom: 30px;
    }

    &-btn {
      padding: 9px 20px;

      &-changeStatus {
        width: 100%;

        padding: 9px 20px;
        margin-bottom: 20px;
      }

      &-download {
        display: flex;
        align-items: center;
        grid-gap: 10px;

        & svg {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }

  &-category {
    width: fit-content;
    
    color: #28C397;
    font-size: 18px;
    font-weight: 500;
    
    border-radius: 8px;
    background: hsl(165, 57%, 95%);

    padding: 9px 19px;
  }

  &-answer {
    width: fit-content;

    position: relative;
    top: -25px;
    left: -25px;

    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    
    border-radius: 0px 10px 10px 0px;
    background: var(--green-color);

    padding: 20px 25px;
  }

  &-userInfos {
    &-mainInfo {
      margin-bottom: 20px;

      &-fullname {
        color: var(--accent-color);
        font-size: 20px;
        font-weight: 600;

        margin-bottom: 10px;
      }

      &-status {
        display: inline-block;

        padding: 10px 15px;
        background-color: var(--accent-color-op10);
        border-radius: 50px;

        & span {
          color: var(--accent-color);
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    & .appealDetail-info-item {
      margin-bottom: 14px;
    }
  }

  &-info {
    &-item {
      display: flex;
      align-items: center;
      grid-gap: 8px;

      &.mediaFiles {
        align-items: flex-start;
        margin-bottom: 20px;

        & .appealDetail-info-title {
          min-width: 100px;
        }
      }

      &.status {
        margin-bottom: 15px;
      }

      & .appealDetail-info-title {
        margin-bottom: 0px;
      }
    }

    &-title {
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;

      margin-bottom: 15px;
    }

    &-value {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0px;

      &.blue {
        color: var(--accent-color);
      }

      &-mediaFiles {
        display: grid;
        grid-template-columns: repeat(3, 170px);
        grid-gap: 15px;

        &-item {
          height: 110px;
        }
      }

      &-docs {
        display: flex;
        flex-direction: column;
        grid-gap: 14px;

        &-item {
          font-size: 18px;
          font-weight: 500;
          color: var(--accent-color);
          text-decoration: underline;
        }
      }
    }
  }

  &-status {
    width: fit-content;
    padding: 9px 19px;
    border-radius: 8px;

    color: #FFF;
    font-size: 18px;
    font-weight: 500;

    margin-top: 20px;
    
    &.accepted {
      background: var(--green-color);
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
