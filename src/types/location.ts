export interface ILocation {
  id: number
  level: string,
  name: string,
  parent?: ILocation,
  parent_id?: number,
  childrens?: ILocation[],
  ticket_prefix: string
}