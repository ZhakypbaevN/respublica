<template>
  <div>
    <HeaderManager />

    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <!-- <keep-alive> -->
          <component :is="Component" :key="$route.path" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import HeaderManager from './HeaderManager.vue';
</script>

<style scoped>
</style>
