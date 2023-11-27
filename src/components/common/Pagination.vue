<template>
  <div class="footer" v-if="total">
    <span class="count">{{ visibleCount }} из {{ total }}</span>
    <div class="pagination" v-if="pagesCount > 1">
      <button
        @click="paginate({ page: currentPage - 1 })"
        v-if="currentPage !== 1"
      >
        <SvgIcon
          name="pagination-chevron-left"
          :viewboxHeight="18"
          :viewboxWidth="11"
          :width="11"
          :height="18"
          fill="#161931"
        />
      </button>
      <button
        v-for="page in pagesCount"
        :key="page"
        @click="paginate({ page })"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button
        @click="paginate({ page: currentPage + 1 })"
        v-if="currentPage !== pagesCount"
      >
        <SvgIcon
          name="pagination-chevron-right"
          :viewboxHeight="18"
          :viewboxWidth="11"
          :width="11"
          :height="18"
          fill="#161931"
        />
      </button>
    </div>
    <div
      :data-tooltip="$t('button.choose_how_many_items_will_be_per_page')"
      data-tooltip-location="left"
    >
      <select
        name="per_page"
        id="per_page"
        @change="paginate({ perPage: Number(($event.target as HTMLInputElement).value) })"
        :value="currentPerPage"
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
  page?: number
  perPage?: number
  withRouter: boolean
}
type PaginateProps = { page?: number; perPage?: number }

interface IEmits {
  (event: 'paginate', props: PaginateProps): void
}

const props = withDefaults(defineProps<IProps>(), {
  total: 0,
  page: 1,
  perPage: 20,
  withRouter: false
})

const emit = defineEmits<IEmits>()

const route = useRoute()
const router = useRouter()

const currentPerPage = computed(() =>
  Number(route.query.per_page ?? props.perPage)
)

const currentPage = computed(() => Number(route.query.page ?? props.page))

const pagesCount = computed(() => Math.ceil(props.total / currentPerPage.value))

const visibleCount = computed(() => {
  const { total, perPage } = props

  if (total < perPage) return total

  const totalPerPage = currentPage.value * currentPerPage.value

  if (totalPerPage > total) return total

  return totalPerPage
})

const paginate = ({ page, perPage }: PaginateProps) => {
  emit('paginate', { page, perPage })
  if (props.withRouter) {
    router.push({
      query: {
        ...route.query,
        page,
        per_page: perPage
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
