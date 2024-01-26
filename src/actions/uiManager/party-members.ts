import api from '@/modules/api'
import { IPartyMember } from '@/types/party-member'
import { Paginator } from '@/types/request'

export const getPartyMembersList = async (status: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<IPartyMember[]>>(
      '/api/v1/admin/parties/memberships',
      {
        status: status,
        ...filters,
      },
      true
    )
  ).data
}

export const postNewPartyMember = (data: IPartyMember) =>
  api.asyncPost('/api/v1/admin/parties/memberships', data)