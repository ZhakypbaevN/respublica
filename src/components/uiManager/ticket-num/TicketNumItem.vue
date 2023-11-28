<template>
  <button
    class="ticketNumItem"
    @click="() => {}"
  >
    <div class="ticketNumItem-symbol">
      {{ data.ticket_number.charAt(0) }}
    </div>
    <h3 class="ticketNumItem-title">
      {{ data.ticket_number }}
    </h3>

    <Button
      class="ticketNumItem-btn"
      type="default-light-grey"
      @click.stop="() => showDeleteModal = true"
    >
      <SvgIcon
        name="trash-edit-with-bg"
        :viewboxWidth="50"
        :viewboxHeight="50"
      />
    </Button>

    <DeleteModal
      @click.stop
      :show="showDeleteModal"
      :id="data.id"
      @hide="() => showDeleteModal = false"
      @finish="() => onDelete()"
    />
  </button>
</template>

<script setup lang="ts">
import DeleteModal from '@/components/uiManager/ticket-num/DeleteModal.vue'

import { ref } from 'vue';

interface IProps {
  data: any,
  onDelete: Function
}

defineProps<IProps>()

const showDeleteModal = ref(false);

</script>

<style scoped lang="scss">
.ticketNumItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 50px;
  padding: 20px;
  padding-left: 50px;

  border-radius: 10px;
  border: 1px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-op05);

    & .ticketNumItem-title {
      color: var(--accent-color);
    }
  }

  &-symbol {
    position: absolute;
    left: -8px;
    bottom: -45px;

    color: var(--light-gray-color-op10);
    font-size: 110px;
    font-weight: 900;
  }
  
  &-title {
    font-size: 24px;
    font-weight: 700;

    margin-bottom: 0px;

    transition: all .3s ease-in-out;
  }

  &-btn {
    height: 50px;
    width: 50px;
    padding: 0px !important;
    
    & svg {
      height: 50px;
      width: 50px;
      stroke: var(--light-gray-color);

      transition: all .3s ease-in-out;
    }

    &:hover {
      background-color: var(--red-color-op10) !important;

      & svg {
        stroke: var(--red-color);
      }
    }
  }
}
</style>