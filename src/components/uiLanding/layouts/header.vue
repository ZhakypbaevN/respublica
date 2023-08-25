<template>
  <header class="header">
    <div class="wrapper" v-if="!withoutTopAndNavs">
      <div class="header-top">
        <div class="header-top-snList">
          <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank" class="header-top-snList-item">
            <SvgIcon
              name="facebook"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
          
          <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank" class="header-top-snList-item">
            <SvgIcon
              name="instagram"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
          
          <a href="#" class="header-top-snList-item">
            <SvgIcon
              name="whatsapp"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>

          <a href="https://youtube.com/@respublica_partiyasy?si=lu_6apPVAJCFtd0z" target="_blank" class="header-top-snList-item">
            <SvgIcon
              name="youtube"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
        </div>

        <button class="header-top-btnVisuallyImpaired">
          <SvgIcon
            name="eye-slashed"
            :viewboxHeight="24"
            :viewboxWidth="24"
          />
          <span>Версия для слабовидящих</span>
        </button>
      </div>
    </div>
    <div class="header-main">
      <div class="wrapper">
        <div class="header-main-inner">
          <Router-link to="/" class="header-main-logo">
            <SvgIcon
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />
          </Router-link>

          <nav class="header-main-navs" v-if="!withoutTopAndNavs">
            <Router-link to="/" class="header-main-navs-item">
              О партии
            </Router-link>

            <Router-link to="/" class="header-main-navs-item">
              Партийная фракция
            </Router-link>

            <Router-link to="/" class="header-main-navs-item">
              Пресс-центр
            </Router-link>

            <Router-link to="/" class="header-main-navs-item">
              Контакты
            </Router-link>

            <Router-link to="/" class="header-main-navs-item">
              FAQ
            </Router-link>
          </nav>

          <div class="header-main-right">
            <Button
              name="ДОНАТЫ"
              type="outline-red"
              class="header-main-donatBtn"
            >
              <SvgIcon
                name="donat-arrow-red"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>

            <button class="header-main-lang">
              <span>РУ</span>
            </button>

            <button class="header-main-search">
              <SvgIcon
                name="search"
                :viewboxWidth="44"
                :viewboxHeight="44"
              />
            </button>

            <RouterLink to="/feedback">
              <Button
                v-if="withoutTopAndNavs"
                name="Обратная связь"
                type="outline-default"
                class="header-main-callBtn"
                v-slot:left
              >
                <SvgIcon
                  name="call-dark"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
              </Button>
            </RouterLink>

            <RouterLink to="/auth">
              <Button name="Авторизация" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
import Button from '../../../components/common/Button.vue'

defineProps({
  withoutTopAndNavs: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.header {
  background-color: white;

  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 0;

    &-snList {
      display: flex;
      grid-gap: 20px;

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
    &-btnVisuallyImpaired {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      padding: 8px 30px;

      border-radius: 10px;

      & svg {
        height: 24px;
        width: 24px;
      }

      & span {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  &-main {
    padding: 34px 0;
    background: #F6F9FD;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 40px;
    }

    &-logo {
      display: block;
      height: 49;
      width: 260px;

      & svg {
        height: 100%;
        width: 100%;
      }
    }

    &-navs {
      display: flex;
      grid-gap: 60px;

      &-item {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 30px;
    }

    &-donatBtn,
    &-callBtn {
      display: flex;
      align-items: center;
      grid-gap: 10px;

      & svg {
        height: 24px;
        width: 24px;
      }
    }

    &-lang {
      & span {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 700;
      }
    }

    &-search {
      display: block;
      height: 44px;
      width: 44px;

      & svg {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>