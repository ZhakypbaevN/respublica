<template>
  <div>
    <header class="header" :class="{ sticky: isSticky, logoBig: withoutNavs || headerClingingToTop, defaultFixedLight: defaultFixed && headerClingingToTop, dark: dark }" :style="{paddingBottom: withoutPaddingBottom ? '0px' : paddingBottom}">
      <div class="header-main" id="header-main">
        <div class="wrapper">
          <div class="header-main-inner">
            <Router-link to="/" class="header-main-logo">
              <SvgIcon
                v-if="defaultFixed && headerClingingToTop && !dark"
                class="logo-big"
                name="logo-light"
                :viewboxWidth="329"
                :viewboxHeight="62"
              />

              <SvgIcon
                v-else
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

            <nav class="header-main-navs" v-if="!withoutNavs">
              <Router-link
                class="header-main-navs-item"
                v-for="nav of navsList"
                :key="nav.link"
                :to="nav.link"
              >
                {{ nav.title }}
              </Router-link>
            </nav>
          
            <div class="header-main-right" v-if="!withoutNavs">
              <LangToggle
                class="header-main-lang"
                :light="defaultFixed && headerClingingToTop && !dark"
              />
              
              <!-- <button class="header-main-search">
                <SvgIcon
                  name="search"
                  :viewboxWidth="30"
                  :viewboxHeight="30"
                />
              </button> -->
              
              <RouterLink
                v-if="!userType"
                to="/auth"
              >
                <Button
                  :name="$t('page.authorization')"
                  :type="defaultFixed && headerClingingToTop && !dark ? 'outline-light' : 'outline-default'"
                />
              </RouterLink>

              <Avatar v-else />

              <button
                class="header-main-burger"
                @click="() => showSideBar = true"
              >
                <SvgIcon
                  name="map-control-list"
                  :viewboxHeight="32"
                  :viewboxWidth="32"
                />
              </button>
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
    <div class="headerSidebar" :class="{show: showSideBar}">
      <div class="headerSidebar-header">
        <h3 class="headerSidebar-header-title">{{ $t('button.menu') }}</h3>
        <button
          class="headerSidebar-header-exitBtn"
          @click="() => showSideBar = false"
        >
          <SvgIcon
            name="x"
            class="headerSidebar-header-exitBtn-icon"
            :viewboxHeight="14"
            :viewboxWidth="14"
          />
        </button>
      </div>
      
      <div class="headerSidebar-content">
        <nav class="headerSidebar-content-navs">
          <Router-link
            class="headerSidebar-content-navs-item"
            v-for="nav of navsList"
            :key="nav.link"
            :to="nav.link"
          >
            {{ nav.title }}
          </Router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Avatar from '@/components/common/Avatar.vue';

  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router'

  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  interface IProps {
    dark?: boolean,
    withoutNavs?: boolean,
    defaultFixed?: boolean,
    withoutPaddingBottom?: boolean
  }

  withDefaults(defineProps<IProps>(), {
    withoutNavs: false,
    withoutPaddingBottom: false,
    defaultFixed: false,
  })

  const router = useRouter()
  const userType = localStorage.getItem('USER_TYPE');

  const back = () => {
    router.go(-1)
  }

  const isSticky = ref(false);
  const headerOffsetTop = ref(0);
  const headerClingingToTop = ref(true)
  const paddingBottom = ref('0px');
  const showSideBar = ref(false)

  const navsList = [
    {
      link: '/about-party',
      title: t('page.about-party')
    },
    {
      link: '/party-fraction',
      title: t('page.party-faction')
    },
    {
      link: '/regions',
      title: t('page.regions')
    },
    {
      link: '/news',
      title: t('page.press-center')
    },
    {
      link: '/contacts',
      title: t('page.contacts')
    }
  ]

  const handleScroll = () => {
    const headerMain = document.querySelector('#header-main');
    const sideBar = document.querySelector('#sideBar');

    headerClingingToTop.value = window.pageYOffset === 0;
    if (window.pageYOffset >= headerOffsetTop.value) {
      isSticky.value = true;
      if (headerMain) paddingBottom.value = headerMain!.offsetHeight + 'px';
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
    
    if (headerMain) headerOffsetTop.value = headerMain!.offsetTop;
    document.body.style ='height:auto;overflow:auto;';
    handleScroll();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped lang="scss">
.header {
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

  &.defaultFixedLight {
    & .header-main {
      background: transparent;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

      &-navs-item {
        color: white;
      }

      &-search svg {
        stroke: white !important;
      }
    }
  }

  &.defaultFixedLight.dark {
    & .header-main {
      background: transparent;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

      &-navs-item {
        color: var(--primary-color);
      }

      &-search svg {
        stroke: var(--primary-color) !important;
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

  &-main {
    padding: 8px 0;
    background: white;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transition: box-shadow .2s ease-in-out, background .3s ease-in-out;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 55px;

      &-right {
        display: flex;
        align-items: center;
        grid-gap: 30px;
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
      grid-gap: 44px;

      &-item {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
        transition: all .3s ease-in-out;

        position: relative;

        &::after {
          content: '';

          position: absolute;
          top: 63px;
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
      grid-gap: 30px;
    }

    &-search {
      display: block;
      height: 30px;
      width: 30px;

      & svg {
        height: 100%;
        width: 100%;

        stroke: var(--primary-color);
        transition: all .3s ease-in-out;
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

    &-burger {
      display: none;

      height: 40px;
      width: 40px;

      fill: var(--accent-color);
    }
  }

  // Adaptation
  /* @media (max-width: 1450px) {
    &.sticky .header-main-logo {
      width: 80px;
    }

    &.logoBig .header-main-logo {
      width: 228px !important;
    }
    
    &-main {
      &-logo {
        height: 80px;
        width: 228px;
        & svg.logo-big {
          height: 80px;
          width: 228px;
        }

        & svg.logo-mini {
          height: 80px;
          width: 80px;
        }
      }

      &-right {
        grid-gap: 20px;
      }
      
      &-navs,
      &-lang,
      &-search {
        display: none;
      }

      &-burger {
        display: block;
      }
    }
  }

  @media (max-width: 1200px) {
    &.sticky .header-main-logo {
      width: 60px;
    }

    &.logoBig .header-main-logo {
      width: 200px !important;
    }
    
    &-main {
      &-logo {
        height: 60px;
        width: 200px;
        & svg.logo-big {
          height: 60px;
          width: 200px;
        }

        & svg.logo-mini {
          height: 60px;
          width: 60px;
        }
      }

      &-burger {
        height: 38px;
        width: 38px;
      }
    }
  }

  @media (max-width: 992px) {
    
  }

  @media (max-width: 768px) {
    &.sticky .header-main-logo {
      width: 50px;
    }

    &.logoBig .header-main-logo {
      width: 180px !important;
    }
    
    &-main {
      &-logo {
        height: 50px;
        width: 180px;
        & svg.logo-big {
          height: 50px;
          width: 180px;
        }

        & svg.logo-mini {
          height: 50px;
          width: 50px;
        }
      }

      &-burger {
        height: 38px;
        width: 38px;
      }
    }
  }

  @media (max-width: 576px) {
    & svg.logo-big {
      display: none !important;
    }
    
    &.sticky .header-main-logo {
      width: 48px;
    }

    &.logoBig .header-main {
      &-logo {
        width: 48px !important;
        border-radius: 50% !important;
      }

      & svg.logo-mini {
        opacity: 1 !important;
      }
    }
    
    &-main {
      &-logo {
        height: 48px;
        width: 48px;
        & svg.logo-big {
          display: none;
        }

        & svg.logo-mini {
          height: 48px;
          width: 48px;
        }
      }

      &-burger {
        height: 38px;
        width: 38px;
      }
    }
  } */
}

.headerSidebar {
  width: 280px;
  height: 100vh;

  position: fixed;
  right: -300px;
  top: 0;
  z-index: 200;
  overflow-y: auto;

  padding: 20px;

  background-color: white;
  box-shadow: 0 4px 20px rgba(160,174,192,.25);

  transition: all .3s ease-in-out;

  &.show {
    right: 0;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;

    &-title {
      font-size: 22px;
      font-weight: 600;
    }

    &-exitBtn {
      &-icon {
        width: 18px;
        height: 18px;
      }
    }
  }

  &-content {
    &-navs {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;

      &-item {
        color: var(--primary-color);
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
        transition: all .3s ease-in-out;

        position: relative;

        &::after {
          content: '';

          position: absolute;
          top: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%);

          display: block;
          width: 0px;
          height: 3px;

          background-color: var(--accent-color);
          transition: all .3s ease-in-out;
        }

        &:hover,
        &.router-link-active {
          color: var(--accent-color);

          &::after {
            width: 100%;
          }
        }
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