const loading = () => (el, binding) => {
  if (binding.value) {
    el.classList.add('state-loading')
    el.setAttribute('disabled', '')
  } else {
    el.classList.remove('state-loading')
    el.removeAttribute('disabled')
  }
}

export default loading
