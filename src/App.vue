<template>
  <ProgressBar />
  <Toast />
  <router-view />
</template>

<script setup>
  import Toast from '@/components/common/Toast.vue'
  import ProgressBar from '@/components/common/ProgressBar.vue'
</script>