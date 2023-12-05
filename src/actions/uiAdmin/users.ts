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

export const postUser = (data: FormData) =>
  api.asyncPost('/api/v1/admin/users', data)

export const putUser = (data: FormData) =>
  api.asyncPost('/api/v1/admin/users/me', data)
