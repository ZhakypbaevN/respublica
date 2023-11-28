<template>
  <div class="analytics-item">
    <div class="analytics-item-header">
      <h4 class="analytics-title">{{ title }}</h4>

      <div v-if="withPeriod" class="periodControls">
        <Button
          name="Весь период"
          class="periodControls-btn"
          :type="!showPeriodFilter ? 'default' : 'default-grey'"
          @click="() => showPeriodFilter = false"
        />
        <Button
          name="Период"
          class="periodControls-btn"
          :type="showPeriodFilter ? 'default' : 'default-grey'"
          @click="() => showPeriodFilter = true"
        />
      </div>
    </div>

    <Transition>
      <div
        v-if="showPeriodFilter"
        v-collapse
      >
        <div class="analytics-filter">
          <Select
            v-if="showRegionsFilter"
            placeholder="Укажите область"
            :options="regionList"
            v-model="regionID"
          />
          <Select
            v-if="showCategoryFilter"
            placeholder="Укажите категорию"
            :options="categoryList"
            v-model="regionID"
          />
          
          <div class="analytics-filter-period">
            <Input
              type="date"
              placeholder="От"
            />
            <Input
              type="date"
              placeholder="До"
            />
          </div>
        </div>
      </div>
    </Transition>

    <slot />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, computed } from 'vue';

// Modules
import { useToast } from '@/modules/toast'

interface IProps {
  title: string,
  modelValue?: any,
  region?: any,
  withPeriod?: false,
  showRegionsFilter?: false,
  showCategoryFilter?: false
}
interface Emits {
  (event: 'update:region', value: any): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<IProps>(), {
  showRegionsFilter: false,
  showCategoryFilter: false,
  withPeriod: false,
})

const regionID = computed({
  get: () => props.region ?? null,
  set: (val) => emit('update:region', val)
})

const showPeriodFilter = ref(false)

const { toast } = useToast()

const regionList = ref([]);
const categoryList = [
  {
    label: 'Пенсионеры',
    value: 'pensioner',
  },
  {
    label: 'Инвалиды',
    value: 'disabled',
  },
  {
    label: 'Безработные',
    value: 'unemployed',
  },
  {
    label: 'Находящиеся в отпуске по уходу за детьми',
    value: 'onChildcareLeave',
  }
]

const getRegions = () => {
  const url = `https://api.respublica.codetau.com/api/v1/parties/locations?offset=0&limit=100`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      response.data.forEach(location => {
        regionList.value.push(
          {
            label: location.name,
            value: location.id.toString()
          }
        );
      });
    })
    .catch((err) => {
      console.log('err', err);

      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

onMounted(() => {
  if (props.showRegionsFilter) getRegions()
})
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
  padding: 40px 0;
}

.analytics {
  &-item {
    padding: 20px 30px;
    border-radius: 10px;
    background: white;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 24px;
    }
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0px !important;
  }

  &-filter {
    padding-bottom: 20px;

    &-period {
      display: grid;
      grid-template-columns: 190px 190px;
      grid-gap: 20px;
    }
  }
}

.periodControls {
  display: flex;
  grid-gap: 14px;

  &-btn {
    padding: 4px 20px;
    border-radius: 3px;
  }
}
</style>
<style >
.periodControls-btn span {
  font-weight: 400 !important;
  font-size: 16px !important;
}
</style>