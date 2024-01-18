import { ref, watch } from 'vue'
// import { useI18n } from 'vue-i18n'

import router from '@/router/index.js'

import api from '@/modules/api'
import { useToast } from '@/modules/toast'

// const { t } = useI18n()
const { toast } = useToast()

const user = ref<{ data?: any }>({
  data: {
    name: '...'
  }
})
let hookCallbacks: Function[] = [() => null]
const onChange = callback => {
  hookCallbacks = [...hookCallbacks, callback]
}
export const getSelectedSchool = () => {
  try {
    return JSON.parse(localStorage.getItem('selected_school'))
  } catch (error) {
    return null
  }
}
export const selectedSchool = ref(getSelectedSchool())

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('USER_DATA')!)
  } catch (error) {
    console.error(error)
    return {}
  }
}

watch(
  () => selectedSchool.value,
  () => { localStorage.setItem('selected_school', JSON.stringify(selectedSchool.value)) },
  {
    deep: true
  }
)
watch(
  () => user.value,
  () => {
    hookCallbacks.forEach(callback => callback(user.value.data))
    localStorage.setItem('user', JSON.stringify(user.value.data))
    if (user.value.data?.schools?.length && selectedSchool.value?.id) {
      user.value.data.schools.forEach(school => {
        if (school.id === selectedSchool.value.id) selectedSchool.value = school
      })
    }
  },
  {
    deep: true
  }
)

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
    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('access_token')
    
    user.value.data = {
      name: '...'
    }
    loaded.value = false
    // toast({ message: t('message.you-are-logged-out') })

    if (router.currentRoute.value.name === 'Home') {
      location.reload();
    } else {
      router.push(`/`);
    }
    return true
  }

  return {
    user,
    selectedSchool,
    loaded,
    getUser,
    setUser,
    logged,
    logout,
    reloadUser,
    onChange
  }
}
