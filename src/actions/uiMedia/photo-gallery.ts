import api from '@/modules/api'

export const postAlbom = (data: FormData) =>
  api.asyncPost(`/api/v1/admin/galleries/albums`, data)

export const postAlbomImage = (albomID: number, data: FormData) =>
  api.asyncPost(`/api/v1/admin/galleries/albums/${albomID}/images`, data)