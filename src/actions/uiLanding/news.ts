import api from '../../modules/api'
import { INews } from '../../types/news'
import { Paginator } from '../../types/request'

export const getNewsData = async (newsID: string) =>
   await api.asyncGet(`/api/v1/articles/${newsID}`)

export const getNewsList = async (newsAlias: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<INews[]>>(
      '/api/v1/articles',
      {
        alias_category: newsAlias,
        ...filters,
      },
      true
    )
  ).data
}
