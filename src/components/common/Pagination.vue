<template>
  <div class="footer" v-if="total">
    <span class="count">{{ visibleCount }} из {{ total }}</span>
    <div class="pagination" v-if="pagesCount > 1">
      <button
        class="pagination-arrowBtn"
        @click="paginate({ offset: currentOffset - currentLimit, limit: currentLimit })"
        v-if="currentOffset !== 0"
      >
        &lt;
      </button>

      <div class="pagination-list">
        <div v-for="page in visiblePages" :key="page">
          <button
            @click="page === '...' ? null : paginate({ offset: currentLimit * (page - 1), limit: currentLimit })"
            :class="{ active: currentPage === page, disabled: page === '...' }"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <button
        class="pagination-arrowBtn"
        @click="paginate({ offset: currentOffset + currentLimit, limit: currentLimit })"
        v-if="currentPage !== pagesCount"
      >
        &gt;
      </button>
    </div>
    <div
      :data-tooltip="$t('button.choose_how_many_items_will_be_per_page')"
      data-tooltip-location="left"
    >
      <select
        name="per_page"
        id="per_page"
        @change="paginate({ offset: currentOffset, limit: Number(($event.target as HTMLInputElement).value) })"
        :value="currentLimit"
      >
        <option :value="20">20</option>
        <option :value="40">40</option>
        <option :value="80">80</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface IProps {
  total: number
  offset?: number
  limit?: number
  withRouter?: boolean
}
type PaginateProps = { offset?: number; limit?: number }

interface IEmits {
  (event: 'update:offset', value: number): void,
  (event: 'update:limit', value: number): void,
}

const props = withDefaults(defineProps<IProps>(), {
  total: 0,
  offset: 0,
  limit: 20,
  withRouter: false
})

const emit = defineEmits<IEmits>()

const route = useRoute()
const router = useRouter()

const currentLimit = computed(() => Number(props.withRouter ? route.query.limit : props.limit))
const currentOffset = computed(() => Number(props.withRouter ? route.query.offset : props.offset))
const currentPage = computed(() => (currentOffset.value + currentLimit.value) / currentLimit.value);
const pagesCount = computed(() => Math.ceil(props.total / currentLimit.value))

const visibleCount = computed(() => {
  const { total, limit } = props

  if (total < limit) return total

  return currentOffset.value + currentLimit.value
})

const visiblePages = computed(() => {
  const dotsLimit = 4;

  const pages = [];
  for (let i = 1; i <= pagesCount.value; i++) {
    if (currentPage.value > i - dotsLimit && currentPage.value < i + dotsLimit) pages.push(i);
  }

  if (currentPage.value > dotsLimit + 1) {
    pages.unshift("...");
    if (currentPage.value >= 5) pages.unshift(1);
  }

  if (currentPage.value < pagesCount.value - dotsLimit) {
    pages.push("...");
    if (currentPage.value <= pagesCount.value - 5) pages.push(pagesCount.value);
  }

  return pages;
})

const paginate = ({ offset, limit }: PaginateProps) => {
  emit('update:offset', offset)
  emit('update:limit', limit)

  if (props.withRouter) {
    router.push({
      query: {
        ...route.query,
        offset: offset,
        limit: limit
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 25px;

  &-list {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
button {
  border: 1px solid rgba(22, 25, 49, 0.3);
  border-radius: 3px;
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  transition: all 0.3s ease;
}
button:hover {
  border: 1px solid var(--accent-color);
}
button.active {
  border: none;
  background-color: var(--accent-color);
  color: #fff;
}
select {
  padding: 10px 15px;
  font-size: 16px;
}
</style>
