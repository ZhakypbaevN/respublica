<template>
  <div>
    <Modal
      big
      v-if="show"
      @hide="$emit('hide')"
      class="selectTicketNumModal"
      :title="$t('page.vip-rooms')"
      :maxInner="1400"
    >
      <div class="ticketNum">
        <div class="ticketNum-header">
          <Input
            :placeholder="$t('formdata.search-by-name')"
            v-model="searchFilter.ticket_number_query"
            staticPlaceholder
          />
          <Button
            class="ticketNum-header-addticketNumBtn"
            type="default-blue"
            @click="onShowCreateModal"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </div>

        <div class="landing-items" v-if="ticketNumValues.isEmpty">
          <Empty />
        </div>
        <div class="landing-items disabled" v-else-if="!ticketNumValues.tableValues">
          <TicketNumItemSkeleton v-for="item in 5" :key="item" withoutDelete />
        </div>
        <div class="landing-items" v-else>
          <TicketNumItem
            v-for="(data, index) of ticketNumValues.tableValues"
            :key="data.ticket_number"
            :data="data"
            withoutDelete
            @click="() => onSelectTicketNum(data)"
            @delete="null"
          />
        </div>

        <Pagination
          v-model:offset="searchFilter.offset"
          v-model:limit="searchFilter.limit"
          :total="ticketNumValues.total"
        />
      </div>
      
      <CreateTicketNumModal
        :show="showModal"
        @hide="() => showModal = false"
        @finish="onPushNewTicketNum"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import CreateTicketNumModal from '@/components/uiManager/ticket-num/CreateTicketNumModal.vue';
  import TicketNumItem from '@/components/uiManager/ticket-num/TicketNumItem.vue';
  import TicketNumItemSkeleton from '@/components/uiManager/ticket-num/TicketNumItemSkeleton.vue';

  import { onMounted, reactive, watch, ref } from 'vue';

  import debounce from '@/helpers/debounce';
  import { ITicketNumbersValues } from '@/types/ticket-number'
  import { getTicketNumbersList } from '@/actions/uiManager/ticket-numbers';

  interface IProps {
    show: boolean,
  }
  interface Emits {
    (event: 'hide'): Function,
    (event: 'select', value: any): void
  }

  defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const searchFilter = ref({
    offset: 0,
    limit: 20,
    ticket_number_query: ''
  })

  const showModal = ref(false);
  const ticketNumValues = reactive<ITicketNumbersValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const onShowCreateModal = () => {
    showModal.value = true;
  }

  const onSelectTicketNum = (ticketNum) => {
    emit('select', ticketNum);
    emit('hide')
  }

  const getData = async () => {
    ticketNumValues.tableValues = null;
    ticketNumValues.isEmpty = false
    const {
      data,
      total
    } = await getTicketNumbersList(searchFilter.value)
    ticketNumValues.tableValues = data;
    ticketNumValues.total = total;
    if (!total) {
      ticketNumValues.tableValues = [];
      ticketNumValues.isEmpty = true
    }
  }

  onMounted(() => getData())
  watch(() => searchFilter.value, debounce(getData), { deep: true })

  const onPushNewTicketNum = (newTicketNum) => {
    ticketNumValues.tableValues.push(newTicketNum);
  }
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 50px;

  &-main {
    background-color: var(--accent-color-op05);
    padding: 40px 0;
  }
}

.ticketNum {
  &-header {
    max-width: 1160px;

    display: grid;grid-template-columns: 1fr 60px;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-addticketNumBtn {
      width: 60px;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px !important;

      & svg {
        height: 40px;
        width: 40px;

        fill: white;
      }
    }
  }
  &-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>

<style>
.selectTicketNumModal .modal-form {
  background-color: var(--accent-color-op05) !important;
}
</style>
