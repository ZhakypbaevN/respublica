import { LaravelFile } from '.'

export interface INews {
  id: number
  title: string,
  preview_text?: string,
  content?: string,
  published: boolean,
  preview_image: LaravelFile
}

export interface NewsValues {
  tableValues: INews[]
  total: number
  isEmpty: boolean
  searchEmpty: boolean
}