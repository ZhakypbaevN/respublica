export interface ITicketNumber {
  id: number,
  ticket_number: string
}

export interface ITicketNumbersValues {
  tableValues: ITicketNumber[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}