import { ref, watch } from 'vue'

import api from './api'
import router from '../router/index.js'
import { useToast } from './toast.js'

const { toast } = useToast()

const user = ref<{ data }>({
  data: {
    name: '...'
  }
})
let hookCallbacks: Function[] = [() => null]
const onChange = callback => {
  hookCallbacks = [...hookCallbacks, callback]
}

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    console.error(error)
    return {}
  }
}

const loaded = ref(false)

export const useAuth = () => {
  const logged = () => {
    if (Object.entries(user.value.data).length === 1) {
      if (
        localStorage.getItem('access_token') != null ||
        sessionStorage.getItem('access_token') != null
      ) {
        if (getUser()) {
          return true
        }
      }
      return false
    }
    return true
  }

  const getUser = async (force = false) => {
    if (!force && loaded.value) {
      return user
    }

    const { data } = await api.asyncGet('/api/user', null, true)
    user.value = data
    loaded.value = true

    return user
  }

  const reloadUser = () => {
    api.requestGet(
      '/api/user',
      {},
      response => {
        user.value = response.data
      },
      () => {},
      true
    )
  }

  const setUser = (payload, remember = true) => {
    if (remember) localStorage.setItem('access_token', payload.access_token)
    else sessionStorage.setItem('access_token', payload.access_token)

    api.defaults.headers.common.Authorization =
      'Bearer' + ' ' + payload.access_token
  }

  const logout = () => {
    if (
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')
    ) {
      api.requestPost('/api/sanctum/logout', {}, () => null, () => null, true)
      localStorage.removeItem('access_token')
      sessionStorage.removeItem('access_token')
    }
    user.value.data = {
      name: '...'
    }
    loaded.value = false
    toast({ message: 'Вы вышли из системы!' })
    router.push('/')
    return true
  }

  return {
    user,
    loaded,
    getUser,
    setUser,
    logged,
    logout,
    reloadUser,
    onChange
  }
}
