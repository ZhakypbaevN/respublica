<template>
  <Modal
    v-if="show"
    @hide="$emit('hide')"
    class="appealMessageModal"
    :maxInner="700"
    :title="subtitle"
  >
    <h2 class="appealMessageModal-title">{{ title }}</h2>
    <div class="appealMessageModal-btns">
      <Button
        :name="$t('button.ok')"
        type="default-blue"
        @click="() => $emit('hide')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  interface IProps {
    show: boolean,
    subtitle?: string,
    title: string
  }
  interface Emits {
    (event: 'hide'): Function
  }

  defineProps<IProps>()
  defineEmits<Emits>()
</script>

<style scoped lang="scss">
  .appealMessageModal {
    &-title {
      color: var(--green-color);
      font-size: 36px;
      font-weight: 700;
      text-align: center;

      margin-bottom: 32px;
    }

    &-btns {
      display: flex;
      justify-content: center;

      & button {
        min-width: 150px;
      }
    }
  }
</style>
<style>
  .appealMessageModal .modal-header {
    margin-bottom: 20px !important;
  }
</style>
