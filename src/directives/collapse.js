// Collapse animation directive
export default {
  mounted: (el, { value, modifiers }) => {
    if (value !== false) {
      el.style.transition = 'height .4s ease-in-out, opacity .3s ease-in-out'
      el.style.overflow = 'hidden'
      el.style.opacity = '0'
      
      if (modifiers.horizontal) {
        const elWidth = el.clientWidth
        el.style.width = '0px'
        setTimeout(() => {
          el.style.width = elWidth + 'px'
          el.style.opacity = '1'
        })
        setTimeout(() => {
          el.style.width = 'max-content'
          el.style.overflow = 'visible'
        }, 400)
      } else {
        const elHeight = el.clientHeight
        el.style.height = '0px'
        setTimeout(() => {
          el.style.height = elHeight + 'px'
          el.style.opacity = '1'
        })
        setTimeout(() => {
          el.style.height = 'max-content'
          el.style.overflow = 'visible'
        }, 400)
      }
    }
  },
  unmounted: (el, { value, modifiers }) => {
    if (value !== false) {
      if (modifiers.horizontal) {
        const elWidth = el.clientWidth
        el.style.width = elWidth + 'px'
        setTimeout(() => {
          el.style.width = '0px'
        })
        el.style.paddingLeft = '0px'
        el.style.paddingRight = '0px'
      } else {
        const elHeight = el.offsetHeight
        el.style.height = elHeight + 'px'
        el.style.overflow = 'hidden'
        setTimeout(() => {
          el.style.opacity = '0'
          el.style.height = '0px'
        })
      }
    }
  }
}
