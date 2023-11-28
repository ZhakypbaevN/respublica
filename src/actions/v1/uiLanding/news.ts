import api from '../../../modules/api'
import { INews } from '../../../types/news'
import { Paginator } from '../../../types/request'

export const getNews = async (newsAlias: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<INews[]>>(
      '/api/v1/articles',
      {
        category_alias: newsAlias,
        ...filters,
      },
      true
    )
  ).data
}
