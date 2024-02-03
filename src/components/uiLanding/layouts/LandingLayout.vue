<template>
  <div class="wrapper-main">
    <div>
      <Header withoutWidthMax />
  
      <div class="layout">
        <div class="layout-menu">
          <div class="layout-menu-inner" id="sideBar">
            <ul class="layout-menu-inner-list">
              <a
                v-for="link of list"
                :key="link.title"
                :href="link.link"
              >
                  <li>{{ link.title }}</li>
              </a>
            </ul>
          </div>
        </div>
        
        <div class="layout-content">
          <slot />
        </div>
      </div>
    </div>
  
    <Footer withOutMT withoutWidthMax />
  </div>
</template>
  
<script setup lang="ts">
interface IProps {
  list: Array<any>,
}

withDefaults(defineProps<IProps>(), {})
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}

.layout {
  display: grid;
  grid-template-columns: 325px 1fr;

  &-menu {
    background: var(--primary-color);

    &-inner {
      top: 100px;
      position: sticky;
      padding-top: 30px;
      transition: all .3s ease-in-out;
      overflow-y: auto;

      &.fixed {
        padding-top: 45px;
      }

      &-list {
        display: flex;
        flex-direction: column;
        grid-gap: 40px;

        padding: 20px 30px;

        & li {
          color: #FFF;
          font-size: 18px;
          font-weight: 400;
          word-wrap: break-word;
          cursor: pointer;
        }
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  // Adaptation
  @media (max-width: 1600px) {
    grid-template-columns: 280px 1fr;
  }

  @media (max-width: 1400px) {
    grid-template-columns: 220px 1fr;
  }

  @media (max-width: 992px) {
    display: block;

    grid-template-columns: 1fr;
    &-menu {

      &-inner {
        position: static;
        top: 0px;
        padding: 30px;

        &.fixed {
          padding: 30px;
        }

        &-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          
          grid-gap: 20px;
          padding: 0px;

          & li {
            font-size: 18px;
          }
        }
      }
    }
  }

  @media (max-width: 660px) {
    &-menu {
      &-inner {
        padding: 30px;

        &.fixed {
          padding: 30px;
        }

        &-list {
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 18px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-menu {
      &-inner {
        padding: 30px;

        &.fixed {
          padding: 30px;
        }

        &-list {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>

<style lang="scss">
  .layout-content .wrapper {
    padding: 0 30px !important;

    @media (max-width: 1200px) {
      padding: 0 20px !important;
    }

    @media (max-width: 576px) {
      padding: 0 14px !important;
    }
  }
</style>
