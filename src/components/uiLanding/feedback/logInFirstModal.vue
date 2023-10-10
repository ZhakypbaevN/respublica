<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="logInFirst"
    :title="title"
    big
  >
    <div class="logInFirst-btns">
      <RouterLink to="/auth?login">
        <Button
          name="Войти"
          type="default-blue"
        />
      </RouterLink>

      <RouterLink to="/auth?register">
        <Button
          name="Регистрация"
          type="default-blue"
        />
      </RouterLink>

      <Button
        name="Отмена"
        type="default-grey"
        @click="() => emits('hide')"
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

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.logInFirst {
  &-btns {
    display: flex;
    justify-content: center;
    grid-gap: 20px;
  }
}

</style>
