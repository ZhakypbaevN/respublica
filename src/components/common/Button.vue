<template>
  <button
      :class="{
      [type]: true,
      loading
    }"
      :type="htmlType"
      :disabled="disabled || handleError(hasError, ignoreValidate)"
      @click="
      loading || disabled || handleError(hasError, ignoreValidate)
        ? null
        : $emit('click', $event)
    "
  >
    <slot name="left" v-if="!loading" />
    <Transition>
      <Loading v-if="loading" />
    </Transition>
    <span :class="{bigText: uppercase}">{{ name }}</span>
    <slot v-if="!loading" />
  </button>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'
import { inject } from 'vue'
import handleError from '../../helpers/handleError'

interface IProps {
  name?: string
  type?: 'default' | 'default-blue' | 'default-green' | 'default-light-blue' | 'default-red' | 'default-grey' | 'outline-red' | 'outline-blue' | 'outline-default' | 'outline-light' | 'outline-grey'
  loading?: boolean
  htmlType?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  uppercase?: boolean,
  ignoreValidate?: any[] | null,
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  type: 'default',
  loading: false,
  htmlType: 'button',
  disabled: false,
  ignoreValidate: null,
})

defineEmits(['click'])

const hasError = props.htmlType === 'submit' ? inject('hasError') : {}
</script>

<style scoped lang="scss">
button {
  padding: 20px 30px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  position: relative;

  transition: all .3s ease-in-out;

  & span {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Tilda Sans';
    text-wrap: nowrap;
    line-height: 1;
    
    transition: all .3s ease-in-out;

    &.bigText {
      text-transform: uppercase;
    }
  }

  & svg {
    transition: all .3s ease-in-out;
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

    &:hover {
      background: darken(#042051, 6);
    }

    &-red {
      background: var(--red-color);

      &:hover {
        background: darken(#F70531, 6);
      }
    }

    &-blue {
      background: var(--accent-color);

      &:hover {
        background: darken(#4A78EC, 6);
      }
    }

    &-green {
      background-color: var(--green-color);

      & span {
        text-align: left;
      }

      &:hover {
        background: var(--green-color);
      }
    }

    &-grey {
      background-color: var(--light-gray-color-op50);

      &:hover {
        background-color: var(--light-gray-color);
      }
    }

    &-light {
      &-blue {
        background-color: var(--accent-color-op15);

        & span {
          color: var(--accent-color);
        }

        &:hover {
          background-color: var(--accent-color-op30);
        }
      }

      &-grey {
        background-color: var(--light-gray-color-op10);

        &:hover {
          background-color: var(--light-gray-color-op20);
        }
      }
    }
  }

  &.outline {
    &-default {
      border-color: var(--primary-color);

      & span {
        color: var(--primary-color);
      }
    }

    &-light {
      border-color: white;

      & span {
        color: white;
      }
    }

    &-red {
      border-color: var(--red-color);

      & span {
        color: var(--red-color);
      }

      &:hover {
        background-color: var(--red-color-op05);
      }
    }

    &-blue {
      border-color: var(--accent-color);

      & span {
        color: var(--accent-color);
      }

      &:hover {
        background-color: var(--accent-color-op10);
      }
    }

    &-grey {
      border-color: var(--light-gray-color);

      & span {
        color: var(--light-gray-color);
      }

      &-light {
        border-color: var(--light-gray-color);

        & span {
          color: var(--light-gray-color);
        }
      }
    }
  }

  // Adaptation
  @media (max-width: 1200px) {
    padding: 19px 28px;
    border-radius: 10px;

    & span {
      font-size: 17px;
    }
  }

  @media (max-width: 992px) {
    padding: 18px 26px;
    border-radius: 9px;

    & span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 24px;
    border-radius: 8px;

    & span {
      font-size: 15px;
    }
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}
</style>
