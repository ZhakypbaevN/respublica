import api from '@/modules/api'

export const postAlbom = (data: FormData) =>
  api.asyncPost(`/api/v1/admin/galleries/albums`, data)

export const putAlbom = (albomID: number, data: any) =>
  api.asyncPut(`/api/v1/admin/galleries/albums/${albomID}`, data)

export const postAlbomImage = (albomID: number, data: FormData) =>
  api.asyncPost(`/api/v1/admin/galleries/albums/${albomID}/images`, data)

export const deleteAlbom = (albomID: number) =>
  api.asyncDelete(`/api/v1/admin/galleries/albums/${albomID}`)