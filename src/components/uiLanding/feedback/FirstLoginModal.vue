<template>
  <Modal
    v-if="show"
    @hide="$emit('hide')"
    class="logInFirst"
    :title="title"
    big
  >
    <div class="logInFirst-btns">
      <RouterLink to="/auth/login">
        <Button
          :name="$t('button.login')"
          type="default-blue"
        />
      </RouterLink>

      <RouterLink to="/auth/register">
        <Button
          :name="$t('auth.registration')"
          type="default-blue"
        />
      </RouterLink>

      <Button
        class="logInFirst-btns-close"
        :name="$t('button.cancel')"
        type="default-grey"
        @click="() => $emit('hide')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
interface IProps {
  title: string,
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

defineProps<IProps>()
defineEmits<Emits>()
</script>

<style scoped lang="scss">
.logInFirst {
  &-btns {
    display: flex;
    justify-content: center;
    grid-gap: 20px;
  }

  // Adaptation
  @media (max-width: 768px) {
    &-btns-close {
      display: none;
    }
  }

  @media (max-width: 576px) {
    &-btns {
      flex-direction: column;
      align-items: center;
      grid-gap: 18px;

      & a, & button {
        width: 100%;
        max-width: 200px;
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
