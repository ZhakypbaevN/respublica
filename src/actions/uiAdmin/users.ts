import api from '@/modules/api'
import { IUser } from '@/types/users'
import { Paginator } from '@/types/request'

export const getUsersList = async (filters: any) => {
  return (
    await api.asyncGet<Paginator<IUser[]>>(
      '/api/v1/admin/users',
      {
        ...filters,
      },
      true
    )
  ).data
}

export const postUser = async (data: FormData) => {
  return (
    await api.asyncPost<IUser>('/api/v1/admin/users', data)
  ).data
}

export const putUser = async (userID: number, data: FormData) => {
  return (
    await api.asyncPut(`/api/v1/admin/users/${userID}`, data)
  ).data
}
