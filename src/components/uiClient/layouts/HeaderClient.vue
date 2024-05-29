<template>
  <header class="header headerClient">
    <div class="header-main" id="header-main">
      <div class="wrapper">
        <div class="header-main-inner">
          <div class="header-main-left">
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
          </div>

          <div class="header-main-right">
            <LangToggle />

            <ProfileControl mini />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import ProfileControl from '@/components/common/ProfileControl.vue';

  interface IProps {
    modelValue: any
  }
  interface Emits {
    (event: 'update:modelValue', value: any): void
  }

  const props = defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const showSideBar = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const onShowSideBar = () => showSideBar.value = !showSideBar.value;
</script>

<style lang="scss">
.header {
  background-color: var(--accent-color-op05);
  
  &.sticky {
    & .header-main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
    }
  }
  
  & .wrapper {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  &-main {
    padding: 12px 0;
    background: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow .2s ease-in-out;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 55px;
    }

    &-left {
      display: flex;
      align-items: center;
      grid-gap: 18px;
    }

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 55px;
    }

    &-burger {
      height: 40px;
      width: 40px;

      fill: var(--accent-color);
      transition: all .3s ease-in-out;
    }

    &-logo {
      position: relative;
      bottom: -2px;

      & .logo-mini {
        display: none !important;
      }

      & svg {
        height: 40px;
        width: 216px;
      }
    }

    // Adaptation
    @media (max-width: 992px) {
      padding: 10px 0;

      &-inner {
        grid-gap: 20px;
      }

      &-left {
        grid-gap: 16px;
      }

      &-right {
        grid-gap: 40px;
      }

      &-burger {
        height: 30px;
        width: 30px;
      }

      &-logo svg {
        height: 30px;
        width: 162px;
      }
    }

    @media (max-width: 576px) {
      padding: 10px 0;

      &-inner {
        grid-gap: 20px;
      }

      &-left {
        grid-gap: 16px;
      }

      &-right {
        grid-gap: 40px;
      }

      &-burger {
        height: 30px;
        width: 30px;
      }

      &-logo {
        bottom: 0;

        & .logo {
          &-big {
            display: none !important;
          }
          
          &-mini {
            display: block !important;
            width: 40px;
            height: 40px;

            fill: var(--accent-color);
          }
        }
      }
    }

    @media (max-width: 380px) {
    }
  }
}
</style>