<template>
  <div>
    <Button
      :name="
        isShowHistory
          ? 'Скрыть подробности'
          : 'Показать все действия по обращению'
      "
      type="outline-grey"
      class="appealHistory-toggleBtn"
      @click="() => isShowHistory = !isShowHistory"
    />

    <Transition>
      <div v-if="isShowHistory">
        <div class="appealHistory-item">
          <h4 class="appealHistory-item-title"><span>Вы</span> создал(а) обращение <span>Текст обращения</span></h4>
          <p class="appealHistory-item-date">В четверг в 17:20</p>
        </div>

        <div class="appealHistory-item">
          <h4 class="appealHistory-item-title">Обращение в статусе <span>“Принято”</span></h4>
          <p class="appealHistory-item-date">В четверг в 17:20</p>
        </div>

        <div class="appealHistory-item">
          <h4 class="appealHistory-item-title">Cтатусе <span>“Завершенные”</span></h4>
          <p class="appealHistory-item-date">В четверг в 17:20</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isShowHistory = ref<boolean>(false)
</script>

<style scoped lang="scss">
  .appealHistory {
    &-toggleBtn {
      width: 100%;

      padding: 9px 20px;
      margin-bottom: 20px;
    }

    &-item {
      margin-bottom: 22px;

      &-title {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: none;

        & span {
          font-weight: 600;
        }
      }

      &-date {
        font-size: 16px;
        color: var(--light-gray-color);
      }
    }
  }

  // Animations
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
