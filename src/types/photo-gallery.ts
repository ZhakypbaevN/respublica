export interface IAlbom {
  id: number,
  title: string,
  place: string,
  date: string,
  preview_image: string
}

export interface IAlbomImage {
  id: number,
  album_id: number,
  preview_image: string
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