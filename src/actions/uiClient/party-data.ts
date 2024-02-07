import api from '@/modules/api'

export const postJoinParty = (data: any) =>
  api.asyncPost('/api/v1/parties/memberships', data)