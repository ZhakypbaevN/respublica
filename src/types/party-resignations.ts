import { IPartyMember } from "./party-member"
import { IUser } from "./users"

export interface IPartyResignation {
  id: number,
  membership: IPartyMember,
  user: IUser,
  status: string,
  
  created_at: string,
  reason_for_resignation: string,
  document: any,
  user_id: number
}

export interface IPartyResignationsValues {
  tableValues: IPartyResignation[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}

export interface IExitPartyData {
  text: string,
  document: any,
  status: string
}