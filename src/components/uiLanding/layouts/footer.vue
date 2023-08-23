<template>
  <footer class="footer">
    <div class="wrapper landing-wrapper">
      <div class="footer-main">
        <div class="footer-mainForm">
          <h3 class="footer-mainForm-title">Присоединяйтесь к движению</h3>
          <RouterLink to="/" class="footer-mainForm-logo">
            <SvgIcon
              name="logo-light"
              :viewboxWidth="329"
              :viewboxHeight="62"
            />
          </RouterLink>

          <div class="footer-mainForm-snList">
            <a href="#" class="footer-mainForm-snList-item">
              <SvgIcon
                name="facebook-light"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </a>
            
            <a href="#" class="footer-mainForm-snList-item">
              <SvgIcon
                name="instagram-light"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </a>
            
            <a href="#" class="footer-mainForm-snList-item">
              <SvgIcon
                name="whatsapp-light"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </a>

            <a href="#" class="footer-mainForm-snList-item">
              <SvgIcon
                name="youtube-light"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </a>
          </div>


          <Button name="Заказать обратный звонок" type="default-blue" />
        </div>

        <div class="footer-mainNavs">
          <div class="footer-mainNavs-item">
            <h4 class="footer-mainNavs-title">ПАРТИЯ РЕСПУБЛИКА</h4>
            <div class="footer-mainNavs-links">
              <RouterLink to="/" class="footer-mainNavs-link">О партии</RouterLink>
              <RouterLink to="/" class="footer-mainNavs-link">Партийная фракция</RouterLink>
              <RouterLink to="/" class="footer-mainNavs-link">Пресс-центр</RouterLink>
              <RouterLink to="/" class="footer-mainNavs-link">Контакты</RouterLink>
              <RouterLink to="/" class="footer-mainNavs-link">FAQ</RouterLink>
            </div>
          </div>

          <div>
            <div class="footer-mainNavs-item team">
              <h4 class="footer-mainNavs-title">КОМАНДА</h4>
              <div class="footer-mainNavs-links">
                <RouterLink to="/" class="footer-mainNavs-link">Айдарбек Ходжаназаров</RouterLink>
                <RouterLink to="/" class="footer-mainNavs-link">Ваши депутаты-либералы</RouterLink>
              </div>
            </div>


            <div class="footer-mainNavs-item">
              <h4 class="footer-mainNavs-title">БУДЬТЕ ЧАСТЬЮ ЭТОГО</h4>
              <Button
                name="ДОНАТЫ"
                type="default-red"
                class="footer-mainNavs-donatBtn"
              >
                <SvgIcon
                  name="donat-arrow-white"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </div>
          </div>

        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-bottom-description">
          Продолжая, Вы выражаете согласие на сбор и обработку своих персональных данных не противоречащими законодательству Республики Казахстан способами, как на бумажных носителях, так и в электронном формате, в той мере, насколько это необходимо.
        </p>

        <div class="footer-bottom-right">
          <p class="footer-bottom-copyright">© 2023 партия RESPUBLICA</p>
          <button class="footer-bottom-siteRightBtn">Все права защищены.</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
import Button from '../../../components/common/Button.vue'
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
.footer {
  padding: 80px 0 50px;
  background-color: var(--primary-color);

  & * {
    color: white;
  }

  &-main {
    display: grid;
    grid-template-columns: 560px 1fr;
    grid-gap: 180px;
    margin-bottom: 30px;
  }

  &-mainForm {
    &-title {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    &-logo {
      display: block;
      width: 330px;
      margin-bottom: 32px;
    }

    &-snList {
      display: flex;
      grid-gap: 20px;
      margin-bottom: 30px;

      &-item {
        display: block;
        height: 32px;
        width: 32px;

        & svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &-mainNavs {
    display: flex;
    grid-gap: 90px;

    &-item.team {
      margin-bottom: 90px;
    }

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

      &::before {
        content: ' ∙ ';
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
    align-items: flex-end;
    justify-content: space-between;

    &-description {
      max-width: 596px;
    }

    &-copyright {
      font-size: 18px;
      margin-bottom: 10px;
    }
    &-siteRightBtn {
      font-size: 18px;
    }
  }
}
</style>