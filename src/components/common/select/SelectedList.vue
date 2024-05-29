<template>
  <TransitionGroup name="list" tag="div" class="selected-options" @click="() => onClick">
    <button
      v-for="{ value, label } in selectedList"
      :key="value"
      type="button"
      @click.stop="() => { removeOption(value) }"
    >
      <span>{{ label }}</span>
      <SvgIcon
        name="x"
        :viewboxHeight="14"
        :viewboxWidth="14"
        :width="8"
        :height="8"
      />
    </button>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IOption } from './index.vue'

interface Props {
  selectedOptions?: any,
  options?: IOption[],
  onClick?: Function
}
interface Emits {
  (event: 'update:selectedOptions', value: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedList = computed(() => {
  const list = []
  if (props.selectedOptions) {
    props.selectedOptions.forEach(selectOption => {
      const searched = props.options.find(option => option.value === selectOption)
      if (searched) list.push(searched)
    })
  }
  return list.reverse()
})

// --------- Remove Option From Selected Event ---------
const removeOption = (value: any) =>
  emit('update:selectedOptions', props.selectedOptions.filter(option => option !== value))
</script>

<style scoped lang="scss">
.selected-options {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 6px 10px;
  margin-bottom: 15px;

  & button {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #ebebeb;
    transition: all .2s linear;

    &:hover{
      color: #AD1717;
      background-color: #f9bbbb;

      & svg{
        fill: #AD1717;
      }
    }
  }

  & span{
    color: #161931;
    font-size: 13px;
  }

  & svg{
    display: block;
    width: 15px;
    height: 15px;
    fill: #929292;
    transition: all .2s linear;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
