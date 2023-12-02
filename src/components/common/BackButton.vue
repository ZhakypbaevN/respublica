<template>
  <div class="backBtn" @click="back">
    <Button v-if="outlined" :name="$t('button.go-back')" type="outline-grey" v-slot:left>
      <SvgIcon
        name="arrow-left"
        :viewboxWidth="24"
        :viewboxHeight="24"
      />
    </Button>

    <div class="default">
      <SvgIcon
        name="arrow-left-big"
        :viewboxWidth="44"
        :viewboxHeight="44"
      />

      <div class="default-text">
        {{ $t('button.go-back') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

interface IProps {
  outlined?: boolean,
}
interface Emits {
  (event: 'update:selectedOptions', value: any): void
}

const emit = defineEmits<Emits>()

withDefaults(defineProps<IProps>(), {
  outlined: false
})

const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.backBtn {
  cursor: pointer;

  & button {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    & svg {
      width: 24px;
      height: 24px;
  
      fill: var(--light-gray-color);
    }
  }

  & .default {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    
    & svg {
      width: 44px;
      height: 44px;
  
      fill: var(--primary-color);
      transform: translateX(0);
      transition: all .3s ease-in-out;
    }

    &-text {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-color);
      transition: all .3s ease-in-out;
    }

    &:hover {
      & svg {
        fill: var(--accent-color);
        transform: translateX(-10px);
      }

      & .default-text {
        color: var(--accent-color);
      }
    }
  }
}
</style>