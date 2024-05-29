import api from '@/modules/api'
import { IPartyMember } from '@/types/party-member'
import { IPartyResignation } from '@/types/party-resignations'

export const getPartyData = async () =>
  (await api.asyncGet<IPartyMember>(`/api/v1/parties/memberships`)).data

export const getRequestExitParty = async () =>
  (await api.asyncGet<IPartyResignation>(`/api/v1/parties/memberships/resignation`, null, true)).data

export const postJoinParty = (data: any) =>
  api.asyncPost('/api/v1/parties/memberships', data)

export const postRequestExitParty = (reason: string, data: FormData) =>
  api.asyncPost(`/api/v1/parties/memberships/resignation?reason_for_resignation=${reason}`, data)