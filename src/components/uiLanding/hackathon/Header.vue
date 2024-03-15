<template>
  <div>
    <header
      class="header"
      :class="{ sticky: !headerClingingToTop }"
      :style="{paddingBottom: paddingBottom}"
    >
      <div class="header-main" id="header-main">
        <div class="wrapper landing-wrapper">

          <div
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <div class="header-main-inner">
              <Router-link to="/hackathon" class="header-main-logo">
                <SvgIcon
                  name="logo-recodetau"
                  :viewboxWidth="244"
                  :viewboxHeight="36"
                />
              </Router-link>

              <nav class="header-main-navs">
                <Router-link
                  class="header-main-navs-item"
                  v-for="nav of navsList"
                  :key="nav.link"
                  :to="nav.link"
                >
                  {{ nav.title }}
                </Router-link>
              </nav>

              <div class="header-main-right">
                <LangToggle
                  class="header-main-lang"
                  :light="headerClingingToTop"
                />

                <button
                  class="header-main-burger"
                  @click="onShowSideBar"
                >
                  <SvgIcon
                    name="map-control-list"
                    :viewboxHeight="32"
                    :viewboxWidth="32"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div
      class="headerSidebar"
      :class="{show: showSideBar}"
      v-click-outside="() => showSideBar = false"
    >
      <div class="headerSidebar-header">
        <h3 class="headerSidebar-header-title">{{ $t('button.menu') }}</h3>

        <div class="headerSidebar-header-right">
          <LangToggle class="headerSidebar-header-right-lang" :light="false" />

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
      </div>
      
      <div class="headerSidebar-content">
        <nav class="headerSidebar-content-navs">
          <Router-link
            class="headerSidebar-content-navs-item"
            v-for="nav of navsList"
            :key="nav.link"
            :to="nav.link"
            @click="() => showSideBar = false"
          >
            {{ nav.title }}
          </Router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const showSideBar = ref(false);
  const headerOffsetTop = ref(0);
  const headerClingingToTop = ref(true)
  const paddingBottom = ref('0px');

  const navsList = [
    {
      link: '/hackathon#conditions',
      title: t('hackathon.header.hackathon-rules')
    },
    {
      link: '/hackathon#program',
      title: t('hackathon.header.program')
    },
    {
      link: '/hackathon#features',
      title: t('hackathon.header.features')
    },
    // {
    //   link: '/hackathon#sdcs',
    //   title: t('hackathon.header.evening-speakers')
    // },
    // {
    //   link: '/hackathon#sdcs',
    //   title: t('hackathon.header.jury')
    // },
  ]

  const handleScroll = () => {
    const headerMain = document.querySelector('#header-main');

    headerClingingToTop.value = window.pageYOffset === 0;
    if (!headerClingingToTop.value) {
      if (headerMain) paddingBottom.value = headerMain!['offsetHeight'] + 'px';
    } else {
      paddingBottom.value = '0px';
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    const headerMain = document.querySelector('#header-main');
    
    if (headerMain) headerOffsetTop.value = headerMain!['offsetTop'];
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    handleScroll();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const onShowSideBar = () => setTimeout(() => {
    showSideBar.value = true;
  }, 10)
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

      background: var(--white-color);
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }

    & .header-main-navs-item {
      color: var(--primary-color);
    }

    & .header-main-logo svg {
      fill: var(--primary-color) !important;
    }

    & .header-main-burger svg {
      fill: var(--primary-color);
    }
  }

  &-main {
    padding: 40px 0;
    background: var(--primary-color);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transition: box-shadow .2s ease-in-out, background .3s ease-in-out;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 50px;
    }

    &-logo {
      height: 36px;
      width: 244px;

      & svg {
        height: 100%;
        width: 100%;

        fill: var(--white-color);
        transition: fill .3s ease-in-out;
      }
    }

    &-navs {
      display: flex;
      align-items: center;
      grid-gap: 48px;

      &-item {
        color: var(--white-color);
        font-size: 16px;
        transition: all .3s ease-in-out;

        position: relative;

        &::after {
          content: '';

          position: absolute;
          top: 64px;
          left: 50%;
          transform: translateX(-50%);

          display: block;
          width: 0px;
          height: 5px;

          background-color: var(--accent-color);
          transition: all .3s ease-in-out;
        }

        &:hover {
          color: var(--accent-color);
          &::after {
            width: 120%;
          }
        }
      }
    }
  
    &-burger {
      display: none;
      height: 38px;
      width: 38px;
  
      fill: var(--white-color);
      transition: all .3s ease-in-out;
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    &-main {
      padding: 30px 0;

      &-inner {
        grid-gap: 50px;
      }

      &-logo {
        height: 34px;
        width: 230px;
      }

      &-navs {
        grid-gap: 48px;

        &-item {
          &::after {
            top: 53px;
            height: 5px;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    &-main {
      padding: 28px 0;

      &-inner {
        grid-gap: 40px;
      }

      &-logo {
        height: 30px;
        width: 204px;
      }

      &-navs {
        grid-gap: 38px;

        &-item {
          &::after {
            top: 53px;
            height: 5px;
          }
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-main {
      padding: 28px 0;

      &-inner {
        grid-gap: 20px;
      }

      &-logo {
        height: 30px;
        width: 204px;
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

  @media (max-width: 768px) {
    &-main {
      padding: 22px 0;
      border-bottom: 1px solid rgba(white, .05);

      &-logo {
        height: 26px;
        width: 176px;
      }

      &-burger {
        width: 34px;
        height: 34px;
      }
    }
  }

  @media (max-width: 576px) {
    &-main {
      padding: 18px 0;

      &-logo {
        height: 22px;
        width: 150px;
      }

      &-burger {
        width: 30px;
        height: 30px;
      }
    }
  }
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

    &-right {
      display: flex;
      grid-gap: 20px;

      &-lang {
        position: relative;
        z-index: 10;
      }
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

        &:hover {
          color: var(--accent-color);

          &::after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>