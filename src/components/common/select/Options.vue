<template>
<div class="ac-select__list">
  <div
    v-for="{ value, label } of filteredOptions"
    :key="value"
    @click="optionIsSelected(value) ? removeSelectedOption(value) : handleSelect(value, label)"
    class="li"
    :class="{ selected: optionIsSelected(value) }"
  >
    {{ label }}
  </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IOption } from './index.vue'

interface IProps {
  modelValue: any,
  searchValue?: string,
  options?: IOption[],
  multiple?: boolean,
  locatedAbove: boolean
}
const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['update:modelValue', 'update:searchValue', 'hide', 'remove'])

const optionIsSelected = (value: any): boolean => {
  if (props.modelValue !== null && props.multiple) return props.modelValue.includes(value) || props.modelValue.includes(String(value))
  return props.modelValue === value || props.modelValue === String(value)
}

// --------- Option Click Event ---------
const handleSelect = (value: any = null, label: string = null) => {
  if (!props.multiple) {
    emit('update:modelValue', value)
    emit('update:searchValue', label)
    emit('hide')
  } else {
    if (typeof props.modelValue === 'object') emit('update:modelValue', [value, ...props.modelValue])
    else emit('update:modelValue', [value])
  }
}

const removeSelectedOption = (value: any) => {
  if (!props.multiple) {
    emit('update:modelValue', null)
    emit('update:searchValue', '')
    emit('hide')
  } else emit('update:modelValue', props.modelValue.filter(option => option !== value))
}

// --------- Filter Options ---------
const filteredOptions = computed(() => {
  const filtered = filterOptions(props.searchValue, props.options)
  if (
    filtered.length === 1 &&
    filtered[0].label === props.searchValue &&
    (filtered[0].value === props.modelValue || String(filtered[0].value) === props.modelValue)
  ) return props.options
  else return filtered
})

const filterOptions = (search, options) =>
  options.filter((option) => {
    if (search && !props.multiple) {
      return String(option.label)
        .toLowerCase()
        .includes(String(search).toLowerCase())
    } else return option
  })

// --------- Check Position List ---------
const topStyle = computed(() => !props.locatedAbove ? 'none' : 'calc(100% + 3px)')
const bottomStyle = computed(() => props.locatedAbove ? 'none' : 'calc(100% + 3px)')
</script>

<style lang="scss">
.ac-select {
  &__list {
    min-width: 100%;
    max-height: 270px;
    overflow-y: overlay;
    position: absolute;
    top: v-bind(topStyle);
    bottom: v-bind(bottomStyle);
    left: 0;
    border-radius: 3px;
    background: #fff;
    padding: 3px 0;
    z-index: 2;
    box-shadow: 0 3px 3px -2px rgb(0 0 0 / 20%),
                0 3px 4px 0 rgb(0 0 0 / 14%),
                0 1px 8px 0 rgb(0 0 0 / 12%);
    & .li {
      padding: 8px 12px;
      cursor: pointer;
      &.selected {
        background-color: var(--accent-color);
        color: #fff;
      }
      &:not(.selected):hover {
        background-color: var(--hover-color);
      }
    }
  }
}
</style>
