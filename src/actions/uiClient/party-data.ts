import api from '@/modules/api'

export const postJoinParty = (data: FormData) =>
  api.asyncPost('/api/v1/parties/memberships', data)