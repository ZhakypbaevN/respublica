import api from '@/modules/api'
import { IPartyMember } from '@/types/party-member'

export const postJoinParty = (data: FormData) =>
  api.asyncPost('/api/v1/parties/memberships', data)