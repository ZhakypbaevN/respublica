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
            type="default-blue"
            @click="() => showModals.joinPartyModal = true"
            uppercase
          />
          <RouterLink to="/donations">
            <Button
              :name="$t('page.donations')"
              type="default-blue"
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
  }

  &-btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & button.default-blue {
      padding: 48px 20px;
      border-radius: 0px;

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
    }

    &-btns {
      & button.default-blue {
        padding: 30px 20px;
      }
    }
  }

  @media (max-width: 992px) {
    &-inner {
      grid-gap: 60px;
    }

    &-btns {
      & button.default-blue {
        padding: 28px 20px;
      }
    }
  }

  @media (max-width: 768px) {
    &-inner {
      flex-direction: column;
      grid-gap: 0;
    }

    &-sn {
      width: 100%;
      justify-content: center;

      padding: 18px 0;
      border-bottom: 1px solid rgba(white, .2);
    }

    &-btns {
      width: 100%;
      & button.default-blue {
        padding: 20px 20px;
      }
    }
  }

  @media (max-width: 576px) {
    &-sn {
      width: 100%;
      justify-content: center;

      padding: 16px 0;
      border-bottom: 1px solid rgba(white, .2);
    }

    &-btns {
      & button.default-blue {
        padding: 20px 10px;
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

    &-btns {
      display: block;

      & a, & button {
        width: 100%;
      }
      & button.default-blue {
        padding: 18px 10px;
      }

      & button:first-child {
        border-bottom: 1px solid rgba(white, .2);
      }
    }
  }
}
</style>
