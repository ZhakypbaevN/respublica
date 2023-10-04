<template>
  <div class="sideBar">
    <div class="sideBar-list">
      <RouterLink
        class="sideBar-link"
        v-for="link of list"
        :key="link.title"
        :to="link.link"
      >
          {{ link.title }}
      </RouterLink>
    </div>
    <slot />
  </div>
</template>
  
<script setup lang="ts">
interface IProps {
  list: Array<any>,
}

withDefaults(defineProps<IProps>(), {})
</script>
  
<style scoped lang="scss">
.sideBar {
  top: 70px;
  padding-top: 50px;
  transition: all .3s ease-in-out;
  overflow-y: auto;
  background: #041a3f;

  &-list {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;

    margin-left: 47px;
  }

  &-link {
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    word-wrap: break-word;
    width: 210px;
    cursor: pointer;
    
    &.router-link-active {
      color: var(--accent-color);
    }
  }
}
</style>
  