<template>
  <div class="wrapper-main dark">
    <Header withoutNavs />

    <div class="wrapper">
      <div class="wrapper-darkMain-inner">
        <h2 class="wrapper-darkMain-title">Выберите тему для обращения</h2>
        <p class="wrapper-darkMain-description">Функция “обратная связь”, позволяет пользователям связаться с партией по различным вопросам</p>

        <div class="feedbackModal-mainBtns">
          <Button
            :name="$t('feedback.join-the-party')"
            type="default-blue"
            uppercase
            @click="() => showModals.joinPartyModal = true"
          />
          <!-- <Button
            :name="$t('feedback.make-an-appointment')"
            type="default-blue"
            uppercase
            @click="() => showModals.makeAnAppointment = true"
          /> -->
          <!-- <Button
            :name="$t('feedback.submit-an-appeal')"
            type="default-blue"
            uppercase
            @click="() => showModals.submitAnAppeal = true"
          /> -->
          <!-- <Button
            :name="$t('feedback.order-a-call')"
            type="default-blue"
            uppercase
            @click="() => showModals.orserACall = true"
          /> -->
        </div>

        <RouterLink to="/">
          <Button
            :name="$t('button.go-back-to-the-main-menu')"
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
import SubmitAnAppealModal from '@/components/uiLanding/feedback/SubmitAnAppealModal.vue';
import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';
import OrderACallModal from '@/components/uiLanding/feedback/OrderACallModal.vue';
import MakeAnAppointmentModal from '@/components/uiLanding/feedback/MakeAnAppointmentModal.vue';

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
