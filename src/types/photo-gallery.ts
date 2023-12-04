import { LaravelFile } from '.'

export interface IAlbom {
  id: number,
  title: string,
  place: string,
  date: string,
  preview_image: LaravelFile
}

export interface IAlbomImage {
  id: number,
  album_id: number,
  preview_image: LaravelFile
}

export interface AlbomValues {
  tableValues: IAlbom[],
  total: number,
  isEmpty: boolean
}

export interface AlbomImagesValues {
  tableValues: IAlbomImage[],
  total: number,
  isEmpty: boolean
}