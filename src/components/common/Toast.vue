<template>
  <transition-group name="fade" tag="div" class="toast-list" mode="ease-out">
    <div v-for="item in toastList" :key="item.id" :class="'toast ' + item.type">
      <div class="background" :class="{ animated: item.undo }"></div>
      <span class="message">{{ item.message }}</span>
      <button
        v-if="item.undo"
        class="undo"
        @click="() => {
          item.undo()
          remove(item.id)
        }"
        data-tooltip="Отменить"
        data-tooltip-location="bottom"
      >
        <SvgIcon name="undo"/>
      </button>
      <button v-if="!item.undo" class="close-toast" @click="remove(item.id)">+</button>
    </div>
  </transition-group>
</template>

<script setup>
import { useToast } from '../../modules/toast.js'
import SvgIcon from './SvgIcon.vue';
const { toastList, remove } = useToast()
</script>

<style scoped lang="scss">
.toast-list {
  top: 0;
  left: calc(50%);
  transform: translateX(-50%);
  min-width: 500px;
  max-width: 800px;
  position: fixed;
  z-index: 999999;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;

  // Adaptation
  /* @media (max-width: 576px) {
    min-width: 200px;
  } */
}

.toast {
  position: relative;
  padding: 15px 50px 15px 50px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000;
  width: 100%;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-50px);
  opacity: 1;
  z-index: 2;
}
.background.animated {
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-name: timer;
}
@keyframes timer {
  from {
    opacity: 1;
}

  to {
    transform: translateX(-550px);
    opacity: 1;
  }
}

.message {
  z-index: 3;
}

.toast.default {
  border: 2px solid #0082fa80;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'%0Awidth='30' height='30'%0AviewBox='0 0 172 172'%0Astyle=' fill:%23000000;'%3E%3Cg fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'%3E%3Cpath d='M0,172v-172h172v172z' fill='none'%3E%3C/path%3E%3Cg fill='%230082fa80'%3E%3Cpath d='M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM91.73333,120.4h-11.46667v-40.13333h11.46667zM86,65.93333c-4.7472,0 -8.6,-3.8528 -8.6,-8.6c0,-4.7472 3.8528,-8.6 8.6,-8.6c4.7472,0 8.6,3.8528 8.6,8.6c0,4.7472 -3.8528,8.6 -8.6,8.6z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 15px center no-repeat #fff;
}
.toast.default .background {
  background: rgba(0, 130, 250, 0.2);
}
.toast.success {
  border: 2px solid #00DB7F;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'%0Awidth='24' height='24'%0AviewBox='0 0 172 172'%0Astyle=' fill:%23000000;'%3E%3Cg fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'%3E%3Cpath d='M0,172v-172h172v172z' fill='none'%3E%3C/path%3E%3Cg fill='%2300DB7F'%3E%3Cpath d='M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM124.45347,72.85347l-43.344,43.344c-1.07787,1.07787 -2.53413,1.67987 -4.05347,1.67987c-1.51933,0 -2.98133,-0.602 -4.05347,-1.67987l-19.7972,-19.7972c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693c2.24173,-2.24173 5.8652,-2.24173 8.10693,0l15.74373,15.74373l39.29053,-39.29053c2.24173,-2.24173 5.8652,-2.24173 8.10693,0c2.24173,2.24173 2.24173,5.8652 0,8.10693z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 15px center no-repeat #fff;
}
.toast.success .background {
  background: rgba(0, 219, 128, 0.2);
}
.toast.danger {
  border: 2px solid #ff7eb880;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'%0Awidth='24' height='24'%0AviewBox='0 0 172 172'%0Astyle=' fill:%23000000;'%3E%3Cg fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'%3E%3Cpath d='M0,172v-172h172v172z' fill='none'%3E%3C/path%3E%3Cg fill='%23ff7eb7'%3E%3Cpath d='M86,14.33333c-39.63167,0 -71.66667,32.035 -71.66667,71.66667c0,39.63167 32.035,71.66667 71.66667,71.66667c39.63167,0 71.66667,-32.035 71.66667,-71.66667c0,-39.63167 -32.035,-71.66667 -71.66667,-71.66667zM119.7335,109.59983c2.80217,2.80217 2.80217,7.3315 0,10.13367c-1.3975,1.3975 -3.23217,2.09983 -5.06683,2.09983c-1.83467,0 -3.66933,-0.70233 -5.06683,-2.09983l-23.59983,-23.59983l-23.59983,23.59983c-1.3975,1.3975 -3.23217,2.09983 -5.06683,2.09983c-1.83467,0 -3.66933,-0.70233 -5.06683,-2.09983c-2.80217,-2.80217 -2.80217,-7.3315 0,-10.13367l23.59983,-23.59983l-23.59983,-23.59983c-2.80217,-2.80217 -2.80217,-7.3315 0,-10.13367c2.80217,-2.80217 7.3315,-2.80217 10.13367,0l23.59983,23.59983l23.59983,-23.59983c2.80217,-2.80217 7.3315,-2.80217 10.13367,0c2.80217,2.80217 2.80217,7.3315 0,10.13367l-23.59983,23.59983z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 15px center no-repeat #fff;
}
.toast.danger .background {
  background: rgba(255, 126, 184, 0.2);
}
.toast.warning {
  border: 2px solid #ff9d3380;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'%0Awidth='30' height='30'%0AviewBox='0 0 172 172'%0Astyle=' fill:%23000000;'%3E%3Cg fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'%3E%3Cpath d='M0,172v-172h172v172z' fill='none'%3E%3C/path%3E%3Cg fill='%23ff9d34'%3E%3Cpath d='M159.3795,132.23217l-63.04517,-104.88417c-2.20017,-3.66217 -6.063,-5.848 -10.33433,-5.848c-4.27133,0 -8.13417,2.18583 -10.32717,5.84083l-63.05233,104.89133c-2.236,3.7195 -2.29333,8.37067 -0.15767,12.1475c2.1285,3.77683 6.149,6.12033 10.492,6.12033h126.0975c4.33583,0 8.3635,-2.3435 10.492,-6.12033c2.13567,-3.77683 2.07117,-8.428 -0.16483,-12.1475zM89.58333,129h-7.16667c-1.978,0 -3.58333,-1.60533 -3.58333,-3.58333v-7.16667c0,-1.978 1.60533,-3.58333 3.58333,-3.58333h7.16667c1.978,0 3.58333,1.60533 3.58333,3.58333v7.16667c0,1.978 -1.60533,3.58333 -3.58333,3.58333zM86,100.33333v0c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667v-21.5c0,-3.956 3.21067,-7.16667 7.16667,-7.16667v0c3.956,0 7.16667,3.21067 7.16667,7.16667v21.5c0,3.956 -3.21067,7.16667 -7.16667,7.16667z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 15px center no-repeat #fff;
}
.toast.warning .background {
  background: rgba(255, 157, 51, 0.2);
}

.close-toast {
  position: absolute;
  cursor: pointer;
  right: 18px;
  background: none;
  transform: rotate(45deg);
  font-size: 24px;
  z-index: 3;
}

.undo {
  z-index: 3;
  cursor: pointer;
  position: absolute;
  right: 18px;
  font-size: 14px;
}

.fade-leave-active,
.fade-enter-active {
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-move {
  transition: transform 0.5s ease;
}
/* Адаптация */
/* @media (max-width: 425px) {
  .toast-list {
    min-width: 300px;
    max-width: 400px;
  }
} */
</style>
