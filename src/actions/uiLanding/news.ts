import api from '@/modules/api'
import { INews } from '@/types/news'
import { IComment } from '@/types/comments'
import { Paginator, Request } from '@/types/request'

export const getNewsData = async (newsID: string) =>
   await api.asyncGet<Request<INews>>(`/api/v1/articles/${newsID}`)

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

export const getCommentsList = async (newsID: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<IComment[]>>(
      `/api/v1/articles/${newsID}/comments`,
      {
        ...filters,
      },
      true
    )
  ).data
}

export const postComment = async (newsID: string, comment: string) =>
  await api.asyncPost<Request<IComment>>(
    `/api/v1/articles/${newsID}/comments`,
    {
      "text": comment
    }
  )