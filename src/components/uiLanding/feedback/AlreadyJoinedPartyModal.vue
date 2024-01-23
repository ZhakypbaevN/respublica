<template>
  <Modal
    v-if="show"
    @hide="$emit('hide')"
    class="alreadyJoinedPartyModal"
    :title="$t('errors.you-have-already-joined-the-parties')"
    big
  >
    <div class="alreadyJoinedPartyModal-btns">
      <Button
        :name="$t('button.cancel')"
        type="default-grey"
        @click="() => $emit('hide')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  interface IProps {
    show: boolean,
  }
  interface Emits {
    (event: 'hide'): Function
  }

  defineProps<IProps>()
  defineEmits<Emits>()
</script>

<style scoped lang="scss">
.alreadyJoinedPartyModal {
  &-btns {
    display: flex;
    justify-content: center;

    & button {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
