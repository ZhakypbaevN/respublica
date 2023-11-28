import api from '@/modules/api'
import { IApllication } from '@/types/application'
import { Paginator } from '@/types/request'

export const getApplications = async (filters: any) => {
  return (
    await api.asyncGet<Paginator<IApllication[]>>(
      '/api/payouts',
      filters,
      true
    )
  ).data
}

export const setApplications = (data) =>
  api.asyncPost('/api/payouts', data)

export const postApplication = (data) =>
  api.asyncPost('/api/payouts/school', data)

export const putApplication = (id, data) =>
  api.asyncPut(`/api/payouts/${id}/school`, data)

// -------------- Helpers --------------
export const getSchoolIncome = (schoolId) =>
  api.asyncGet('/api/school-income/balance', { school_id: schoolId }, true)
