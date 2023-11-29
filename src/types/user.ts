import { Status, LaravelBoolean, Gender, LaravelFile } from '.'

export interface IUser {
  id: number
  first_name: string,
  last_name: string,
  middle_name?: string,
  iin: string,
  phone: string,
  email?: string,
  role: string
}