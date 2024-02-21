import { getLangForURL } from '@/assets/lang/exports'
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

export const getPartyMembersExport = async (status: string, filters: any) => {
  return (
    await api.asyncGet(
      '/api/v1/admin/parties/memberships/export',
      {
        status: status,
        ...filters,
      },
      true,
      getLangForURL(),
      'arraybuffer'
    )
  ).data
}

export const postNewPartyMember = (data: IPartyMember) =>
  api.asyncPost('/api/v1/admin/parties/memberships', data)

export const putPartyMember = (partyMemberID: number, data: IPartyMember) =>
  api.asyncPut(`/api/v1/admin/parties/memberships/${partyMemberID}`, data)