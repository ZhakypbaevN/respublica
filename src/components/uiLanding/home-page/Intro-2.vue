<template>
  <section class="intro">
    <div class="intro-main">
        <div class="intro-main-preview bg-cover"></div>
    </div>

    <div class="intro-bottom">
      <div class="wrapper landing-wrapper">
        <div class="intro-bottom-inner">
          <SocialNetworks lightBlue />

          <div class="intro-bottom-btns">
          <div></div>
            <Button
              :name="$t('feedback.join-the-party')"
              type="default-blue"
              @click="() => showModals.joinPartyModal = true"
              data-aos="fade-left"
              uppercase
            />
            <!-- <Button
              :name="$t('home-submit-an-apeal')"
              type="default-blue"
              @click="() => showModals.submitAnAppeal = true"
              data-aos="fade-left"
              uppercase
            /> -->
            <RouterLink to="/donations">
              <Button
                :name="$t('page.donations')"
                type="default-blue"
                data-aos="fade-left"
                uppercase
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <SubmitAnAppealModal
      :show="showModals.submitAnAppeal"
      @hide="() => showModals.submitAnAppeal = false"
    />

    <JoinPartyModal
      :show="showModals.joinPartyModal"
      @hide="() => showModals.joinPartyModal = false"
    />

    <MakeAnAppointmentModal
      :show="showModals.makeAnAppointment"
      @hide="() => showModals.makeAnAppointment = false"
    />
  </section>
</template>

<script setup lang="ts">
import SocialNetworks from '@/components/uiLanding/layouts/SocialNetworks.vue';
import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';
import SubmitAnAppealModal from '@/components/uiLanding/feedback/SubmitAnAppealModal.vue';
import MakeAnAppointmentModal from '@/components/uiLanding/feedback/MakeAnAppointmentModal.vue';

import { reactive } from 'vue';

const showModals = reactive({
  joinPartyModal: false,
  submitAnAppeal: false,
  makeAnAppointment: false,
});
</script>

<style scoped lang="scss">
.intro {
  &-main {
    padding-top: 40%;
    position: relative;

    &-preview {
      width: 100%;
      height: 100%;

      position: absolute;
      left: 0;
      bottom: 0;

      background-image: url('/img/uiLanding/home/intro/intro-bg.jpg');
    }
  }

  &-bottom {
    background-color: var(--accent-color);

    &-inner {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-gap: 60px;
    }

    &-btns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      & button.default-blue {
        padding: 48px 0;
        border-radius: 0px;

        &:hover {
          background-color: var(--primary-color-op10) !important;
        }
      }

      & a button {
        width: 100%;
      }
    }
  }

  // Adaptation
  @media (max-width: 1600px) {
    &-main {
      &-content {
        bottom: 70px;

        &-logo {
          width: 200px;
          height: 200px;
        }

        &-title span {
          font-size: 60px;
        }
      }
    }

    &-bottom {
      &-inner {
        grid-gap: 50px;
      }

      &-btns button.default-blue {
        padding: 48px 0;
      }
    }
  }

  @media (max-width: 1400px) {
    &-main {
      &-content {
        bottom: 70px;

        &-logo {
          width: 190px;
          height: 190px;
        }

        &-title span {
          font-size: 52px;
        }
      }
    }

    &-bottom {
      &-inner {
        grid-gap: 60px;
      }

      &-btns button.default-blue {
        padding: 44px 0;
      }
    }
  }

  @media (max-width: 1200px) {
    &-main {
      &-content {
        bottom: 50px;

        &-logo {
          width: 180px;
          height: 180px;
        }

        &-title span {
          font-size: 44px;
        }
      }
    }

    &-bottom {
      &-inner {
        grid-gap: 60px;
      }

      &-btns button.default-blue {
        padding: 38px 0;
      }
    }
  }

  @media (max-width: 992px) {
    display: none;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}

@keyframes spinAndZoom {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(360deg);
  }
  40% {
  }
  45% {
  }
}
</style>
