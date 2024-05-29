import { ILocation } from "./location"
import { IUser } from "./users"

export interface IPartyMember {
  id: number,
  user_id: number,
  location_id: number,
  user: IUser,
  ticket_number: string,
  street: string,
  status: string,
  specialty?: string,
  social_status?: string,
  reason_revoke?: string,
  workplace?: string,
  position?: string,
  join_date: string,
  education?: string,
  gender?: string,
  birth_date?: string,
  apartment?: string,
  house: string,
  is_unemployed: boolean,
  is_pensioner: boolean,
  is_on_childcare_leave: boolean,
  is_disabled: boolean,
  location: ILocation
}

export interface PartyMembersValues {
  tableValues: IPartyMember[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}