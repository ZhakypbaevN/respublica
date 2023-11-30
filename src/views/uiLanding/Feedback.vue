<template>
  <div class="wrapper-main dark">
    <Header withoutNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <h2 class="wrapper-darkMain-title">Выберите тему для обращения</h2>
        <p class="wrapper-darkMain-description">Функция “обратная связь”, позволяет пользователям связаться с партией по различным вопросам</p>

        <div class="feedbackModal-mainBtns">
          <Button
            name="ВСТУПЛЕНИЕ В ПАРТИЮ"
            type="default-blue"
            @click="() => showModals.joinPartyModal = true"
          />
          <!-- <Button
            name="ЗАПИСАТЬСЯ НА ПРИЕМ"
            type="default-blue"
            @click="() => showModals.makeAnAppointment = true"
          /> -->
          <!-- <Button
            name="ПОДАТЬ ОБРАЩЕНИЕ"
            type="default-blue"
            @click="() => showModals.submitAnAppeal = true"
          /> -->
          <!-- <Button
            name="ЗАКАЗАТЬ ЗВОНОК"
            type="default-blue"
            @click="() => showModals.orserACall = true"
          /> -->
        </div>

        <RouterLink to="/">
          <Button
            name="Вернуться в “Главное меню”"
            type="outline-light"
          />
        </RouterLink>
      </div>
    </div>
    <div></div>

    <SubmitAnAppealModal
      :show="showModals.submitAnAppeal"
      @hide="() => showModals.submitAnAppeal = false"
    />

    <JoinPartyModal
      :show="showModals.joinPartyModal"
      @hide="() => showModals.joinPartyModal = false"
    />

    <OrderACallModal
      :show="showModals.orserACall"
      @hide="() => showModals.orserACall = false"
    />

    <MakeAnAppointmentModal
      :show="showModals.makeAnAppointment"
      @hide="() => showModals.makeAnAppointment = false"
    />

  </div>
</template>

<script setup lang="ts">
import SubmitAnAppealModal from '../../components/uiLanding/feedback/submitAnAppealModal.vue';
import JoinPartyModal from '../../components/uiLanding/feedback/joinPartyModal.vue';
import OrderACallModal from '../../components/uiLanding/feedback/orderACallModal.vue';
import MakeAnAppointmentModal from '../../components/uiLanding/feedback/makeAnAppointmentModal.vue';

import { reactive } from 'vue';

const showModals = reactive({
  joinPartyModal: false,
  submitAnAppeal: false,
  orserACall: false,
  makeAnAppointment: false,
});
</script>

<style lang="scss">
.feedbackModal {
  &-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    margin-bottom: 30px;
  }

  &-checkboxList {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    margin-bottom: 38px;

    &-block {
      display: flex;
      grid-gap: 40px;

      border-bottom: 1px solid var(--light-gray-color);

      padding-bottom: 20px;

      & .feedbackModal-checkboxList-item {
        margin-bottom: 0px !important;
      }
    }
  }

  &-mainBtns {
    display: flex;
    justify-content: center;
    /* display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 82px);
    grid-gap: 20px; */

    margin-bottom: 60px;
  }
}
</style>
