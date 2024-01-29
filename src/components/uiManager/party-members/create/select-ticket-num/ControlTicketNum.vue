<template>
  <div class="controlTicketNum">
    <Button
      class="controlTicketNum-btn"
      :class="{ active: ticketNum }"
      :name="
        ticketNum
          ? `${ticketNum}`
          : $t('button.select-a-user')
      "
      type="outline-grey"
      v-slot:left
      @click="() => $emit('showModalSelect')"
    >
      <div class="controlTicketNum-btn-avatar">
        <SvgIcon
          name="avatar"
          :viewboxWidth="44"
          :viewboxHeight="44"
        />
      </div>
    </Button>

    <Button
      type="default-light-blue"
      class="controlTicketNum-tip"
      @click="() => $emit('showModalSelect')"
    >
      <SvgIcon
        :name="ticketNum  ? 'loop' : 'touch'"
        :viewboxWidth="24"
        :viewboxHeight="24"
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    ticketNum: any
  }
  interface Emits {
    (event: 'showModalSelect'): Function
  }
  
  defineProps<IProps>()
  const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.controlTicketNum {
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;

  margin-bottom: 10px;
  
  &-btn {
    width: 100%;

    display: flex;
    grid-gap: 18px;
    align-items: center;

    padding: 14px 24px;
    margin-bottom: 4px;

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
      }
    }
  }

  &-tip {
    padding: 14px;

    position: absolute;
    top: 10px;
    right: 10px;

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
