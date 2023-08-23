<template>
  <Transition appear>
    <div class="modal-back" :style="{opacity: opacity}">
      <div class="modal-inner" @mousedown.stop ref="container">
        <div class="modal-form">
          <div class="modal-header">
            <h2 class="modal-title" v-if="title">{{ title }}</h2>
            <p class="modal-subtitle" v-if="subtitle">{{ subtitle }}</p>
          </div>
          <SvgIcon
            name="x"
            class="close"
            :viewboxHeight="61"
            :viewboxWidth="61"
            :width="61"
            :height="61"
            @click="hideModal"
          />
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SvgIcon from './SvgIcon.vue';

interface IProps {
  title?: string,
  subtitle?: string,
}

interface Emits {
  (event: 'hide'): Function
}

const props = withDefaults(defineProps<IProps>(), {
  title: undefined,
  subtitle: undefined,
})
const emits = defineEmits<Emits>()

const container = ref(null)
const opacity = ref(0)

const showModal = () => {
  const element = document.getElementById('intro-btn');

  setTimeout(() => {
    opacity.value = 1
    container.value.style.top = '100px'
    container.value.style.opacity = '1'
  }, 0)
  document.removeEventListener('mouseover', showModal)
}

onMounted(() => {
  document.addEventListener('keydown', hideModalOnEsc)
  showModal();
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', hideModalOnEsc)
  document.body.style.overflow = 'overlay'
})


// Hide Modal Events
const hideModal = () => {
  opacity.value = 0
  container.value.style.top = '140%'
  container.value.style.opacity = '0'
  setTimeout(() => {
    emits('hide')
  }, 300)
}

const hideModalOnEsc = (e) => {
  if (e.keyCode === 27) {
    hideModal()
  }
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
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    z-index: 2;
    transition: all 0.3s ease;

    padding: 30px 20px 70px;
    
    opacity: 0;
  }

  &-form {
    min-width: 720px;
    width: fit-content;
    position: relative;

    padding: 70px 96px;

    background: #E2DED3;
    border-radius: 10px;
    margin: 0;
  }

  &-header {
    margin-bottom: 66px;
  }

  &-title {
    font-weight: 700;
    font-size: 48px;
    text-transform: uppercase;
    color: #222222;
    margin-bottom: 38px;
  }

  &-subtitle {
    font-weight: 500;
    font-size: 30px;
    color: #222222;
  }
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// Adaptation
@media (max-width: 992px) {
  .modal {
    &-inner {
      padding: 10px 20px 80px;
    }
    
    &-form {
      min-width: 630px;
      padding: 50px 60px;
    }

    &-header {
      margin-bottom: 50px;
    }

    &-title {
      font-size: 38px;
      margin-bottom: 28px;
    }

    &-subtitle {
      font-size: 22px;
    }
  }
  .close {
    top: 10px;
    right: 10px;

    height: 48px !important;
    width: 48px !important;
  }
}

// Adaptation
@media (max-width: 768px) {
  .modal {
    &-inner {
      padding: 10px 20px 80px;
    }

    &-form {
      min-width: 500px;
      padding: 40px 50px;
    }

    &-header {
      margin-bottom: 40px;
    }

    &-title {
      font-size: 34px;
      margin-bottom: 22px;
    }

    &-subtitle {
      font-size: 22px;
    }
  }
  .close {
    top: 10px;
    right: 10px;

    height: 44px !important;
    width: 44px !important;
  }
}

@media (max-width: 576px) {
  .modal {
    &-inner {
      padding: 10px 20px 60px;
    }

    &-form {
      min-width: 400px;
      padding: 40px 30px;
    }

    &-header {
      margin-bottom: 36px;
    }

    &-title {
      font-size: 30px;
      margin-bottom: 22px;
    }

    &-subtitle {
      font-size: 20px;
    }
  }
  .close {
    height: 40px !important;
    width: 40px !important;
  }
}

@media (max-width: 430px) {
  .modal {
    &-inner {
      padding: 10px 20px 40px;
    }

    &-form {
      min-width: 300px;
      padding: 45px 20px;
    }

    &-header {
      margin-bottom: 32px;
    }

    &-title {
      font-size: 24px;
      margin-bottom: 22px;
    }

    &-subtitle {
      font-size: 18px;
    }
  }
  .close {
    height: 35px !important;
    width: 35px !important;
  }
}
</style>
