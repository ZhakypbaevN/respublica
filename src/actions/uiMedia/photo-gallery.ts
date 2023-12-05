import api from '@/modules/api'
import { IAlbom, IAlbomImage } from '@/types/photo-gallery'
import { Paginator } from '@/types/request'

export const getAlbomList = async () =>
  await api.asyncGet<Paginator<IAlbom[]>>('/api/v1/galleries/albums?offset=0&limit=1000')

export const getAlbomImagesList = async (albomID) =>
  await api.asyncGet<Paginator<IAlbomImage[]>>(`/api/v1/galleries/albums/${albomID}/images?offset=0&limit=1000`)

export const postAlbomImage = (albomID: number, data: FormData) =>
  api.asyncPost(`/api/v1/admin/galleries/albums/${albomID}/images`, data)