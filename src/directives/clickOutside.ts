const clickOutside = () => {
  return {
    mounted (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}

export default clickOutside
