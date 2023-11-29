import api from '@/modules/api'
import { IUser } from '@/types/user'
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
