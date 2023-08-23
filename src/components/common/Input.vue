<template>
  <div class="input"
    :class="{
      focused: input.focused,
      labeled: input.focused || input.value,
      withError: input.withError && input.focused || input.withError && input.value,
      hasError: input.withError,
    }"
  >

    <label class="label">{{ label }}</label>

    <input
      :type="input.eyeState ? input.eyeState : type"
      v-model="input.value"
      :required="required"
      @change="$emit('change')"
      @blur="onBlur"
      @focus="onFocus"
      :class="{'with-error': input.withError}"
      v-mask="'+7 (###) ### ####'"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      v-if="type === 'tel'"
    >

    <textarea
      v-model="input.value"
      :required="required"
      @change="$emit('change')"
      @blur="onBlur"
      @focus="onFocus"
      :class="{'with-error': input.withError}"
      v-else-if="type === 'textarea'"
    />

    <input
      :type="input.eyeState ? input.eyeState : type"
      v-model="input.value"
      :required="required"
      @blur="onBlur"
      @focus="onFocus"
      @change="$emit('change')"
      :class="{'with-error': input.withError}"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      v-else
    >
    <Transition name="error">
      <span class="error" :class="{ long: input.withError.length > 20 }" v-if="input.withError">{{ input.withError }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, watch } from 'vue'

interface IProps {
  modelValue?: any,
  value?: string | number,
  name?: string,
  type?: 'text' | 'tel' | 'textarea',
  label: string,
  required?: boolean,
  validation?: any,
  sameAs?: string,
  autocomplete?: string,
  autofocus?: boolean,
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  label: 'Example label',
  required: false,
  validation: false,
  autocomplete: 'on',
  autofocus: false,
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

const input = reactive({
  value: props.modelValue,
  isDirty: false,
  eyeState: null,
  withError: null,
  focused: false
})
const hasError = (props.required || props.validation) && props.name ? inject('hasError') : {}
if (props.name) hasError[props.name] = props.required || props.validation
const inputName = props.name ?? 'example'

const formValue = props.name ? inject('formData') : {}

const rules = {
  email: email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(String(email).toLowerCase()) ? false : 'Введите правильную почту',

  phone: phone => phone && phone.length === 17 ? false : 'Введите правильный номер',

  password: password => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    .test(String(password)) ? false : 'Пароль должен содержать минимум 8 символов. И в нем должны быть минимум, одна цифра,одна большая буква и одна маленькая буква',

  sameAs: string => string === props.sameAs ? false : 'Поля не совпадают',

  customRegex: string => props.validation.test(String(string)) ? false : props.errorText ?? 'Введите поле правильно'
}

const onChangeValue = () => {
  formValue[inputName] = input.value
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
    hasError[inputName] = false
  } else if (props.validation && validate(input.value)) {
    emit('error')
    hasError[inputName] = true
  } else if (props.required && input.value) {
    emit('success')
    hasError[inputName] = false
  } else {
    emit('error')
    hasError[inputName] = true
  }
  if (props.min && input.value < props.min) input.value = props.min
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
      hasError[inputName] = true
    } else {
      emit('success')
      hasError[inputName] = false
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
    return rules[props.validation]
  } else if (typeof props.validation === 'object') {
    return rules.customRegex
  }
  return () => {}
}

const onBlur = e => {
  emit('blur', e)
  input.focused = false

  if (!input.isDirty) input.isDirty = true
  input.withError = false
  if (props.required && !input.value) {
    input.withError = 'Это поле обязателно'
  }

  if (props.validation && !input.withError) {
    const validate = validation()
    input.withError = validate(input.value)
  }
}

const onFocus = e => {
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

  &.hasError {
    margin-bottom: 15px;
  }
}
.label {
  display: inline-block;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  color: #222222;
  margin-bottom: 20px;
}

input, textarea {
  width: inherit;
  resize: vertical;

  padding: 16px;
  
  line-height: 1.2;
  font-size: 18px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  border: 1px solid transparent;

  &:focus {
    border: 1px solid #67687D;
  }

  &.with-error {
    border: 1px solid var(--error-color);
    animation: shake .1s linear 3;

    &:focus {
      border: 1px solid var(--error-color);
    }
  }
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

@keyframes shake {
  0% { left: -5px; }
  100% { left: 5px; }
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


// Adaptation
@media (max-width: 992px) {
  .label {
    font-size: 18px;
    margin-bottom: 18px;
  }
}

@media (max-width: 576px) {
  .label {
    font-size: 16px;
    margin-bottom: 16px;
  }

  input, textarea {
    padding: 14px;
    font-size: 16px;
  }
}

@media (max-width: 430px) {
  .label {
    font-size: 16px;
    margin-bottom: 12px;
  }

  input, textarea {
    padding: 14px;
    font-size: 16px;
  }
}
</style>
