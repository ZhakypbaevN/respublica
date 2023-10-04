<template>
  <div class="input"
    :class="{
      focused: input.focused,
      labeled: input.focused || input.value,
      withError: input.withError && input.focused || input.withError && input.value,
      hasError: input.withError,
      disabled,
      static: staticPlaceholder,
      light: light
    }">

    <span class="placeholder" v-if="type !== 'editor' && !staticPlaceholder">{{ placeholder }}</span>
    <span class="maxSymbol" v-if="maxSymbol && type === 'textarea'">{{ 255 - (input.value ? String(input.value).length : 0) }}</span>

    <input
      :type="input.eyeState ? input.eyeState : type"
      v-model="input.value"
      :required="required"
      @change="$emit('change')"
      @blur="onBlur"
      @focus="onFocus"
      :class="{'with-error': input.withError}"
      v-mask="'+7 (###) ### ####'"
      :min="17"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :placeholder="staticPlaceholder ? placeholder : ''"
      v-if="type === 'tel'"
    >

    <textarea
      v-model="input.value"
      :required="required"
      @change="$emit('change')"
      :maxlength="maxSymbol"
      @blur="onBlur"
      @focus="onFocus"
      :class="{'with-error': input.withError}"
      :placeholder="staticPlaceholder ? placeholder : ''"
      v-else-if="type === 'textarea'"
    />

    <div
      class="disabled-input"
      v-else-if="type === 'disabled'"
    >
      <span v-if="input.value">
        {{ input.value }}
      </span>
    </div>

    <input
      :type="input.eyeState ? input.eyeState : type"
      v-model="input.value"
      :required="required"
      v-mask="props.mask"
      :min="min"
      @blur="onBlur"
      @focus="onFocus"
      @change="$emit('change')"
      :class="{'with-error': input.withError}"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :placeholder="staticPlaceholder ? placeholder : ''"
      :disabled="disabled"
      :maxlength="maxSymbol"
      v-else-if="props.mask"
    >

    <input
      :type="input.eyeState ? input.eyeState : type"
      v-model="input.value"
      :required="required"
      :min="min"
      @blur="onBlur"
      @focus="onFocus"
      @change="$emit('change')"
      :class="{'with-error': input.withError}"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :placeholder="staticPlaceholder ? placeholder : ''"
      :disabled="disabled"
      :maxlength="maxSymbol"
      v-else
    >

    <span v-if="type === 'password'" class="input__eye">
      <Transition mode="out-in">
        <SvgIcon
          v-if="input.eyeState === 'text'"
          name="password-eye-on"
          :height="24"
          :width="24"
          :viewboxHeight="56"
          :viewboxWidth="56"
          @click="input.eyeState = 'password'"
          :fill="input.withError ? 'var(--error-color)' : (input.focused ? 'var(--accent-color)' : 'black')"
        />
        <SvgIcon
          v-else
          name="password-eye-off"
          :height="24"
          :width="24"
          :viewboxHeight="56"
          :viewboxWidth="56"
          @click="input.eyeState = 'text'"
          :fill="input.withError ? 'var(--error-color)' : (input.focused ? 'var(--accent-color)' : 'black')"
        />
      </Transition>
    </span>
    <SvgIcon
      v-if="resetButton && input.value"
      class="reset"
      name="x"
      :height="14"
      :width="14"
      :viewboxHeight="14"
      :viewboxWidth="14"
      @click="$emit('reset')"
    />
    <Transition name="error">
      <span class="error" :class="{ long: input.withError.length > 20 }" v-if="input.withError">{{ input.withError }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, watch } from 'vue-demi'

interface IProps {
  modelValue?: any,
  value?: string | number,
  name?: string,
  type?: 'text' | 'tel' | 'email' | 'number' | 'editor' | 'password' | 'textarea' | 'disabled',
  light?: boolean,
  placeholder?: string,
  required?: boolean,
  validation?: any,
  sameAs?: string,
  autocomplete?: string,
  autofocus?: boolean,
  min?: number,
  mask?: string,
  staticPlaceholder?: boolean,
  disabled?: boolean,
  resetButton?: boolean,
  multiple?: boolean,
  errorText?: string,
  maxSymbol?: number
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  required: false,
  validation: false,
  autocomplete: 'on',
  light: false,
  autofocus: false,
  staticPlaceholder: false,
  disabled: false,
  resetButton: false,
  multiple: false,
  mask: null
})
const emit = defineEmits([
  'update:modelValue',
  'reset',
  'blur',
  'error',
  'success',
  'change',
  'focus',
  'label'
])

interface IInputValues {
  value: string | number,
  isDirty: boolean,
  eyeState: any,
  withError: any,
  focused: boolean,
  hasError: any,
  formValue: any,
}

const input = reactive(<IInputValues>{
  value: props.modelValue ?? '',
  isDirty: false,
  eyeState: null,
  withError: null,
  focused: false,
  hasError: (props.required || props.validation) && props.name ? inject('hasError') : {},
  formValue: props.name ? inject('formData') : {}
})
if (props.name) input.hasError[props.name] = props.required || props.validation
const inputName = props.name ?? 'example'

const rules = {
  email: ({str}: {str: string}) => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$/
    .test(String(str).toLowerCase()) ? false : 'Введите правильную почту',

  phone: ({str}: {str: string}) => str && str.length === 17 ? false : 'Введите правильный номер',

  password: ({str}: {str: string}) => /^(?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    .test(String(str)) ? false : 'Пароль должен содержать минимум 8 символов. И в нем должны быть минимум, одна цифра,одна большая буква и одна маленькая буква',

  sameAs: ({str}: {str: string}) => {
    console.log('str', str);
    return input.value.toString() === props.sameAs ? false : 'Поля не совпадают';
  },

  customRegex: ({str}: {str: string}) => props.validation.test(String(str)) ? false : props.errorText ?? 'Введите поле правильно'
}

const onChangeValue = () => {
  input.formValue[inputName] = input.value
  const validate = validation()
  if (input.isDirty) {
    input.withError = false
    if (props.required) {
      if (!input.value) input.withError = 'Это поле обязателно'
    }
    if (props.validation && !input.withError) {
      input.withError = validate(input.value)
    }
  }
  if (props.validation && !validate(input.value)) {
    emit('success')
    input.hasError[inputName] = false
  } else if (props.validation && validate(input.value)) {
    emit('error')
    input.hasError[inputName] = true
  } else if (props.required && input.value) {
    emit('success')
    input.hasError[inputName] = false
  } else {
    emit('error')
    input.hasError[inputName] = true
  }
  if (props.min && (input.value ? input.value.toString().length : 0) < props.min) {
    emit('error')
    input.hasError[inputName] = true
  }
  emit('update:modelValue', input.value)
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

watch(
  () => input.withError,
  () => {
    if (input.withError) {
      emit('error')
      input.hasError[inputName] = true
    } else {
      emit('success')
      input.hasError[inputName] = false
    }
  }
)

watch(
  () => [input.focused, input.value],
  () => {
    if (input.focused || input.value) {
      emit('label', true)
    } else emit('label', false)
  }
)

const validation = () => {
  if (typeof props.validation === 'string') {
    return rules[props.validation as keyof typeof rules]
  } else if (typeof props.validation === 'object') {
    return rules.customRegex
  }
  return () => {}
}

const onBlur = ({e}: {e: KeyboardEvent}) => {
  emit('blur', e)
  input.focused = false

  if (!input.isDirty) input.isDirty = true
  input.withError = false
  if (props.required && !input.value) {
    input.withError = 'Это поле обязателно'
  }

  if (props.validation && !input.withError) {
    const validate = validation()
    input.withError = validate(input.value) as boolean
  }
}

const onFocus = ({e}: {e: KeyboardEvent}) => {
  input.focused = true
  emit('focus', e)
}
</script>

<style scoped lang="scss">
.input {
  position: relative;
  width: 100%;
  align-items: flex-start!important;
  transition: all .2s ease;
  margin-bottom: 10px;

  &.light {
    & input {
      border-color: white;
      background-color: transparent;
    }

    & .placeholder {
      color: rgba(white, .8);
    }
  }
  &.grey {
    & input {
      border-color: #818FA7;
      background-color: transparent;
    }

    & .placeholder {
      color: rgba(white, .8);
    }
  }
}
.placeholder,
.maxSymbol {
  font-weight: 400;
  font-size: 18px;
  line-height: 16.71px;
  color: var(--light-gray-color);
  transition: all .2s ease;
  pointer-events: none;
}
.placeholder {
  position: absolute;
  z-index: 1;
  top: 19px;
  left: 30px;
}
.maxSymbol {
  position: absolute;
  color: var(--cancel-color);
  right: 0;
  top: -20px;
  z-index: 0;
  line-height: 17px;
}
.input.hasError {
  margin-bottom: 15px;
}
.input.labeled,
.input.focused,
.input.withError {
  margin-top: 10px;
}
.input.static {
  margin-top: 0;
}
.input.labeled .placeholder {
  left: 0;
  top: -24px;
  z-index: 0;
  line-height: 17px;
  color: var(--light-gray-color);
}
.input.focused .placeholder {
  color: var(--accent-color);
  left: 0;
  top: -20px;
  z-index: 0;
  line-height: 17px;
}
.input.withError .placeholder {
  color: var(--error-color)!important;
}
.error {
  color: var(--error-color);
  font-weight: 400;
  font-size: 14px;
  min-height: 1em;
  position: absolute;
  right: 0;
  bottom: -20px;
  text-align: end;
}
.error.long {
  position: relative;
  display: block;
  bottom: -1px;
  margin-bottom: -10px;
  max-width: 36em;
}
input, textarea, select {
  border: 1px solid var(--light-gray-color);
  border-radius: 10px;
  text-align: left !important;
  box-sizing: border-box;
  padding: 19px 30px;
  width: inherit;
  position: relative;
  resize: vertical;
  line-height: 16.71px;
  font-size: 18px;
}
input.with-error,
textarea.with-error,
select.with-error {
  border: 1px solid var(--error-color);
  animation: shake .1s linear 3;
}
@keyframes shake {
  0% { left: -5px; }
  100% { left: 5px; }
}
input.with-error::placeholder,
textarea.with-error::placeholder {
  color: var(--error-color);
  opacity: .5;
}
input::placeholder,
textarea::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 16.71px;
  color: var(--light-gray-color);
}
.input__eye {
  position: absolute;
  right: 20px;
  top: 14px;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
}
.reset {
  position: absolute;
  right: 15px;
  top: 18px;
  cursor: pointer;
  transition: all .2s ease;
}
.reset:hover {
  fill: var(--error-color);
}
input:focus,
textarea:focus {
  border: 1px solid var(--accent-color);
}
input:focus .placeholder {
  position: relative;
}
input.with-error:focus,
textarea.with-error:focus {
  border: 1px solid var(--error-color);
}

.disabled-input {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(22, 25, 49, 0.05);
  mix-blend-mode: normal;
  border-radius: 3px;
  padding: 16px 18px 17px 18px;
}
.disabled-input span {
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: var(--primary-color);
}

.v-enter-active,
.v-leave-active {
  transition: all .2s ease;
}
.v-enter-from {
  transform: translateY(-100%);
}
.v-leave-to {
  transform: translateY(100%);
}
.error-enter-active,
.error-leave-active {
  transition: all .2s ease;
}
.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
