<template>
  <label class="checkboxBlock" :class="{light: light}" :for="name">
    <input type="checkbox" :id="name" v-model="input.value">
    <span>
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
  import { inject, onMounted, reactive, watch } from 'vue-demi'

  interface IProps {
    modelValue?: boolean,
    value?: string | number,
    name?: string,
    light?: boolean,
    required?: boolean,
  }
  const props = withDefaults(defineProps<IProps>(), {
    required: false,
    light: false,
  })
  const emit = defineEmits([
    'update:modelValue'
  ])

  interface IInputValues {
    value: boolean,
    hasError: any,
    formValue: any,
  }

  const input = reactive(<IInputValues>{
    value: props.modelValue ?? false,
    hasError: props.required && props.name ? inject('hasError') : {},
    formValue: props.name ? inject('formData') : {}
  })

  if (props.name) input.hasError[props.name] = props.required
  const inputName = props.name ?? 'example'

  const onChangeValue = () => {
    input.formValue[inputName] = input.value

    emit('update:modelValue', input.value)
    if (props.required) return input.hasError[inputName] = input.value == false;
    return input.hasError[inputName] = true;
  }

  watch(
    () => input.value,
    onChangeValue
  )

  watch(
    () => props.modelValue,
    () => {
      input.value = props.modelValue
      onChangeValue()
    }
  )

  onMounted(onChangeValue)
</script>

<style lang="scss">
  .checkboxBlock {
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: flex-start;
    grid-gap: 10px;

    cursor: pointer;

    margin-bottom: 0px !important;

    &.light {
      & span {
        color: white;
      }
    }

    & span,
    & *,
    & a {
      display: inline;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 400;
      line-height: 1.1;
    }
    
    & a {
      text-decoration-line: underline;
    }
    
    & input {
      -webkit-appearance: none;
      -o-appearance:none;
      appearance: none;
      background-color: var(--form-background);

      font: inherit;
      color: var(--light-gray-color);
      width: 20px;
      height: 20px;
      border: 1.4px solid var(--light-gray-color);
      border-radius: 5px;
      background-color: transparent;
      transform: translateY(-0.075em);

      display: grid;
      place-content: center;

      &::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em white;
        background-color: CanvasText;
      }

      &:checked {
        background-color: var(--accent-color);
        border-color: var(--accent-color);

        &::before {
          transform: scale(1);
        }
      }

      &:focus {
        border-color: var(--accent-color);
      }

      &:disabled {
        --form-control-color: var(--form-control-disabled);

        color: var(--form-control-disabled);
        cursor: not-allowed;
      }
    }
  }
</style>
