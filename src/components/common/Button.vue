<template>
  <button
    :class="{
      [type]: true,
      loading
    }"
    :type="htmlType"
    :disabled="disabled || handleError(hasError)"
    @click="
      loading || disabled || handleError(hasError)
        ? null
        : $emit('click', $event)
    "
  >
    <slot name="left" v-if="!loading" />
    <Transition>
      <Loading v-if="loading" />
    </Transition>
    <span>{{ name }}</span>
    <slot v-if="!loading" />
  </button>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'
import { inject } from 'vue'
import handleError from '../../helpers/handleError'

interface IProps {
  name?: string
  type?: 'default' | 'default-blue' | 'default-red' | 'outline-red' | 'outline-blue' | 'outline-default'
  loading?: boolean
  htmlType?: 'button' | 'submit' | 'reset',
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  type: 'default',
  loading: false,
  htmlType: 'button',
  disabled: false,
})

defineEmits(['click'])

const hasError = props.htmlType === 'submit' ? inject('hasError') : {}
</script>

<style scoped lang="scss">
button {
  padding: 20px 30px;
  border: 1px solid transparent;
  border-radius: 10px;
  position: relative;

  & span {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Tilda Sans';
    line-height: 1;
    transition: all .2s linear;
  }

  &[disabled] {
    opacity: .6;
    cursor: default;
  }

  &.loading {
    & span {
      opacity: 0;
    }
  }

  &.default {
    background: var(--primary-color);

    &-red {
      background: var(--red-color);
    }

    &-blue {
      background: var(--accent-color);
    }
  }

  &.outline {
    &-default {
      border-color: var(--primary-color);
      
      & span {
        color: var(--primary-color);
      }
    }

    &-red {
      border-color: var(--red-color);
      
      & span {
        color: var(--red-color);
      }
    }

    &-blue {
      border-color: var(--accent-color);
      
      & span {
        color: var(--accent-color);
      }
    }
  }
}
</style>
