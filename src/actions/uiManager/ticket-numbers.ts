import api from '@/modules/api'
import { ITicketNumber } from '@/types/ticket-number'
import { Paginator } from '@/types/request'

export const getTicketNumbersList = async (filters: any) => {
  return (
    await api.asyncGet<Paginator<ITicketNumber[]>>(
      'api/v1/admin/parties/memberships/reserved-ticket-numbers',
      {
        ...filters,
      },
      true
    )
  ).data
}

export const postTicketNum = async (data: any) => {
  return (
    await api.asyncPost<ITicketNumber>('/api/v1/admin/parties/memberships/reserved-ticket-numbers', data)
  ).data
}

export const deleteTicketNum = (ticketNumID: number) =>
  api.asyncDelete('/api/v1/admin/parties/memberships/reserved-ticket-numbers/' + ticketNumID)