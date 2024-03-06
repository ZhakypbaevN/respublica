<template>
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
          
            <LangToggle
              class="header-main-lang"
              :light="headerClingingToTop"
            />
          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const headerOffsetTop = ref(0);
  const headerClingingToTop = ref(true)
  const paddingBottom = ref('0px');

  const navsList = [
    {
      link: '/hackathon#partners',
      title: t('hackathon.header.general-partners')
    },
    // {
    //   link: '/hackathon#sdcs',
    //   title: t('hackathon.header.evening-speakers')
    // },
    // {
    //   link: '/hackathon#sdcs',
    //   title: t('hackathon.header.jury')
    // },
    {
      link: '/hackathon#program',
      title: t('hackathon.header.program')
    },
    {
      link: '/hackathon#conditions',
      title: t('hackathon.header.hackathon-rules')
    }
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
        height: 36px;
        width: 244px;

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
  }
}
</style>