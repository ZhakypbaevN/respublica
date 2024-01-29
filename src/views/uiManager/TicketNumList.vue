<template>
  <div class="wrapper-main">
    <section class="ticketNum">
      <div class="wrapper">
        <div class="ticketNum-header">
          <Input
            :placeholder="$t('formdata.search-by-name')"
            staticPlaceholder
          />
          <Button
            class="ticketNum-header-addticketNumBtn"
            type="default-blue"
            @click="() => showCreateModal = true"
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </div>

        <div class="landing-items" v-if="ticketNumValues.isEmpty">
          <Empty />
        </div>
        <div class="landing-items disabled" v-else-if="!ticketNumValues.tableValues">
          <TicketNumItemSkeleton v-for="item in 5" :key="item" />
        </div>
        <div class="landing-items" v-else>
          <TicketNumItem
            v-for="(data, index) of ticketNumValues.tableValues"
            :key="data.ticket_number"
            :data="data"
            @delete="() => removeItem({index: index})"
          />
        </div>
      </div>

      <Pagination :total="ticketNumValues.total" withRouter />
    </section>

    <CreateTicketNumModal
      :show="showCreateModal"
      @hide="() => showCreateModal = false"
      @finish="onPushNewTicketNum"
    />
  </div>
</template>

<script setup lang="ts">
  import CreateTicketNumModal from '@/components/uiManager/ticket-num/CreateTicketNumModal.vue';
  import TicketNumItem from '@/components/uiManager/ticket-num/TicketNumItem.vue';
  import TicketNumItemSkeleton from '@/components/uiManager/ticket-num/TicketNumItemSkeleton.vue';

  import { onMounted, reactive, watch, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'

  import debounce from '@/helpers/debounce'
  import { ITicketNumbersValues } from '@/types/ticket-number'
  import { getTicketNumbersList } from '@/actions/uiManager/ticket-numbers';

  const route = useRoute()
  const router = useRouter()
  const search = ref(null);
  
  const showCreateModal = ref(false);

  const removeItem = ({index}: {index: number}) => {
    ticketNumValues.tableValues.splice(index, 1);
  }

  const ticketNumValues = reactive<ITicketNumbersValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = async () => {
    ticketNumValues.tableValues = null;
    ticketNumValues.isEmpty = false
    const {
      data,
      total
    } = await getTicketNumbersList({
      ...route.query
    })
    ticketNumValues.tableValues = data;
    ticketNumValues.total = total;
    if (!total) {
      ticketNumValues.tableValues = [];
      ticketNumValues.isEmpty = true
    }
  }

  onMounted(() => getData());

  watch(() => route.query, debounce(getData), { deep: true })
  watch(
    () => search.value,
    () => router.push({ query: { ...route.query, search: search.value } })
  )

  onMounted(() => getData());

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