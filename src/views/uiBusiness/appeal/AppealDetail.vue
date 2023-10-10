<template>
  <div class="wrapper-main">
    <section class="appealDetail wrapper" v-if="appealData">
      <div>
        <div class="appealDetail-block">
          <div class="appealDetail-top">
            <div class="appealDetail-id">№<span> {{ appealData.id }}</span></div>
            <div class="appealDetail-category">{{ appealData.appleanCategory }}</div>
          </div>

          <h2 class="appealDetail-title">{{ appealData.appleanType }}</h2>

          <h4 class="appealDetail-info-title">Описание</h4>
          <p>
            {{ appealData.messege }}
          </p>

          <br>
          
          <h3 class="appealDetail-block-title">Прикрепленные файлы</h3>

          <div class="appealDetail-block-userInfos">
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Фото:</h4>
              <p class="appealDetail-info-value">-</p>
            </div>
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Документ:</h4>
              <p class="appealDetail-info-value">-</p>
            </div>
          </div>
        </div>
        
        <div class="appealDetail-block answer">
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
        </div>

        <div class="appealDetail-btns">
          <Button
            name="Принять"
            type="default-green"
          />
          <Button
            name="Отправить на доработку"
            type="default-blue"
          />
          <Button
            name="Не подлежит рассмотрению"
            type="default-red"
          />
        </div>
      </div>

      <div>
        <div class="appealDetail-block">
          <h3 class="appealDetail-block-title">Ваши данные</h3>

          <div class="appealDetail-block-userInfos">
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">ФИО:</h4>
              <p class="appealDetail-info-value">Киценко Артем</p>
            </div>
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Телефон:</h4>
              <p class="appealDetail-info-value">+7 707 875 58 58</p>
            </div>
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Статус:</h4>
              <p class="appealDetail-info-value blue">Член партии Respublica</p>
            </div>
          </div>


          <div class="appealDetail-info-item">
            <h4 class="appealDetail-info-title">Локация:</h4>
            <p class="appealDetail-info-value">{{ `${appealData.region}, ${appealData.locality}, ${appealData.streat}, Дом ${appealData.house}, Квартира ${appealData.appartment}` }}</p>
          </div>
        </div>

        <div class="appealDetail-block">
          <div class="appealDetail-info-item">
            <h4 class="appealDetail-info-title">Создано:</h4>
            <p class="appealDetail-info-value">{{ appealData.dayOfAcceptance }}</p>
          </div>
        </div>

        <div class="appealDetail-block">
          <div class="appealDetail-info-item">
            <h4 class="appealDetail-info-title">Статус обращения:</h4>
            <p class="appealDetail-info-value">25 июля 2023 г.</p>
          </div>
          <div class="appealDetail-status accepted">Принято</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'

const { toast } = useToast()
const route = useRoute()

const appealData = ref(null);

onMounted(() => {

  const url = `https://tri.codetau.com/appealList?id=${route.params.appeal_id}`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      appealData.value = null;

      response.data.forEach(user => {
        appealData.value = user;
      });
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
})
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding-top: 40px;
}

.appealDetail {
  display: grid;
  grid-template-columns: 1fr 425px;
  grid-gap: 20px;

  &-top {
    display: flex;
    align-items: center;
    grid-gap: 40px;
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
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  &-id {
    font-size: 18px;
    font-weight: 700;

    & span {
      color: var(--light-gray-color);
    }
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

  &-info {
    &-item {
      display: flex;
      grid-gap: 8px;

      & .appealDetail-info-title {
        margin-bottom: 0px;
      }
    }

    &-title {
      display: inline-block;
      min-width: 95px;

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
}
</style>
