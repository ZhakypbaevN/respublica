<template>
  <header class="header">
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
          </Router-link>
         
          <div class="header-main-right">
            <Router-link to="/donations">
              <Button
                name="Создать члена партии"
                type="default-blue"
              />
            </Router-link>

            <button class="header-main-lang">
              <span>РУ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
    }
  }
  
  &-main {
    padding: 6px 0;
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
      & svg {
        height: 95px;
        width: 260px;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 60px;
    }

    &-lang {
      & span {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>