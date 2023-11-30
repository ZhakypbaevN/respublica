import { ILocation } from "./location"
import { IPartyMember } from "./party-member"
import { IUser } from "./user"

export interface IPartyResignation {
  id: number,
  membership: IPartyMember,
  user: IUser,
  status: string
}

export interface PartyResignationsValues {
  tableValues: IPartyResignation[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}