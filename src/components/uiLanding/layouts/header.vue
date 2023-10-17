<template>
  <header class="header" :class="{ sticky: isSticky, logoBig: withoutTopAndNavs }" :style="{paddingBottom: paddingBottom}">
    <div class="wrapper" v-if="!withoutTopAndNavs">
      <div class="header-top">
        <SocialNetworks light />

        <div class="header-top-right">
          <!-- <button class="header-top-btnVisuallyImpaired">
            <SvgIcon
              name="eye-slashed"
              :viewboxHeight="24"
              :viewboxWidth="24"
            />
            <span>Версия для слабовидящих</span>
          </button> -->

          <button class="header-main-lang">
            <span>РУ</span>
          </button>
        </div>
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
            <Router-link to="/about-party" class="header-main-navs-item">
              {{ $t('about-party') }}
            </Router-link>

            <Router-link to="/party-fraction" class="header-main-navs-item">
              {{ $t('header-party-faction') }}
            </Router-link>

            <!-- <Router-link to="/regions" class="header-main-navs-item">
              Регионы
            </Router-link> -->

            <Router-link to="/news" class="header-main-navs-item">
              {{ $t('header-press-center') }}
            </Router-link>

            <Router-link to="/contacts" class="header-main-navs-item">
              {{ $t('header-contacts') }}
            </Router-link>

            <Router-link to="/faq" class="header-main-navs-item">
              FAQ
            </Router-link>
            <!-- <button class="header-main-search">
              <SvgIcon
                name="search"
                :viewboxWidth="44"
                :viewboxHeight="44"
              />
            </button> -->
          </nav>
         
          <div class="header-main-right" v-if="!withoutTopAndNavs">
            <Router-link to="/donations">
              <Button
                :name="$t('header-donations')"
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

            <RouterLink
              v-if="!userType"
              to="/auth"
            >
              <Button :name="$t('header-authorization')" />
            </RouterLink>

            <Avatar v-else />
          </div>

          <button
            v-else
            class="header-main-close"
            @click="back"
          >
            <SvgIcon
              name="close"
              :viewboxHeight="37"
              :viewboxWidth="37"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SocialNetworks from './socialNetworks.vue';
import Avatar from '../../../components/common/Avatar.vue';

import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const userType = localStorage.getItem('USER_TYPE');

const back = () => {
  router.go(-1)
}

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
  const sideBar = document.querySelector('#sideBar');

  if (window.pageYOffset >= headerOffsetTop.value) {
    isSticky.value = true;
    paddingBottom.value = headerMain!.offsetHeight + 'px';
    sideBar?.classList.add('fixed');
  } else {
    isSticky.value = false;
    paddingBottom.value = '0px';
    sideBar?.classList.remove('fixed');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const headerMain = document.querySelector('#header-main');

  headerOffsetTop.value = headerMain!.offsetTop;
  document.body.style ='height:auto;overflow:auto;';
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
  background-color: var(--accent-color-op05);

  &.sticky {
    & .header-main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;

      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

      &-logo {
        width: 95px;
        border-radius: 50%;
      }

      & svg.logo-big {
        opacity: 0;
      }

      & svg.logo-mini {
        opacity: 1;

        animation: spinAndZoom 12s infinite;
        
        transform: rotate(0deg);
      }
    }
  }

  &.logoBig .header-main {
    &-logo {
      width: 260px !important;
      border-radius: 0% !important;
    }

    & svg.logo-big {
      opacity: 1 !important;
    }

    & svg.logo-mini {
      opacity: 0 !important;
    }
  }

  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px 0;

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 20px;
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
      grid-gap: 55px;

      &-right {
        display: flex;
        align-items: center;
        grid-gap: 55px;
      }
    }

    &-logo {
      display: block;
      height: 95px;
      width: 260px;
      border-radius: 0%;
      overflow: hidden;

      position: relative;
        
      transition: width .2s ease-in-out;

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
      align-items: center;
      grid-gap: 55px;

      &-item {
        color: var(--primary-color);
        font-size: 20px;
        font-weight: 600;
        text-transform: uppercase;
        transition: all .3s ease-in-out;

        position: relative;

        &::after {
          content: '';

          position: absolute;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);

          display: block;
          width: 0px;
          height: 5px;

          background-color: var(--accent-color);
          transition: all .3s ease-in-out;
        }

        &:hover,
        &.router-link-active {
          color: var(--accent-color);
          &::after {
            width: 120%;
          }
        }
      }
    }

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 20px;
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

    &-close {
      & svg {
        width: 40px;
        height: 40px;
        fill: var(--primary-color);

        transition: all .3s ease-in-out;
      }

      &:hover svg {
        fill: var(--accent-color);
      }
    }
  }
}

@keyframes spinAndZoom {
  0% {
    transform: rotate(0deg) scale(1);
  }
  20% {
    transform: rotate(360deg) scale(1);
  }
  40% {
    transform: scale(1.3);
  }
  45% {
    transform: scale(1);
  }
}
</style>