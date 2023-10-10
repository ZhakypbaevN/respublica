<template>
  <footer class="footer" :class="{withOutMT: withOutMT}">
    <div class="wrapper landing-wrapper">
      <div class="footer-main">
        <div class="footer-mainForm">
          <h3 class="footer-mainForm-title">Присоединяйтесь к партии</h3>
          <RouterLink to="/" class="footer-mainForm-logo">
            <SvgIcon
              name="logo-light"
              :viewboxWidth="449"
              :viewboxHeight="62"
            />
          </RouterLink>

          <SocialNetworks />

          <div class="footer-mainForm-btns">
            <RouterLink to="/feedback">
              <Button name="ОБРАТНАЯ СВЯЗЬ" type="default-blue" uppercase />
            </RouterLink>
            <RouterLink to="/donations">
              <Button
                name="ДОНАТЫ"
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
            <h4 class="footer-mainNavs-title">ПАРТИЯ Respublica</h4>
            <div class="footer-mainNavs-links">
              <RouterLink to="/about-party" class="footer-mainNavs-link">О партии</RouterLink>
              <RouterLink to="/party-fraction" class="footer-mainNavs-link">Партийная фракция</RouterLink>
              <!-- <RouterLink to="/regions" class="footer-mainNavs-link">Регионы</RouterLink> -->
              <RouterLink to="/news" class="footer-mainNavs-link">Пресс-центр</RouterLink>
              <RouterLink to="/contacts" class="footer-mainNavs-link">Контакты</RouterLink>
              <RouterLink to="/faq" class="footer-mainNavs-link">FAQ</RouterLink>
            </div>
          </div>

          <div>
            <div class="footer-mainNavs-item team">
              <h4 class="footer-mainNavs-title">КОМАНДА</h4>
              <div class="footer-mainNavs-links">
                <RouterLink to="/deputies-of-majilis" class="footer-mainNavs-link">Депутаты Мажилиса</RouterLink>
                <RouterLink to="/deputies-of-maslikhat" class="footer-mainNavs-link">Депутаты маслихатов</RouterLink>
                <!-- <RouterLink to="/0980" class="footer-mainNavs-link">Центральный аппарат</RouterLink> -->
                <RouterLink to="/contacts?filials" class="footer-mainNavs-link">Филиалы</RouterLink>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-bottom-copyright">© 2023 партия RESPUBLICA.</p>
        <button class="footer-bottom-siteRightBtn">Все права защищены.</button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialNetworks from './SocialNetworks.vue';
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
      line-height: .8;
      margin-bottom: 44px;
    }

    &-logo {
      display: block;
      width: 330px;
      margin-bottom: 45px;
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

  &-bottom {
    display: flex;
    align-items: center;
    grid-gap: 4px;


    &-copyright,
    &-siteRightBtn {
      font-size: 18px;
    }
  }
}
</style>