<template>
  <Transition appear>
    <div class="modal-back" :style="{opacity: opacity}">
      <div class="modal-inner" @mousedown.stop :style="container">
        <div class="modal-form" :class="{big: big}">
          <div class="modal-form-inner" :style="`max-width: ${maxInner}px;`">
            <div class="modal-header">
              <h2 class="modal-title" v-if="title">{{ title }}</h2>
              <p class="modal-subtitle" v-if="subtitle">{{ subtitle }}</p>
            </div>

            <SvgIcon
              name="close"
              class="modal-close"
              :viewboxHeight="37"
              :viewboxWidth="37"
              @click="hideModal"
            />
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue'

  interface IProps {
    title?: string,
    subtitle?: string,
    maxInner?: number
    big?: boolean
  }

  interface Emits {
    (event: 'hide'): Function
  }

  withDefaults(defineProps<IProps>(), {
    title: undefined,
    subtitle: undefined,
    big: false,
    maxInner: 600
  })
  const emits = defineEmits<Emits>()

  const container = reactive({
    top: '140%',
    opacity: '0'
  })
  const opacity = ref(0)

  const showModal = () => {
    setTimeout(() => {
      opacity.value = 1
      container.top = '40px'
      container.opacity = '1'
    }, 0)
    document.removeEventListener('mouseover', showModal)
  }

  onMounted(() => {
    // document.addEventListener('keydown', hideModalOnEsc)
    showModal();
    document.body.style.overflow = 'hidden'
  })
  onUnmounted(() => {
    // document.removeEventListener('keydown', hideModalOnEsc)
    document.body.style.overflow = 'overlay'
  })


  // Hide Modal Events
  const hideModal = () => {
    opacity.value = 0
    container.top = '140%'
    container.opacity = '0'
    setTimeout(() => {
      emits('hide')
    }, 300)
  }

  const hideModalOnEsc = () => {
    hideModal()
  }
</script>

<style scoped lang="scss">
.modal {
  &-back {
    height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;

    overflow-y: overlay;
    overflow-x: hidden;
    background: rgba(33, 37, 41, 0.8);
    transition: all .2s linear;
  }

  &-inner {
    width: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    z-index: 2;
    transition: all 0.3s ease;

    padding: 30px 20px 70px;
  }

  &-form {
    width: 100%;
    min-width: auto;
    max-width: 985px;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    position: relative;

    padding: 52px 50px;

    background: #ffffff;
    margin: 0;

    &-inner {
      width: 100%;
    }

    &.big {
      max-width: 1500px;

      & .modal-form-inner {
        max-width: 900px;
      }
    }
  }

  &-header {
    margin-bottom: 40px;
  }

  &-title {
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }

  &-subtitle {
    font-weight: 500;
    font-size: 30px;
  }

  &-close {
    width: 37px;
    height: 37px;

    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
  }

  // Adaptation
  @media (max-width: 992px) {
    &-inner {
      padding: 30px 20px 60px;
    }

    &-form {
      padding: 48px 42px;
    }

    &-header {
      margin-bottom: 48px;
    }

    &-title {
      font-size: 34px;
    }

    &-subtitle {
      font-size: 28px;
    }

    &-close {
      width: 36px;
      height: 36px;

      top: 18px;
      right: 20px;
    }
  }

  @media (max-width: 768px) {
    &-inner {
      padding: 28px 14px 52px;
    }

    &-form {
      padding: 40px 20px;
    }

    &-header {
      margin-bottom: 42px;
    }

    &-title {
      font-size: 32px;
    }

    &-subtitle {
      font-size: 22px;
    }

    &-close {
      width: 32px;
      height: 32px;

      top: 18px;
      right: 20px;
    }
  }

  @media (max-width: 576px) {
    &-inner {
      padding: 24px 12px 48px;
    }

    &-form {
      padding: 40px 18px;
    }

    &-header {
      margin-bottom: 40px;
    }

    &-title {
      font-size: 32px;
    }

    &-subtitle {
      font-size: 18px;
    }

    &-close {
      width: 30px;
      height: 30px;

      top: 12px;
      right: 12px;
    }
  }

  @media (max-width: 380px) {
    &-inner {
      padding: 24px 12px 48px;
    }

    &-form {
      padding: 38px 14px;
    }

    &-header {
      margin-bottom: 36px;
    }

    &-title {
      font-size: 28px;
    }

    &-subtitle {
      font-size: 18px;
    }

    &-close {
      width: 26px;
      height: 26px;

      top: 10px;
      right: 10px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
