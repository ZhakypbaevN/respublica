<template>
  <div class="footer" v-if="total">
    <span class="count">{{ visibleCount }} из {{ total }}</span>
    <div class="pagination" v-if="pagesCount > 1">
      <button
        @click="paginate({ offset: currentOffset - currentLimit, limit: currentLimit })"
        v-if="currentOffset !== 0"
      >
        
        <!-- <SvgIcon
          name="pagination-chevron-left"
          :viewboxHeight="18"
          :viewboxWidth="11"
          :width="11"
          :height="18"
          fill="#161931"
        /> -->
        &lt;
      </button>
      <button
        v-for="page in pagesCount"
        :key="page"
        @click="paginate({ offset: currentLimit * (page - 1), limit: currentLimit })"
        :class="{ active: currentLimit * (page - 1) === currentOffset }"
      >
        {{ page }}
      </button>
      <button
        @click="paginate({ offset: currentOffset + currentLimit, limit: currentLimit })"
        v-if="currentOffset !== currentLimit - currentOffset"
      >
        <!-- <SvgIcon
          name="pagination-chevron-right"
          :viewboxHeight="18"
          :viewboxWidth="11"
          :width="11"
          :height="18"
          fill="#161931"
        /> -->
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
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="80">80</option>
        <option :value="total">{{ $t('button.all') }}</option>
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
  Limit?: number
  withRouter: boolean
}
type PaginateProps = { offset?: number; limit?: number }

interface IEmits {
  (event: 'paginate', props: PaginateProps): void
}

const props = withDefaults(defineProps<IProps>(), {
  total: 0,
  offset: 1,
  limit: 20,
  withRouter: false
})

const emit = defineEmits<IEmits>()

const route = useRoute()
const router = useRouter()

const currentLimit = computed(() =>
  Number(route.query.limit ?? props.limit)
)

const currentOffset = computed(() => Number(route.query.offset ?? props.offset))

const pagesCount = computed(() => Math.ceil(props.total / currentLimit.value))

const visibleCount = computed(() => {
  const { total, limit } = props

  if (total < limit) return total

  const totalLimit = currentOffset.value * currentLimit.value

  if (totalLimit > total) return total

  return totalLimit
})

const paginate = ({ offset, limit }: PaginateProps) => {
  emit('paginate', { offset, limit })
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

<style scoped>
.footer {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: 500px;
  overflow: overlay;
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
