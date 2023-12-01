<template>
  <footer class="footer" :class="{withOutMT: withOutMT}">
    <div class="wrapper landing-wrapper">
      <div class="footer-main">
        <div class="footer-mainForm">
          <h3 class="footer-mainForm-title">{{ $t('footer.join-the-party') }}</h3>
          <div class="footer-mainForm-content">
            <RouterLink to="/" class="footer-mainForm-logo">
              <SvgIcon
                name="logo-light"
                :viewboxWidth="449"
                :viewboxHeight="62"
              />
            </RouterLink>

            <SocialNetworks class="footer-mainForm-sn" />
          </div>

          <div class="footer-mainForm-btns">
            <RouterLink to="/feedback">
              <Button :name="$t('feedback.title')" type="default-blue" uppercase />
            </RouterLink>
            <RouterLink to="/donations">
              <Button
                :name="$t('button.donations')"
                class="footer-mainNavs-donatBtn"
                type="default-red"
                uppercase
              >
                <SvgIcon
                  name="donat-arrow-white"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </RouterLink>
          </div>
        </div>

        <div class="footer-mainNavs">
          <div class="footer-mainNavs-item">
            <h4 class="footer-mainNavs-title">{{ $t('footer.party-respublica') }}</h4>
            <div class="footer-mainNavs-links">
              <RouterLink to="/about-party" class="footer-mainNavs-link">{{ $t('page.about-party') }}</RouterLink>
              <RouterLink to="/party-fraction" class="footer-mainNavs-link">{{ $t('page.party-faction') }}</RouterLink>
              <RouterLink to="/regions" class="footer-mainNavs-link">{{ $t('page.regions') }}</RouterLink>
              <RouterLink to="/news" class="footer-mainNavs-link">{{ $t('page.press-center') }}</RouterLink>
              <RouterLink to="/announce-list" class="footer-mainNavs-link">{{ $t('page.announcements') }}</RouterLink>
              <RouterLink to="/contacts" class="footer-mainNavs-link">{{ $t('page.contacts') }}</RouterLink>
              <RouterLink to="/faq" class="footer-mainNavs-link">{{ $t('page.question-and-answer') }}</RouterLink>
            </div>
          </div>

          <div>
            <div class="footer-mainNavs-item team">
              <h4 class="footer-mainNavs-title">{{ $t('footer-team') }}</h4>
              <div class="footer-mainNavs-links">
                <RouterLink to="/deputies-of-majilis" class="footer-mainNavs-link">{{ $t('page.mazhilis-deputies') }}</RouterLink>
                <RouterLink to="/deputies-of-maslikhat" class="footer-mainNavs-link">{{ $t('page.maslikhats-deputies') }}</RouterLink>
                <!-- <RouterLink to="/0980" class="footer-mainNavs-link">Центральный аппарат</RouterLink> -->
                <RouterLink to="/contacts/filials" class="footer-mainNavs-link">{{ $t('page.branches') }}</RouterLink>
                <RouterLink to="/marketplace">
                 <Button :name="$t('footer.marketpalce')" type="default-blue" uppercase />
               </RouterLink>  
              </div>
            </div>
          </div>

        </div>

        <div class="footer-bottom-btns">
          <RouterLink to="/feedback">
            <Button :name="$t('feedback.title')" type="default-blue" uppercase />
          </RouterLink>
          <RouterLink to="/donations">
            <Button
              :name="$t('button.donations')"
              class="footer-mainNavs-donatBtn"
              type="default-red"
              uppercase
            >
              <SvgIcon
                name="donat-arrow-white"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>
          </RouterLink>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-bottom-copyright">{{ $t('footer.respublica-party') }}</p>
        <button class="footer-bottom-siteRightBtn">{{ $t('footer.all-rights-reserved') }}</button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialNetworks from '@/components/uiLanding/layouts/SocialNetworks.vue';
import { RouterLink } from 'vue-router';

interface IProps {
  withOutMT?: boolean,
}

withDefaults(defineProps<IProps>(), {
  withOutMT: false
})

</script>

<style scoped lang="scss">
.footer {
  padding: 80px 0 50px;
  background-color: var(--primary-color);
  margin-top: 70px;

  &.withOutMT {
    margin-top: 0px !important;
  }

  & * {
    color: white;
  }

  &-main {
    display: grid;
    grid-template-columns: 590px 1fr;
    grid-gap: 180px;
    margin-bottom: 65px;
  }

  &-mainForm {
    &-title {
      font-size: 40px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 44px;
    }

    &-logo {
      display: block;
      width: 330px;
      margin-bottom: 45px;
    }

    &-content {
      margin-bottom: 50px;
    }

    &-btns {
      display: flex;
      grid-gap: 20px;
    }
  }

  &-mainNavs {
    display: flex;
    grid-gap: 90px;

    &-title {
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 30px;
    }

    &-links {
      display: flex;
      flex-direction: column;
      grid-gap: 30px;
    }

    &-link {
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;

      transition: all .3s ease-in-out;

      &::before {
        content: ' ∙ ';
      }

      &:hover,
      &.router-link-active  {
        color: var(--accent-color);
      }
    }

    &-donatBtn {
      display: flex;
      align-items: center;
      grid-gap: 10px;

      & svg {
        height: 24px;
        width: 24px;
      }
    }
  }

  &-bottom-btns {
    display: none;
  }

  &-bottom {
    display: flex;
    align-items: center;
    grid-gap: 4px;


    &-copyright,
    &-siteRightBtn {
      font-size: 18px;
    }
  }

  // Adaptation
  @media (max-width: 1370px) {
    &-main {
      grid-template-columns: 400px 1fr;
      grid-gap: 100px;
    }

    &-mainForm {
      &-btns {
        flex-direction: column;
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 70px 0 40px;
    margin-top: 60px;

    &-main {
      grid-template-columns: 330px 1fr;
      grid-gap: 80px;
      margin-bottom: 65px;
    }

    &-mainForm {
      &-title {
        font-size: 32px;
        margin-bottom: 32px;
      }

      &-logo {
        width: 300px;
        margin-bottom: 45px;
      }

      &-content {
        margin-bottom: 50px;
      }

      &-btns {
        grid-gap: 20px;
      }
    }

    &-mainNavs {
      grid-gap: 70px;

      &-title {
        font-size: 24px;
        margin-bottom: 30px;
      }

      &-links {
        grid-gap: 24px;
      }

      &-link {
        font-size: 16px;
      }

      &-donatBtn {
        grid-gap: 10px;

        & svg {
          height: 24px;
          width: 24px;
        }
      }
    }

    &-bottom {
      grid-gap: 4px;

      &-copyright,
      &-siteRightBtn {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    padding: 60px 0 36px;
    margin-top: 60px;

    &-main {
      grid-template-columns: 1fr;
      grid-gap: 50px;
      margin-bottom: 65px;
    }

    &-mainForm {
      &-title {
        font-size: 30px;
        margin-bottom: 28px;
      }

      &-logo {
        width: 300px;
        margin-bottom: 0px;
      }

      &-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 0px;
      }

      &-btns {
        display: none;
      }
    }

    &-mainNavs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0px;

      &-title {
        font-size: 20px;
        margin-bottom: 30px;
      }

      &-links {
        grid-gap: 20px;
      }

      &-link {
        font-size: 16px;
      }

      &-donatBtn {
        grid-gap: 9px;

        & svg {
          height: 20px;
          width: 20px;
        }
      }
    }

    &-bottom-btns {
      display: flex;
      grid-gap: 20px;
    }

    &-bottom {
      grid-gap: 4px;

      &-copyright,
      &-siteRightBtn {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 50px 0 24px;
    margin-top: 50px;

    &-main {
      grid-gap: 50px;
      margin-bottom: 50px;
    }

    &-mainForm {
      &-title {
        font-size: 28px;
        margin-bottom: 28px;
      }

      &-content {
        grid-gap: 20px;
      }

      &-logo {
        width: 260px;
      }
    }

    &-mainNavs {
      grid-gap: 20px;

      &-title {
        font-size: 20px;
        margin-bottom: 26px;
      }

      &-links {
        grid-gap: 18px;
      }

      &-link {
        font-size: 16px;
      }

      &-donatBtn {
        grid-gap: 8px;

        & svg {
          height: 18px;
          width: 18px;
        }
      }
    }

    &-bottom-btns {
      display: flex;
      grid-gap: 18px;
    }
  }

  @media (max-width: 576px) {
    padding: 50px 0 24px;
    margin-top: 50px;

    &-main {
      grid-gap: 50px;
      margin-bottom: 50px;
    }

    &-mainForm {
      &-title {
        font-size: 24px;
        margin-bottom: 22px;
      }

      &-content {
        display: flex;
        flex-direction: column;
        grid-gap: 20px;

        margin-bottom: 30px;
      }

      &-logo {
        width: 260px;
      }

      &-btns {
        display: flex;
      }
    }

    &-mainNavs {
      display: flex;
      flex-direction: column;
      grid-gap: 45px;
    }

    &-bottom-btns {
      display: none;
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &-copyright,
      &-siteRightBtn {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>