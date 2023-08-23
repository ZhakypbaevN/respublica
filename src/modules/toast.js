import { ref } from 'vue'

const toastList = ref([])

export const useToast = () => {
  const toast = (params = {}) => {
    const toastParams = {
      id: Math.random() * 10000000000000000,
      message: params.message ?? 'Example text toast!',
      type: params.type ?? 'default',
      duration: params.duration ?? 5000,
      undo: params.undo ?? null
    }

    if (toastParams.duration !== 0) {
      setTimeout(function () {
        remove(toastParams.id)
      }, toastParams.duration)
    }
    for (const toast of toastList.value) {
      if (toastParams.message === toast.message) {
        const index = toastList.value.indexOf(toast)
        toastList.value.splice(index, 1)
      }
    }
    toastList.value.push({ ...toastParams })
  }

  const remove = removeId => {
    // console.log('toastList', toastList.value)
    // console.log('removeid:', removeId);
    toastList.value = toastList.value.filter(({ id }) => id !== removeId)
  }

  return {
    toastList,
    toast,
    remove
  }
}
