<template>
  <div class="introBottom">
    <div class="wrapper landing-wrapper">
      <div class="introBottom-inner">
        <SocialNetworks
          lightBlue
          class="introBottom-sn"
        />

        <div class="introBottom-btns">
          <Button
            :name="$t('feedback.join-the-party')"
            type="outline-light"
            @click="() => showModals.joinPartyModal = true"
            uppercase
          />
          <RouterLink to="/donations">
            <Button
              :name="$t('page.donations')"
              type="outline-light"
              uppercase
            />
          </RouterLink>
        </div>
      </div>
    </div>

    <JoinPartyModal
      :show="showModals.joinPartyModal"
      @hide="() => showModals.joinPartyModal = false"
    />

    <MakeAnAppointmentModal
      :show="showModals.makeAnAppointment"
      @hide="() => showModals.makeAnAppointment = false"
    />
  </div>
</template>

<script setup lang="ts">
  import SocialNetworks from '@/components/uiLanding/layouts/SocialNetworks.vue';
  import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';
  import MakeAnAppointmentModal from '@/components/uiLanding/feedback/MakeAnAppointmentModal.vue';

  import { reactive } from 'vue';

  const showModals = reactive({
    joinPartyModal: false,
    makeAnAppointment: false,
  });
</script>

<style scoped lang="scss">
.introBottom {
  background-color: var(--accent-color);

  &-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 160px;

    padding: 28px 0;
  }

  &-btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    & button.default-blue {
      /* padding: 48px 20px; */
      /* border-radius: 0px; */

      &:hover {
        background-color: var(--primary-color-op10) !important;
      }
    }

    & a button {
      width: 100%;
    }
  }

  // Adaptation
  @media (max-width: 1600px) {
    &-btns {
      & button.default-blue {
        padding: 40px 20px;
      }
    }
  }

  @media (max-width: 1200px) {
    &-inner {
      grid-gap: 80px;

      padding: 24px 0;
    }
  }

  @media (max-width: 992px) {
    &-inner {
      flex-direction: column;
      grid-gap: 20px;

      padding: 22px 0;
    }

    &-sn {
      width: 100%;
      justify-content: center;

      padding: 18px 0;
      border-bottom: 1px solid rgba(white, .2);
    }

    &-btns {
      grid-gap: 18px;
    }
  }

  @media (max-width: 768px) {
    &-inner {
      padding: 20px 0;
    }

    &-btns {
      width: 100%;
      grid-gap: 16px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    &-sn {
      width: 100%;
      justify-content: center;

      padding: 16px 0;
    }
  }

  @media (max-width: 420px) {
    &-btns {
      display: flex;
      flex-direction: column;

      & a, & button {
        width: 100%;
      }
    }
  }

  @media (max-width: 380px) {
    &-sn {
      width: 100%;
      justify-content: center;

      padding: 14px 0;
      border-bottom: 1px solid rgba(white, .2);
    }
  }
}
</style>
