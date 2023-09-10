<template>
  <header class="header" :class="{ 'sticky': isSticky }" :style="{paddingBottom: paddingBottom}">
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
    <div class="header-main" id="header-main">
      <div class="wrapper">
        <div class="header-main-inner">
          <Router-link to="/" class="header-main-logo">
            <SvgIcon
              class="logo-big"
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />

            <SvgIcon
              class="logo-mini"
              name="logo-mini"
              :viewboxWidth="96"
              :viewboxHeight="95"
            />
          </Router-link>

          <nav class="header-main-navs" v-if="!withoutTopAndNavs">
            <Router-link to="/about" class="header-main-navs-item">
              О партии
            </Router-link>

            <Router-link to="/party-fraction" class="header-main-navs-item">
              Партийная фракция
            </Router-link>

            <Router-link to="/news" class="header-main-navs-item">
              Пресс-центр
            </Router-link>

            <Router-link to="/contacts" class="header-main-navs-item">
              Контакты
            </Router-link>

            <Router-link to="/faq" class="header-main-navs-item">
              FAQ
            </Router-link>
          </nav>
         
          <div class="header-main-right">
            <Router-link to="/donations">
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
          </Router-link>

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
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  withoutTopAndNavs: {
    type: Boolean,
    default: false
  }
})

const isSticky = ref(false);
const headerOffsetTop = ref(0);
const paddingBottom = ref('0px');

const handleScroll = () => {
  const headerMain = document.querySelector('#header-main');
  console.log('acsdcsd', headerMain!.offsetHeight);
  if (window.pageYOffset >= headerOffsetTop.value) {
    isSticky.value = true;
    paddingBottom.value = headerMain!.offsetHeight + 'px';
  } else {
    isSticky.value = false;
    paddingBottom.value = '0px';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const headerMain = document.querySelector('#header-main');
  headerOffsetTop.value = headerMain!.offsetTop;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});


// document.addEventListener('DOMContentLoaded', function() {
//   var header = document.querySelector('header');
//   var headerHeight = header.offsetHeight;
//   console.log('headerHeight', headerHeight);
//   var headerFake = document.querySelector('#header-fake');
//   headerFake.style.paddingTop = headerHeight + 'px';

//   window.addEventListener('scroll', function() {
//     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     if (scrollTop === 0) {
//       header.classList.remove('fixed');
//       header.classList.add('big');
//     } else {
//       header.classList.add('fixed');
//       header.classList.remove('big');
//     }
//     headerFake.style.paddingTop = header.offsetHeight + 'px';
//   });

//   window.addEventListener('resize', function() {
//     headerHeight = header.offsetHeight;
//     headerFake.style.paddingTop = headerHeight + 'px';
//   });
// });
</script>

<style scoped lang="scss">

.header {
  background-color: #F6F9FD;

  &.sticky {
    & .header-main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;

      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

      & svg.logo-big {
        opacity: 0;
      }

      & svg.logo-mini {
        opacity: 1;
        animation: spin 3s ease 0.2s, zoom 1s ease-in-out 3s;
        transform: rotate(0deg);
      }
    }
  }

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
    padding: 18px 0;
    background: white;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transition: box-shadow .2s ease-in-out;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 40px;
    }

    &-logo {
      display: block;
      height: 95px;
      width: 260px;
      position: relative;

      & svg {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;

        transition: opacity .4s ease-in-out;
      }

      & svg.logo-big {
        height: 95px;
        width: 260px;
        opacity: 1;
      }

      & svg.logo-mini {
        height: 95px;
        width: 95px;

        transition: opacity .2s ease-in-out;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>