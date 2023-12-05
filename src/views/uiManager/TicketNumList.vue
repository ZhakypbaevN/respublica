<template>
  <section class="wrapper-main">
    <div class="ticketNum wrapper">

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
      <div class="ticketNum-items">
        <TicketNumItem
          v-for="(data, index) of ticketNumList"
          :key="data"
          :data="data"
          @delete="() => removeItem(index)"
        />
      </div>
    </div>

    <CreateTicketNumModal
      :show="showCreateModal"
      @hide="() => showCreateModal = false"
    />
  </section>
</template>

<script setup lang="ts">
  import TicketNumItem from "@/components/uiManager/ticket-num/TicketNumItem.vue"
  import CreateTicketNumModal from "@/components/uiManager/ticket-num/CreateTicketNumModal.vue";

  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  import { useToast } from '@/modules/toast'

  const { toast } = useToast()

  const isLoading = ref(false)
  const token = localStorage.getItem('access_token');
  const ticketNumList = ref([]);

  const showCreateModal = ref(false);

  const removeItem = ({index}: {index: number}) => {
    ticketNumList.value.splice(index, 1);
  }

  onMounted(() => getPhotos());
  const getPhotos = () => {
    const url = `https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/reserved-ticket-numbers?offset=0&limit=100`;

    axios({
      method: "get",
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log('response', response);

        ticketNumList.value = response.data.data;
        isLoading.value = false;
      })
      .catch((err) => {
        console.log('err', err);

        if (err.response.data.detail === 'Pending resignation request already exists.') {
          toast({
            message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
          })
        } else {
          toast({
            message: 'Возникли ошибки при запросе'
          })
        }
        isLoading.value = false;
      });
  }

</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
    padding: 40px 0;
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