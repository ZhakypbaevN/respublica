<template>
  <div class="sideBar">
    <div class="sideBar-list">
      <div
        v-for="link of listValue"
        :key="link.title"
        class=""
      > 
        <RouterLink
          v-if="!link.typeDropDown && link.link"
          class="sideBar-link"
          :class="{btnStyle: link.typeButton}"
          :to="link.link"
        >
          <span>{{ link.title }}</span>
        </RouterLink>

        <button
          v-else-if="!link.typeDropDown && link.func"
          class="sideBar-link"
          :class="{btnStyle: link.typeButton}"
          @click="link.func"
        >
          <span>{{ link.title }}</span>
        </button>

        <div v-else class="sideBar-dropDown">
          <button
            class="sideBar-dropDown-btn"
            :class="{active: link.active}"
            @click="() => link.active = !link.active"
          >
            <span>{{ link.title }}</span>

            <SvgIcon
              name="chevron-down"
              viewboxHeight="56"
              viewboxWidth="56"
            />
          </button>

          <Transition>
            <div
              v-collapse
              v-if="link.active"
            >
              <div class="sideBar-dropDown-list">
                <RouterLink
                  class="sideBar-link"
                  v-for="linkChild of link.children"
                  :key="linkChild.title"
                  :to="linkChild.link"
                >
                  <span>{{ linkChild.title }}</span>
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
  list: Array<any>,
}

const props = defineProps<IProps>()
const listValue = ref(props.list)
</script>
  
<style scoped lang="scss">
.sideBar {
  overflow-y: auto;
  
  padding: 40px 20px;
  background: #041a3f;

  transition: all .3s ease-in-out;
  
  &-list {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &-link {
    width: 100%;
    text-align: left;
    cursor: pointer;

    & span {
      color: #FFF;
      font-size: 18px;
      font-weight: 400;
      word-wrap: break-word;
      transition: all .3s ease-in-out;
    }
    
    &.router-link-active span {
      color: var(--accent-color);
    }
  }

  &-dropDown {
    &-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & svg {
        height: 20px;
        width: 20px;

        fill: rgba(white, .5);
        
        transform: rotate(-180deg);
        transition: all .3s ease-in-out;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      grid-gap: 25px;

      padding: 25px 0 25px 40px;

      & .sideBar-link {
        & span {
          color: rgba(white, .6);
        }

        &:hover span,
        &.router-link-active span {
          color: var(--accent-color);
        }
      }
    }
  }

  & .sideBar-link.btnStyle,
  & .sideBar-dropDown-btn {
    padding: 16px 25px;
    border-radius: 10px;
    background: rgba(74, 120, 236, 0.10);

    & span {
      color: rgba(white, .5);
      font-size: 18px;
      transition: all .3s ease-in-out;
    }

    &:hover {
      span {
        color: var(--accent-color);
      }

      & svg {
        fill: var(--accent-color);
      }
    }

    &.active,
    &.router-link-active {
      & span {
        color: white;
      }

      & svg {
        fill: white;
        transform: rotate(0);
      }
    }
  }
}
</style>
  