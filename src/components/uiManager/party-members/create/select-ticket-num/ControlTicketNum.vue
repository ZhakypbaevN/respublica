<template>
  <div class="controlTicketNum">
    <Button
      class="controlTicketNum-btn"
      :class="{ active: num }"
      :name="
        num
          ? `${num}`
          : $t('button.select-number-of-party-card')
      "
      type="outline-grey"
      v-slot:left
      @click="() => $emit('showModalSelect')"
    >
      <div class="controlTicketNum-btn-avatar">
        <SvgIcon
          name="ticket-num"
          :viewboxWidth="24"
          :viewboxHeight="24"
        />
      </div>
    </Button>

    <Button
      type="default-light-blue"
      class="controlTicketNum-tip"
      @click="
        () => num && num != defaultNum
          ? $emit('toDefault')
          : $emit('showModalSelect')
      "
    >
      <SvgIcon
        :name="num && num != defaultNum ? 'loop' : 'touch'"
        :viewboxWidth="24"
        :viewboxHeight="24"
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { ITicketNumber } from '@/types/ticket-number';

  interface IProps {
    ticketNum?: ITicketNumber,
    num?: string,
    defaultNum?: string
  }
  interface Emits {
    (event: 'showModalSelect'): Function,
    (event: 'toDefault'): Function,
  }
  
  defineProps<IProps>()
  defineEmits<Emits>()
</script>

<style scoped lang="scss">
.controlTicketNum {
  display: flex;
  flex-direction: column;
  align-items: end;

  position: relative;
  z-index: 2;

  margin-bottom: 14px;
  
  &-btn {
    width: 100%;

    display: flex;
    grid-gap: 18px;
    align-items: center;

    padding: 14px 24px;
    margin-bottom: 8px;
  
    position: relative;
    z-index: 2;

    &-avatar {
      height: 45px;
      width: 45px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;
      background-color: var(--accent-color-op15);

      & svg {
        width: 30px;
        height: 30px;

        stroke: var(--accent-color);
        fill: transparent;
      }
    }

    &:hover {
      border-color: var(--accent-color) !important;
      background-color: var(--accent-color-op10) !important;
    }
  }

  &-tip {
    padding: 14px;

    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;

    & svg {
      height: 24px;
      width: 24px;
    }
  }
}

</style>
<style>
.controlTicketNum-btn.active span {
  color: var(--primary-color);
}
</style>
