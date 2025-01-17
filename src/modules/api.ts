import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { useToast } from '@/modules/toast'
import { useAuth } from '@/modules/auth'

import { getLangForURL } from '@/assets/lang/exports'
import { languages } from '@/assets/lang/exports'
import i18n from '@/assets/lang'

type Request = <T = any>(
  url: string,
  data: object,
  callbackSuccess: (response: T) => void,
  callbackError: (response: T) => void,
  muteError: boolean,
  lang: string,
  accept: string
) => void

type AsyncRequest = <T extends any>(
  url: string,
  data?: object,
  mute?: boolean,
  lang?: string,
  accept?: string
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
    mute?: boolean,
    lang?: string,
    accept?: string
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
  muteError: boolean,
  lang: string,
  accept: string
) {
  if (httpType === 'get') data = { params: data }
  api.defaults.headers.common['Accept-Language'] = lang;

  api[httpType](url, data)
    .then(function (response) {
      try {
        callbackSuccess(response)
      } catch (err) {
        console.error(err)
      }
    })
    .catch(function (error) {
      const { toast } = useToast()
      const { logout } = useAuth()
      const userType = localStorage.getItem('USER_TYPE');
      if (error.response.status === 401 && userType) logout()

      if (!muteError) {
        if (!error.response) {
          toast({
            message: languages[i18n.global.locale.value].message['request-error-please-check-if-you-are-connected-to-the-internet'],
            type: 'danger'
          })
        } else if (error.response.status === 500) {
          toast({
            message: languages[i18n.global.locale.value].message['server-error'],
            type: 'danger'
          })
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
          toast({
            message: languages[i18n.global.locale.value].message['an-error-occurred-during-the-request-please-try-again-later'],
            type: 'danger'
          })
        }
      }

      callbackError(error)
    })
}

if (localStorage.getItem('access_token') != null) {
  api.defaults.headers.common.Authorization =
    'Bearer' + ' ' + localStorage.getItem('access_token')
} else {
  api.defaults.headers.common.Authorization = null;
}

api.requestGet = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false,
  lang,
  accept
) {
  request('get', url, data, callbackSuccess, callbackError, muteError, lang, accept)
}
api.requestPost = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false,
  lang,
  accept
) {
  request('post', url, data, callbackSuccess, callbackError, muteError, lang, accept)
}
api.requestPut = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false,
  lang,
  accept
) {
  request('put', url, data, callbackSuccess, callbackError, muteError, lang, accept)
}
api.requestPatch = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false,
  lang,
  accept
) {
  request('patch', url, data, callbackSuccess, callbackError, muteError, lang, accept)
}
api.requestDelete = function (
  url,
  data = {},
  callbackSuccess = function () {},
  callbackError = function () {},
  muteError = false,
  lang,
  accept
) {
  request('delete', url, data, callbackSuccess, callbackError, muteError, lang, accept)
}

api.asyncGet = (url, data = {}, mute = false, lang = getLangForURL(), accept = 'application/json, text/plain, */*') => {
  return new Promise((resolve, reject) => {
    api.requestGet(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute,
      lang,
      accept
    )
  })
}
api.asyncPost = (url, data = {}, mute = false, lang = getLangForURL(), accept = 'application/json, text/plain, */*') => {
  return new Promise((resolve, reject) => {
    api.requestPost(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute,
      lang,
      accept
    )
  })
}
api.asyncPut = (url, data = {}, mute = false, lang = getLangForURL(), accept = 'application/json, text/plain, */*') => {
  return new Promise((resolve, reject) => {
    api.requestPut(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute,
      lang,
      accept
    )
  })
}
api.asyncPatch = (url, data = {}, mute = false, lang = getLangForURL(), accept = 'application/json, text/plain, */*') => {
  return new Promise((resolve, reject) => {
    api.requestPatch(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute,
      lang,
      accept
    )
  })
}
api.asyncDelete = (url, data = {}, mute = false, lang = getLangForURL(), accept = 'application/json, text/plain, */*') => {
  return new Promise((resolve, reject) => {
    api.requestDelete(
      url,
      data,
      (response) => resolve(response),
      (error) => reject(error),
      mute,
      lang,
      accept
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
