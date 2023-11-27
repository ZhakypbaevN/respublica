<template>
  <section class="intro">
    <div class="intro-main">
        <div class="intro-main-preview bg-cover"></div>

      <div class="intro-main-content">
        <div class="wrapper landing-wrapper">
          <div class="intro-main-content-inner">
            <SvgIcon
              class="intro-main-content-map"
              name="kazakhstan-map-dots"
              :viewboxWidth="523"
              :viewboxHeight="251"
            />
            
            <h2 class="intro-main-content-title">
              <span class="blue" data-aos="zoom-in" data-aos-delay="250">{{ $t("intro-new-people") }}</span> <br>
              <span data-aos="zoom-in" data-aos-delay="300">{{ $t("intro-new-opportunities") }}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="intro-bottom">
      <div class="wrapper landing-wrapper">
        <div class="intro-bottom-inner">
          <SocialNetworks lightBlue />

          <div class="intro-bottom-btns">
            <Button
              :name="$t('home-join-the-party')"
              type="default-blue"
              @click="() => showModals.joinPartyModal = true"
              data-aos="fade-left"
              uppercase
            />
            <Button
              :name="$t('home-submit-an-apeal')"
              type="default-blue"
              @click="() => showModals.submitAnAppeal = true"
              data-aos="fade-left"
              uppercase
            />
            <RouterLink to="/donations">
              <Button
                :name="$t('header-donations')"
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
import SocialNetworks from '../../../components/uiLanding/layouts/socialNetworks.vue';
import JoinPartyModal from '../../../components/uiLanding/feedback/joinPartyModal.vue';
import SubmitAnAppealModal from '../../../components/uiLanding/feedback/submitAnAppealModal.vue';
import MakeAnAppointmentModal from '../../../components/uiLanding/feedback/makeAnAppointmentModal.vue';

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

      background-image: url('/img/uiLanding/home/intro-2/intro-banner.jpg');

      &::before,
      &::after {
        content: '';
    
        display: block;
        width: 100%;
        height: 100%;
    
        position: absolute;
        left: 0;
        bottom: 0;
      }
    
      &::before {
        z-index: 1;
    
        background-image: url('/img/uiLanding/home/intro-2/team-respublic.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;
      }
      &::after {
        height: 40%;
        z-index: 2;
        background: linear-gradient(0deg, #042051 0%, rgba(#042051, 0) 100%);
      }
    }

    &-content {
      width: 100%;

      position: absolute;
      bottom: 90px;
      z-index: 3;

      &-inner {
        width: 100%;

        display: flex;
        justify-content: center;
        padding-left: 250px;

        position: relative;
      }

      &-map {
        width: 523px;
        height: 250.105px;

        position: absolute;
        left: 0;
        top: 50%;
        z-index: -1;
        transform: translateY(-50%);
      }

      &-title {
        display: inline-block;

        & span {
          color: white;
          font-family: "Montserrat";
          text-transform: uppercase;
          font-size: 68px;
          font-weight: 700;
          line-height: 1.1;
        }

        & span.blue {
          color: var(--accent-color);
        }
      }
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

        &-inner {
          padding-left: 250px;
        }

        &-map {
          width: 440px;
          height: 210.4px;

          left: 120px;
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

        &-inner {
          padding-left: 250px;
        }

        &-map {
          width: 400px;
          height: 191.29px;

          left: 140px;
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

        &-inner {
          padding-left: 250px;
        }

        &-map {
          width: 300px;
          height: 143.48px;

          left: 140px;
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
</style>
