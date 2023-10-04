<template>
  <div
    class="ac-select"
    ref="list"
    :class="{ active: states.visible, multiple: multiple }"
    v-click-outside="() => { states.visible = false, checkSelectLabel() }"
  >
    <div
      class="inner"
      :class="{ focused: states.visible, labeled: selectedOptions?.length > 0 }"
    >

      <!-- -------- Search Input -------- -->
      <Input
        v-if="!multiple"
        @focus="states.visible = true"
        :placeholder="placeholder"
        v-model="states.inputValue"
        :disabled="!options"
      />

      <!-- -------- Multi Select -------- -->
      <button
        v-else
        type="button"
        class="multi-block"
        @click="states.visible = !states.visible"
      >
        <span class="placeholder">{{ placeholder }}</span>
        <Transition>
          <SelectedList
            v-if="options"
            :options="options"
            v-model:selectedOptions="selectedOptions"
            @click="states.visible = !states.visible"
          />
        </Transition>
      </button>

      <!-- -------- Options -------- -->
      <div v-if="!options" class="loader">
        <span></span>
      </div>
      <SvgIcon
        v-else-if="modelValue && !multiple"
        name="x"
        viewboxHeight="14"
        viewboxWidth="14"
        :width="14"
        @click="resetSelect"
        class="reset"
      />
      <SvgIcon
        v-else
        name="chevron-down"
        viewboxHeight="56"
        viewboxWidth="56"
        @click="states.visible = !states.visible"
      />
      <Transition>
        <div class="ac-select__list" v-if="states.visible && (disabledText || options.length === 0)">
          <div v-if="disabledText" class="li">{{ disabledText }}</div>
          <div  v-else class="li">{{ emptyText }}</div>
        </div>
        <Options
          v-else-if="states.visible && options"
          v-model="selectedOptions"
          v-model:searchValue="states.inputValue"
          @hide="() => { states.visible = false }"
          :options="options"
          :multiple="multiple"
          :locatedAbove="locatedAbove"
          v-collapse
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import Options from './Options.vue'
import SelectedList from './SelectedList.vue'

import { computed, inject, onMounted, reactive, ref, watch } from 'vue'

export interface IOption {
  value: any
  label: string
}

interface IProps {
  name?: string,
  modelValue?: any,
  placeholder?: string,
  options?: IOption[]
  required?: boolean,
  multiple?: boolean,
  disabledText?: string,
  emptyText?: string
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  modelValue: '',
  options: null
})
const emit = defineEmits(['update:modelValue'])

const states = reactive({
  inputValue: '',
  visible: false
})
const selectedOptions = ref(props.modelValue)

const hasError = props.required && props.name ? inject('hasError') : {}
const formValue = props.name ? inject('formData') : {}
const useForm = () => {
  if (!props.required && !props.name) return
  formValue[props.name] = selectedOptions.value
  if (!props.multiple) hasError[props.name] = selectedOptions.value === null
  else hasError[props.name] = selectedOptions.value?.length === 0
}

const checkSelectLabel = () => {
  if (!props.multiple && props.options !== null) states.inputValue = (props.options.find(option => option.value === selectedOptions.value || option.value.toString() === selectedOptions.value))?.label
  else states.inputValue = ''
}

const resetSelect = () => {
  states.inputValue = ''
  selectedOptions.value = null
}

onMounted(() => {
  checkSelectLabel()
  useForm()
})

watch(
  () => [props.modelValue, props.options],
  () => {
    if (props.modelValue) selectedOptions.value = props.modelValue
    checkSelectLabel()
    useForm()
  },
  { deep: true }
)

watch(
  () => selectedOptions.value,
  () => {
    emit('update:modelValue', selectedOptions.value)
    useForm()
  }
)

// --------- Check Position List ---------
const list = ref(null)
const locatedAbove = computed(() => list.value.offsetTop + 300 < document.documentElement.offsetHeight)
</script>

<style scoped lang="scss">
.ac-select {
  width: 100%;

  &.active {
    svg {
      transform: translateY(-50%) rotate(180deg);
    }
  }
  &.multiple{
    min-width: 400px;
  }
  & .inner{
    height: fit-content;
    position: relative;
    margin-bottom: 10px;
    transition: all .2s ease;
    
    & * {
      cursor: pointer;
    }

    &.labeled,
    &.focused {
      margin-top: 10px;
      & .placeholder {
        color: var(--accent-color);
        left: 0;
        top: -20px;
        z-index: 0;
        line-height: 17px;
      }
    }
    &.labeled .placeholder {
      color: var(--primary-color);
    }
    &.withError .placeholder {
      color: var(--error-color)!important;
    }
  }
  & .reset {
    transition: all 0.2s ease;
    &:hover {
      fill: var(--error-color);
    }
  }
  & svg {
    cursor: pointer;
    transition: transform 0.3s ease;
    position: absolute;
    transform: translateY(-50%);
    right: 24px;
    top: 50%;
    height: 20px;
    width: 20px;
  }
  & .input{
    margin-bottom: 0;
  }
  & .multi-block {
    min-height: 50px;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
    padding: 16px;
    width: 100%;
    position: relative;
    resize: vertical;
    text-align: left;
    margin-top: 0;
    & .placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 16.71px;
      color: #16193180;
      transition: all .2s ease;
      pointer-events: none;
      position: absolute;
      z-index: 1;
      top: 16px;
      left: 18px;
    }
  }
}
// Loading
.loader {
  width: 23px;
  height: 23px;

  position: absolute;
  transform: translateY(-50%);
  right: 12px;
  top: 52%;

  & span {
    height: 100%;
    width: 100%;

    display: inline-block;
    box-sizing: border-box;
    border: 2.4px solid var(--primary-color);
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
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
