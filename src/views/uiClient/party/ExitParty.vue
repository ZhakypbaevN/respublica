<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <h2 class="landing-title">Выйти из партии</h2>

        <div class="exitParty">
          <div class="exitParty-content">
            <div class="exitParty-content-messege">
              <h4 class="exitParty-content-subtitle">Дорогой пользователь,</h4><br>
              <p>Мы ценим ваше участие и вклад в нашу партию и организацию. Ваше решение выйти из-под пристального внимания, и мы глубоко уважаем ваш выбор.</p>
            </div>

            <div class="exitParty-content-listBlock">
              <h4 class="exitParty-content-subtitle">Для выполнения этой процедуры, пожалуйста, следуйте инструкциям ниже:</h4>
              <ul class="exitParty-content-listBlock-list">
                <li>Заполните форму, предоставленную по следующей ссылке: <a href="/doc/ru/Respublica. Партиядан шығу туралы өтініш. Заявление о выходе из партии .docx">"Открыть"</a>.</li>
                <li>После того как вы заполнили форму, пожалуйста, распечатайте ее.</li>
                <li>Подпишитесь на распечатанной форме, удостоверяя тем самым ваше намерение выйти из партии.</li>
                <li>Отсканируйте или сфотографируйте заполненную и подписанную форму.</li>
                <li>Прикрепите отсканированный/сфотографированный документ к данному сообщению</li>
              </ul>
            </div>

            <p>
              Пожалуйста, обратите внимание, что ваша заявка будет оформлена после получения заполненной формы с вашей подписью. Если у вас возникли какие-либо вопросы или требуется дополнительная помощь, не стесняйтесь обращаться к нашей службе поддержки. +7 707 877777<br>
              Спасибо за сотрудничество и понимание.
            </p>
          </div>

          <Button
            class="exitParty-addFileBtn"
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


          <div class="exitParty-doc">
            <h4 class="exitParty-doc-title">Документ:</h4>
            <p class="exitParty-doc-name empty">Прикрепите обязательно файл заполненной формы</p>
          </div>


          <div class="exitParty-btns">
            <Button
              class="exitParty-addFileBtn"
              name="Отправить"
            />
            <Button
              class="exitParty-addFileBtn"
              name="Отмена"
              type="default-grey"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper-main {
  padding-top: 40px;
  background-color: var(--accent-color-op05);
}

.exitParty {
  &-content {
    margin-bottom: 65px;

    &-subtitle {
      font-size: 20px;
      font-weight: 700;
    }
  
    &-messege,
    &-listBlock {
      margin-bottom: 30px;
    }
  
    &-listBlock-list {
      list-style-type: decimal;
      padding-left: 22px;
  
      & li {
        font-size: 20px;

        & a {
          color: var(--accent-color);
        }
      }
    }
  
    & p {
      font-size: 20px;
    }
  }

  &-addFileBtn {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 38px;

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
      font-size: 20px;
      text-decoration-line: underline;

      &.empty {
        
        color: var(--red-color);
      }
    }
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
