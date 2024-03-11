<template>
  <section class="hackathonIntro">
    <div class="wrapper landing-wrapper">
      <div class="hackathonIntro-inner">
        <div class="hackathonIntro-content">
          <div class="hackathonIntro-content-titles">
            <h4 class="hackathonIntro-content-titles-subtitle">
              {{ $t('hackathon.intro.subtitle') }}
            </h4>

            <h2 class="hackathonIntro-content-titles-title">
              {{ $t('hackathon.intro.recodetau') }}
              <span>{{ $t('hackathon.intro.title') }}</span>
            </h2>

            <p class="hackathonIntro-content-titles-description">
              {{ $t('hackathon.intro.description') }}
            </p>
          </div>


          <div class="hackathonIntro-content-btns">
            <a href="https://forms.office.com/r/C2vGaALmV1" target="_blank">
              <Button
                :name="$t('auth.register')"
                type="default-orange"
              />
            </a>
            <Button
              class="hackathonIntro-content-btns-play"
              :name="$t('hackathon.intro.btn-play')"
              type="outline-light"
              v-slot:left
            >
              <SvgIcon
                name="play-with-circle"
                :viewboxWidth="32"
                :viewboxHeight="32"
              />
            </Button>
          </div>
        </div>

        <div class="hackathonIntro-preview">
          <div class="hackathonIntro-preview-globus"></div>
          <div class="hackathonIntro-preview-cloud left">
            <img src="/img/uiLanding/hackathon/intro-preview/cloud-right.png" alt="">
          </div>
          <div class="hackathonIntro-preview-cloud right">
            <img src="/img/uiLanding/hackathon/intro-preview/cloud-right.png" alt="">
          </div>

          <div class="hackathonIntro-preview-people">
            <img src="/img/uiLanding/hackathon/intro-preview/people.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue';

</script>

<style scoped lang="scss">
.hackathonIntro {
  background-color: var(--primary-color);

  &-inner {
    padding: 90px 0 100px;

    position: relative;
  }

  &-content {
    max-width: 950px;

    position: relative;
    z-index: 2;

    & * {
      color: var(--white-color);
    }

    &-titles {
      margin-bottom: 110px;

      &-subtitle {
        font-size: 40px;
        font-weight: 600;
        text-transform: uppercase;
  
        margin-bottom: 24px;
      }
  
      &-title {
        font-size: 70px;
        font-weight: 900;
        color: var(--accent-color);
        text-transform: uppercase;
  
        margin-bottom: 40px;
  
        & span {
          color: var(--orange-color);
        }
      }
  
      &-description {
        max-width: 640px;

        font-size: 20px;
        font-weight: 500;
      }
    }

    &-btns {
      display: flex;
      align-items: stretch;
      grid-gap: 34px;

      & a button {
        width: 100%;
        height: 100%;
      }

      &-play {
        display: flex;
        align-items: center;
        grid-gap: 10px;

        & svg {
          height: 32px;
          width: 32px;
        }
      }
    }
  }

  &-preview {
    height: 90%;
    padding-left: 50%;

    position: absolute;
    top: 50%;
    right: 0;
    z-index: 1;
    transform: translateY(-50%);

    &-cloud {
      width: 102px;
      height: 80px;

      position: absolute;

      &.left {
        top: 0;
        left: 50px;
        animation: leftCloudAnimation 10s linear infinite;
      }

      &.right {
        bottom: 0;
        right: 50px;
        animation: rightCloudAnimation 10s linear infinite;
      }

      & img {
        height: 100%;
        width: 100%;
      }
    }

    &-globus {
      position: absolute;
      right: 0;
      top: 0;

      &::after {
        content: '';
        
        display: block;
        width: 120px;
        height: 120px;

        background: url('/img/uiLanding/hackathon/intro-preview/globe.png') center no-repeat;
        background-size: cover;
        animation: rotate 10s linear infinite;
      }
    }

    &-people {
      height: 80%;
      width: 100%;

      display: flex;
      justify-content: center;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      & img {
        height: 100%;
        width: auto;

        animation: rocket 2s ease-in-out infinite;
      }
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    &-inner {
      padding: 90px 0 100px;
    }

    &-content {
      &-titles {
        margin-bottom: 100px;

        &-subtitle {
          font-size: 38px;
          margin-bottom: 16px;
        }
    
        &-title {
          font-size: 66px;
          margin-bottom: 38px;
        }
    
        &-description {
          font-size: 20px;
        }
      }

      &-btns {
        grid-gap: 34px;

        &-play {
          grid-gap: 10px;

          & svg {
            height: 32px;
            width: 32px;
          }
        }
      }
    }

    &-preview {
    }
  }

  @media (max-width: 1200px) {
    &-inner {
      padding: 80px 0 90px;
    }

    &-content {
      &-titles {
        margin-bottom: 90px;

        &-subtitle {
          max-width: 500px;
          font-size: 30px;
          margin-bottom: 10px;
        }
    
        &-title {
          font-size: 52px;
          margin-bottom: 34px;
        }
    
        &-description {
          max-width: 500px;
          font-size: 18px;
        }
      }

      &-btns {
        grid-gap: 30px;

        &-play {
          grid-gap: 10px;

          & svg {
            height: 30px;
            width: 30px;
          }
        }
      }
    }

    &-preview {
      padding-left: 60%;
    }
  }

  @media (max-width: 992px) {
    &-inner {
      display: flex;
      flex-direction: column;
      grid-gap: 60px;

      padding: 70px 0 80px;
    }

    &-content {
      &-titles {
        margin-bottom: 70px;

        &-subtitle {
          font-size: 26px;
          margin-bottom: 10px;
        }
    
        &-title {
          font-size: 48px;
          margin-bottom: 32px;
        }
    
        &-description {
          font-size: 16px;
        }
      }

      &-btns {
        grid-gap: 30px;

        &-play {
          grid-gap: 10px;

          & svg {
            height: 28px;
            width: 28px;
          }
        }
      }
    }

    &-preview {
      position: relative;
      left: 50%;
      top: auto;
      transform: translateX(-50%);

      width: 88%;
      height: 400px;

      padding-left: 0;
    }
  }

  @media (max-width: 768px) {
    &-inner {
      grid-gap: 50px;

      padding: 60px 0 70px;
    }

    &-content {
      &-titles {
        margin-bottom: 50px;

        &-subtitle {
          font-size: 20px;
          margin-bottom: 8px;
        }
    
        &-title {
          font-size: 40px;
          margin-bottom: 30px;
        }
    
        &-description {
          font-size: 16px;
        }
      }

      &-btns {
        grid-gap: 28px;

        &-play {
          grid-gap: 9px;

          & svg {
            height: 26px;
            width: 26px;
          }
        }
      }
    }

    &-preview {
      width: 88%;
      height: 300px;

      &-cloud {
        width: 76px;
        height: 60px;

        &.left {
          left: 30px;
        }

        &.right {
          right: 30px;
        }
      }

      &-globus {
        &::after {
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-inner {
      grid-gap: 40px;

      padding: 50px 0 60px;
    }

    &-content {
      &-titles {
        margin-bottom: 38px;

        &-subtitle {
          max-width: 100%;
          font-size: 20px;
        }
    
        &-title {
          font-size: 38px;
          margin-bottom: 28px;

          & span {
            &::before {
              content: '______';
              color: transparent;
            }
          }
        }
      }

      &-btns {
        display: grid;
        grid-template-columns: 1fr 70px;
        grid-gap: 20px;

        &-play {
          grid-gap: 9px;

          & svg {
            height: 26px;
            width: 26px;
          }
        }
      }
    }

    &-preview {
      width: 100%;
      height: 280px;

      &-cloud {
        width: 64px;
        height: 50px;

        &.left {
          left: 10px;
        }

        &.right {
          right: 10px;
        }
      }

      &-globus {
        &::after {
          width: 80px;
          height: 80px;
        }
      }
    }
  }

  @media (max-width: 380px) {
    &-inner {
      padding: 40px 0 50px;
    }

    &-content {
      &-titles {
        margin-bottom: 34px;

        &-subtitle {
          font-size: 18px;
        }
    
        &-title {
          font-size: 32px;
          margin-bottom: 24px;
        }
      }

      &-btns {
        grid-template-columns: 1fr 60px;
        grid-gap: 20px;

        &-play {
          & svg {
            height: 24px;
            width: 24px;
          }
        }
      }
    }

    &-preview {
      height: 200px;

      &-cloud {
        width: 51px;
        height: 40px;

        &.left {
          left: 10px;
        }

        &.right {
          right: 10px;
        }
      }

      &-globus {
        &::after {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes leftCloudAnimation {
  0% { transform: translateX(0); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(0); }
}
@keyframes rightCloudAnimation {
  0% { transform: translateX(0); }
  50% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

@keyframes rocket {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

</style>
<style>
@media (max-width: 576px) {
  .hackathonIntro-content-btns-play span {
    display: none;
  }
}
</style>