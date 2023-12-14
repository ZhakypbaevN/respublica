export interface INews {
  id?: number,
  title?: string,
  preview_text?: string,
  content?: string,
  published: boolean,
  created_at: string,
  preview_image?: any,
  source_title?: string,
  source_url?: string,
  views_count?: number
}

export interface NewsValues {
  tableValues: INews[],
  total: number,
  isEmpty: boolean,
  searchEmpty: boolean
}