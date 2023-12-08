import axios, { AxiosInstance, AxiosResponse } from 'axios'
// import { useI18n } from 'vue-i18n'

import { useToast } from '@/modules/toast'
import { useAuth } from '@/modules/auth'

// const { t } = useI18n()
const { toast } = useToast()
const { logout } = useAuth()

type Request = <T = any>(
  url: string,
  data: object,
  callbackSuccess: (response: T) => void,
  callbackError: (response: T) => void,
  muteError: boolean
) => void

type AsyncRequest = <T extends any>(
  url: string,
  data?: object,
  mute?: boolean
) => Promise<AxiosResponse<T>>

interface Api extends AxiosInstance {
  requestGet?: Request
  requestPost?: Request
  requestPut?: Request
  requestPatch?: Request
  requestDelete?: Request
  asyncGet?: AsyncRequest
  asyncPost?: AsyncRequest
  asyncPut?: AsyncRequest
  asyncPatch?: AsyncRequest
  asyncDelete?: AsyncRequest
  asyncGetBlob?: <T extends Blob>(
    url: string,
    data?: object,
    mute?: boolean
  ) => Promise<AxiosResponse<T>>
}

const api: Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
const request = function (
  httpType: string,
  url: string,
  data: object,
  callbackSuccess: (response: any) => any,
  callbackError: (response: any) => any,
  muteError: boolean
) {
  if (httpType === 'get') {
    data = { params: data }
  }

  api[httpType](url, data)
    .then(function (response) {
      if (response.data.message) {
        toast({
          message: response.data.message,
          type: 'success'
        })
      }

      try {
        callbackSuccess(response)
      } catch (err) {
        console.error(err)
      }
    })
    .catch(function (error) {
      if (error.response.status === 401) logout()

      if (!muteError) {
        if (!error.response) {
          // toast({
          //   message: t('message.request-error-please-check-if-you-are-connected-to-the-internet'),
          //   type: 'danger'
          // })
        } else if (error.response.status === 500) {
          // toast({
          //   message: t('message.server-error'),
          //   type: 'danger'
          // })
        } else if (typeof error.response.data.errors === 'object') {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            toast({
              message: `${key}: ${value}`,
              type: 'danger'
            })
          })
        } else if (error.response.data.message) {
          toast({
            message: error.response.data.message,
            type: 'danger'
          })
        } else if (error.response.data.errors) {
          if (Array.isArray(error.response.data.errors)) {
            error.response.data.errors.forEach((message) => {
              toast({
                message: message,
                type: 'danger'
              })
            })
          }
        } else {
          // toast({
          //   message: t('message.an-error-occurred-during-the-request-please-try-again-later'),
          //   type: 'danger'
          // })
        }
      }

      callbackError(error)
    })
}

if (localStorage.getItem('access_token') != null) {
  console.log('localStorage.getItem()', localStorage.getItem('access_token'));
  api.defaults.headers.common.Authorization =
    'Bearer' + ' ' + localStorage.getItem('access_token')

  api.defaults.headers.common['Accept-Language'] = localStorage.getItem('lang-respublica') == 'kz' ? 'kz-KZ' : 'ru-RU'
} else if (sessionStorage.getItem('access_token') != null) {
  api.defaults.headers.common.Authorization =
    'Bearer' + ' ' + sessionStorage.getItem('access_token')
  api.defaults.headers.common['Accept-Language'] = localStorage.getItem('lang-respublica') == 'kz' ? 'kz-KZ' : 'ru-RU'
}

api.requestGet = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false
) {
  request('get', url, data, callbackSuccess, callbackError, muteError)
}
api.requestPost = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false
) {
  request('post', url, data, callbackSuccess, callbackError, muteError)
}
api.requestPut = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false
) {
  request('put', url, data, callbackSuccess, callbackError, muteError)
}
api.requestPatch = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false
) {
  request('patch', url, data, callbackSuccess, callbackError, muteError)
}
api.requestDelete = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false
) {
  request('delete', url, data, callbackSuccess, callbackError, muteError)
}

api.asyncGet = (url, data = {}, mute = false) => {
  return new Promise((resolve, reject) => {
    api.requestGet(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute
    )
  })
}
api.asyncPost = (url, data = {}, mute = false) => {
  return new Promise((resolve, reject) => {
    api.requestPost(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute
    )
  })
}
api.asyncPut = (url, data = {}, mute = false) => {
  return new Promise((resolve, reject) => {
    api.requestPut(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute
    )
  })
}
api.asyncPatch = (url, data = {}, mute = false) => {
  return new Promise((resolve, reject) => {
    api.requestPatch(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute
    )
  })
}
api.asyncDelete = (url, data = {}, mute = false) => {
  return new Promise((resolve, reject) => {
    api.requestDelete(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute
    )
  })
}
api.asyncGetBlob = (url, data = {}) => {
  return api.get(url, {
    responseType: 'blob',
    data
  })
}

export default api

export const apiUrl = import.meta.env.VITE_API_URL

export const appUrl = import.meta.env.VITE_URL

export const isDevelopment = import.meta.env.NODE_ENV === 'development'
