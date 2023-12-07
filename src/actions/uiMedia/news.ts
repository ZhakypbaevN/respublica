import api from '@/modules/api'
import { INews } from '@/types/news'
import { Paginator } from '@/types/request'

export const getNewsData = async (newsID: string) =>
  await api.asyncGet<INews>(`/api/v1/admin/articles/${newsID}`)

export const postNewsData = (data: FormData) =>
  api.asyncPost('/api/v1/admin/articles', data)

export const putNewsData = (newsID: string, data: FormData) =>
  api.asyncPut(`/api/v1/admin/articles/${newsID}`, data)

export const getNewsList = async (newsAlias: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<INews[]>>(
      '/api/v1/admin/articles',
      {
        category_alias: newsAlias,
        ...filters,
      },
      true
    )
  ).data
}
