<template>
  <div class="wrapper-main">
    <section class="myRequestDetail wrapper">
      <div>
        <div class="myRequestDetail-block">
          <div class="myRequestDetail-category">Экология</div>

          <h2 class="myRequestDetail-title">Участие в мероприятиях. Вступление в партию</h2>

          <h4 class="myRequestDetail-info-title">Описание</h4>
          <p>
            Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; <br>
            На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; <br>
            Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.
          </p>
          
          <h3 class="myRequestDetail-block-title">Прикрепленные файлы</h3>

          <div class="myRequestDetail-block-userInfos">
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">Фото:</h4>
            </div>
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">Документ:</h4>
              <p class="myRequestDetail-info-value">ТЗ по мобильному приложению (1).docx</p>
            </div>
          </div>
        </div>
        
        <div class="myRequestDetail-block answer">
          <div class="myRequestDetail-answer">Ответ на обращение”</div>
          <p>
            Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; <br>
            На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; <br>
            Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.
          </p>
          
          <h3 class="myRequestDetail-block-title">Прикрепленные файлы</h3>

          <div class="myRequestDetail-block-userInfos">
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">Фото:</h4>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="myRequestDetail-block">
          <h3 class="myRequestDetail-block-title">Ваши данные</h3>

          <div class="myRequestDetail-block-userInfos">
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">ФИО:</h4>
              <p class="myRequestDetail-info-value">Киценко Артем</p>
            </div>
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">Телефон:</h4>
              <p class="myRequestDetail-info-value">+7 707 875 58 58</p>
            </div>
            <div class="myRequestDetail-info-item">
              <h4 class="myRequestDetail-info-title">Статус:</h4>
              <p class="myRequestDetail-info-value blue">Член партии Respublica</p>
            </div>
          </div>


          <div class="myRequestDetail-info-item">
            <h4 class="myRequestDetail-info-title">Локация:</h4>
            <p class="myRequestDetail-info-value">Алматинская область, г. Алматы</p>
          </div>
        </div>

        <div class="myRequestDetail-block">
          <div class="myRequestDetail-info-item">
            <h4 class="myRequestDetail-info-title">Создано:</h4>
            <p class="myRequestDetail-info-value">15 июля 2023 г.</p>
          </div>
        </div>

        <div class="myRequestDetail-block">
          <div class="myRequestDetail-info-item">
            <h4 class="myRequestDetail-info-title">Статус обращения:</h4>
            <p class="myRequestDetail-info-value">25 июля 2023 г.</p>
          </div>
          <div class="myRequestDetail-status accepted">Принято</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding-top: 40px;
}

.myRequestDetail {
  display: grid;
  grid-template-columns: 1fr 425px;
  grid-gap: 20px;

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

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  &-category {
    width: fit-content;
    
    color: #28C397;
    font-size: 18px;
    font-weight: 500;
    
    border-radius: 8px;
    background: hsl(165, 57%, 95%);

    padding: 9px 19px;
    margin-bottom: 25px;
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

      & .myRequestDetail-info-title {
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
