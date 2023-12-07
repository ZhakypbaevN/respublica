<template>
  <div
    class="ac-dropdown"
    :class="{ secondary: secondary }"
    ref="dropdownTemplate"
    @click="dropdown.visible = !dropdown.visible"
    v-click-outside="() => (dropdown.visible = false)"
  >
    <slot />
    <slot name="triggerer" :visible="dropdown.visible">
      <Button
        :name="btnText ?? 'dropdown'"
        type="default-light-blue"
        class="ac-dropdown_btn"
        :loading="loading"
      >
        <SvgIcon
          name="chevron-down"
          viewboxHeight="56"
          viewboxWidth="56"
        />
      </Button>

    </slot>
    <Transition>
      <ul
        class="ac-dropdown__list"
        v-if="dropdown.visible && !loading"
        @click.stop
        v-collapse
        :ref="(el: HTMLElement) => (list = el)"
      >
        <li
          v-for="{ vnodes, attrs } of dropdown.items"
          :key="vnodes[0].key"
          v-bind="attrs"
          @click="dropdown.visible = !dropdown.visible"
        >
          <VNodeRenderer :vnodes="vnodes" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref, VNode, watch } from 'vue'
import VNodeRenderer from '@/components/common/VNodeRenderer.vue'

export interface DropdownItem {
  vnodes: VNode[]
  attrs: Record<string, unknown>
}

export interface Dropdown {
  items: DropdownItem[]
  visible: boolean
}

defineProps<{
  btnText?: string,
  loading?: boolean,
  secondary?: boolean
}>()

const dropdown = reactive<Dropdown>({
  items: [],
  visible: false
})
const list = ref<HTMLElement>(null)
const dropdownTemplate = ref(null)

const topStyle = ref('calc(100% + 3px)')
const bottomStyle = ref('none')

const checkPosition = () => {
  if (!dropdownTemplate.value) return
  const locatedAbove = dropdownTemplate.value.offsetTop + 300 < document.documentElement.offsetHeight

  topStyle.value = !locatedAbove ? 'none' : 'calc(100% + 3px)'
  bottomStyle.value = locatedAbove ? 'none' : 'calc(100% + 3px)'
}
window.addEventListener('scroll', checkPosition)

watch(
  () => list.value,
  () => {
    if (dropdown.visible) {
      checkPosition()
    }
  }
)

// const slots = useSlots()

provide('dropdown', dropdown)
</script>

<style scoped lang="scss">
.ac-dropdown {
  position: relative;
  width: fit-content;
  &_btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 10px;

    height: 50px;
    padding: 15px 25px;

    svg {
      height: 20px;
      width: 20px;
      fill: var(--accent-color);
      transition: transform 0.3s ease;
    }
    &.active {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__list {
    position: absolute;
    width: 100%;
    max-height: 270px;
    overflow-y: auto;
    top: v-bind(topStyle);
    bottom: v-bind(bottomStyle);
    left: 0;
    border-radius: 3px;
    background: #fff;
    padding: 5px 0 7px;
    z-index: 1;
    box-shadow: 0 3px 3px -2px rgb(0 0 0 / 20%), 0 3px 4px 0 rgb(0 0 0 / 14%),
      0 1px 8px 0 rgb(0 0 0 / 12%);
    li {
      font-size: 18px;
      padding: 8px 12px;
      cursor: pointer;
      &:hover {
        background-color: var(--hover-color);
      }
    }
  }
}
.ac-dropdown.secondary {
  width: 100% !important;
  button {
    width: 100% !important;
    height: auto;

    color: #8A8C98;
    padding: 11px 14px;

    border: 1px solid #A7A8AF;
    border-radius: 3px;

    transition: all .2s ease-in-out;

    svg {
      fill: #8A8C98 !important;
      transition: all .2s ease-in-out;
    }

    &:hover {
      border-color: #0082FA;
      color: #0082FA;
      & svg {
        fill: #0082FA !important;
      }
    }

    &.active {
      color: #fff !important;
      & svg {
        fill: #fff !important;
      }
      svg {
        transform: rotate(180deg) !important;
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
