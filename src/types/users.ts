import { Status, LaravelBoolean, Gender } from '.'

export interface IUser {
  id?: number
  first_name: string,
  last_name: string,
  middle_name?: string,
  iin?: string,
  phone?: string,
  email?: string,
  role?: string,
  password?: string,
  is_deleted?: boolean
}

export interface UsersValues {
  tableValues: IUser[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}