<template>
  <div class="filter">
    <button
      class="filter-btn"
      v-for="item of list"
      :key="item.value"
      :class="{active: item.value === active}"
      @click="() => onFilter(item.value)"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

interface IProps {
  list: Array<any>
}

const props = defineProps<IProps>()

const router = useRouter()
const route = useRoute()

const active = ref(props.list[0].value)

const onFilter = (newFilter) => {
  active.value = newFilter;
  router.push({ query: { ...route.query, published: active.value } })
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  grid-gap: 75px;
  padding-bottom: 9px;
  margin-bottom: 20px;

  border-bottom: 1px solid var(--border-light-gray);

  &-btn {
    color: var(--light-gray-color);

    font-size: 18px;
    font-weight: 600;
    transition: all .3s ease-in-out;

    position: relative;

    &::after {
      content: '';

      display: block;
      width: 0;
      height: 3px;

      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);

      background-color: var(--accent-color-op30);
      transition: all .3s ease-in-out;
    }

    &.active::after,
    &:hover::after {
      width: 100%;
    }

    &.active {
      color: var(--primary-color);

      &::after {
        background-color: var(--accent-color);
      }
    }
  }
}
</style>
