import api from '@/modules/api'
import { IPartyResignation } from '@/types/party-resignations'
import { Paginator } from '@/types/request'

export const getPartyResignationsList = async (status: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<IPartyResignation[]>>(
      '/api/v1/admin/parties/memberships/resignations',
      {
        status: status,
        ...filters,
      },
      true
    )
  ).data
}
