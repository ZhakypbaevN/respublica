<template>
  <div class="wrapper-main">
    <div>
      <Header />
  
      <div class="content">
        <div class="wrapper-menu">
          <div class="left-menu" id="sideBar">
            <div class="left-menu-list">
              <ul>
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
        </div>
        
        <div>
          <slot />
        </div>
      </div>
    </div>
  
    <Footer />
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

.content {
  display: flex;
}

.wrapper-menu {
  width: 325px;
  background: #041a3f;
}

.left-menu {
  top: 70px;
  position: sticky;
  padding-top: 50px;
  transition: all .3s ease-in-out;
  overflow-y: auto;

  &.fixed {
    padding-top: 90px;
  }

  &-list {
    margin-left: 47px;

    & ul li {
      color: #FFF;
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 41px;
      word-wrap: break-word;
      width: 210px;
      cursor: pointer;
    }
  }
}
</style>
  