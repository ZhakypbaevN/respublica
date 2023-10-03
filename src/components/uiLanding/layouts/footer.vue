<template>
  <footer class="footer">
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

          <div class="footer-mainForm-snList">
            <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank" class="footer-mainForm-snList-item">
              <SvgIcon
                name="facebook-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
              <SvgIcon
                name="facebook"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
            
            <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank" class="footer-mainForm-snList-item">
              <SvgIcon
                name="instagram-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
              <SvgIcon
                name="instagram"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
            
            <a href="https://t.me/respublica_partiyasy" target="_blank" class="footer-mainForm-snList-item">
              <SvgIcon
                name="telegram-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
              <SvgIcon
                name="telegram"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
            
            <a href="https://www.tiktok.com/@respublica_partiyasy" target="_blank" class="footer-mainForm-snList-item">
              <SvgIcon
                name="tiktok-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
              <SvgIcon
                name="tiktok"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>

            <a href="https://youtube.com/@respublica_partiyasy?si=lu_6apPVAJCFtd0z" target="_blank" class="footer-mainForm-snList-item">
              <SvgIcon
                name="youtube-light"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
              <SvgIcon
                name="youtube"
                :viewboxHeight="44"
                :viewboxWidth="44"
              />
            </a>
          </div>

          <div class="footer-mainForm-btns">
            <Button name="ОБРАТНАЯ СВЯЗЬ" type="default-blue" uppercase />
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
          </div>


        </div>

        <div class="footer-mainNavs">
          <div class="footer-mainNavs-item">
            <h4 class="footer-mainNavs-title">ПАРТИЯ Respublica</h4>
            <div class="footer-mainNavs-links">
              <RouterLink to="/about-party" class="footer-mainNavs-link">О партии</RouterLink>
              <RouterLink to="/party-fraction" class="footer-mainNavs-link">Партийная фракция</RouterLink>
              <RouterLink to="/regions" class="footer-mainNavs-link">Регионы</RouterLink>
              <RouterLink to="/news" class="footer-mainNavs-link">Пресс-центр</RouterLink>
              <RouterLink to="/contacts" class="footer-mainNavs-link">Контакты</RouterLink>
              <RouterLink to="/faq" class="footer-mainNavs-link">FAQ</RouterLink>
            </div>
          </div>

          <div>
            <div class="footer-mainNavs-item team">
              <h4 class="footer-mainNavs-title">КОМАНДА</h4>
              <div class="footer-mainNavs-links">
                <RouterLink to="/" class="footer-mainNavs-link">Депутаты Мажилиса</RouterLink>
                <RouterLink to="/" class="footer-mainNavs-link">Депутаты маслихатов</RouterLink>
                <RouterLink to="/" class="footer-mainNavs-link">Центральный аппарат</RouterLink>
                <RouterLink to="/" class="footer-mainNavs-link">Филиалы</RouterLink>
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
    grid-template-columns: 590px 1fr;
    grid-gap: 180px;
    margin-bottom: 65px;
  }

  &-mainForm {
    &-title {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 44px;
    }

    &-logo {
      display: block;
      width: 330px;
      margin-bottom: 45px;
    }

    &-snList {
      display: flex;
      grid-gap: 20px;
      margin-bottom: 51px;

      &-item {
        display: block;
        height: 44px;
        width: 44px;
        
        position: relative;

        & svg {
          width: 100%;
          height: 100%;
        }

        & svg:first-of-type {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
          
          opacity: 1;
          transition: all .3s ease-in-out;
        }

        &:hover svg:first-of-type {
          opacity: 0;
        }
      }
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