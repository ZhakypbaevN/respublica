// Collapse animation directive
export default {
  mounted: (el, { value, modifiers }) => {
    if (value !== false) {
      const parent = el.parentNode
      const wrapper = document.createElement('div')
      parent.replaceChild(wrapper, el)
      wrapper.appendChild(el)
      wrapper.style.transition = 'all .4s ease'
      wrapper.style.overflow = 'hidden'
      wrapper.style.color = 'inherit'
      if (modifiers.horizontal) {
        const elWidth = wrapper.clientWidth
        wrapper.style.width = '0px'
        setTimeout(() => {
          wrapper.style.width = elWidth + 'px'
        })
        setTimeout(() => {
          wrapper.style.width = 'max-content'
          wrapper.style.overflow = 'visible'
        }, 400)
      } else {
        const elHeight = wrapper.clientHeight
        wrapper.style.height = '0px'
        setTimeout(() => {
          wrapper.style.height = elHeight + 'px'
        })
        setTimeout(() => {
          wrapper.style.height = 'max-content'
          wrapper.style.overflow = 'visible'
        }, 400)
      }
    }
  },
  unmounted: (el, { value, modifiers }) => {
    if (value !== false) {
      const parent = el.parentNode
      parent.replaceWith(...parent.childNodes)
      if (modifiers.horizontal) {
        const elWidth = el.clientWidth
        el.style.width = elWidth + 'px'
        setTimeout(() => {
          el.style.width = '0px'
        })
        el.style.paddingLeft = '0px'
        el.style.paddingRight = '0px'
      } else {
        const elHeight = el.clientHeight
        el.style.height = elHeight + 'px'
        setTimeout(() => {
          el.style.height = '0px'
        })
        el.style.paddingTop = '0px'
        el.style.paddingBottom = '0px'
      }
    }
  }
}
