const clickOutside = () => {
  return {
    mounted ({ el, binding, vnode }: {  el: any; binding: any, vnode: any }) {
      el.clickOutsideEvent = function ({event}: {event: any}) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted ({el}: {el: any}) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}

export default clickOutside
