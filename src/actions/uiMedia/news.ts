import api from '@/modules/api'
import { IComment } from '@/types/comments'
import { INews } from '@/types/news'
import { Paginator } from '@/types/request'

export const getMediaNewsData = async (newsID: string, lang: string) =>
  await api.asyncGet<INews>(`/api/v1/admin/articles/${newsID}`, null, false, lang)

export const postMediaNewsData = async (data: FormData, lang: string) => {
  return (
    await api.asyncPost<INews>('/api/v1/admin/articles', data, false, lang)
  ).data
}

export const putMediaNewsData = (newsID: string, data: FormData, lang: string) =>
  api.asyncPut(`/api/v1/admin/articles/${newsID}`, data, false, lang)

export const deleteMediaNews = async (newsID: string) =>
  await api.asyncDelete(`/api/v1/admin/articles/${newsID}`)

export const getMediaNewsList = async (newsAlias: string, filters: any) => {
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


// Comments
export const getMediaCommentsList = async (newsID: string, filters: any) => {
  return (
    await api.asyncGet<Paginator<IComment[]>>(
      `/api/v1/admin/articles/${newsID}/comments`,
      {
        ...filters,
      },
      true
    )
  ).data
}

export const deleteMediaComment = async (newsID: string) =>
  await api.asyncDelete(`/api/v1/admin/articles/comments/${newsID}`)
