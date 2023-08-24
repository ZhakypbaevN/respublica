<template>
  <div class="wrapper-main dark">
    <Header withoutTopAndNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <h2 class="wrapper-darkMain-title">Выберите тему для обращения</h2>
        <p class="wrapper-darkMain-description">Функция “обратная связь”, позволяет пользователям связаться с партией по различным вопросам</p>

        <div class="feedback-mainBtns">
          <Button
            name="ВСТУПЛЕНИЕ В ПАРИЮ"
            type="default-blue"
          />
          <Button
            name="ЗАПИСАТЬСЯ НА ПРИЕМ"
            type="default-blue"
          />
          <Button
            name="ПОДАТЬ ОБРАЩЕНИЕ"
            type="default-blue"
          />
          <Button
            name="ЗАКАЗАТЬ ЗВОНОК"
            type="default-blue"
            @click="() => showModals.orserACall = true"
          />
        </div>

        <RouterLink to="/">
          <Button
            name="Вернуться в “Главное меню”"
            type="outline-light"
          />
        </RouterLink>
      </div>
    </div>

    <OrderACallModal
      :show="showModals.orserACall"
      @hide="() => showModals.orserACall = false"
    />

    <FooterMini />
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import FooterMini from '../../components/uiLanding/layouts/footer-mini.vue';

import OrderACallModal from '../../components/uiLanding/feedback/OrderACallModal.vue';

import { reactive } from 'vue';

const showModals = reactive({
  orserACall: false
});
</script>

<style scoped lang="scss">
.feedback {
  &-mainBtns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 82px);
    grid-gap: 20px;

    margin-bottom: 60px;
  }
}
</style>
