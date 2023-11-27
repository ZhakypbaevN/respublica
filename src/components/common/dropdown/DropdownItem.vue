<template>
  <div  v-if="!mounted">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, useAttrs, useSlots } from 'vue'
import { Dropdown } from './index.vue'

const slots = useSlots()
const attrs = useAttrs()

const mounted = ref(false)

const dropdown = inject<Dropdown>('dropdown')

dropdown.items.push({
  vnodes: slots.default(),
  attrs: attrs
})

onMounted(() => (mounted.value = true))
</script>

<style scoped></style>
