export interface IComment {
  id: number,
  user_id: number,
  text: string,
  created_at: string,
}

export interface CommentsValues {
  tableValues: IComment[],
  total: number,
  isEmpty: boolean,
  searchEmpty: boolean
}