import { apiUrl } from '../modules/api'

const getFileUrl = link =>
  `${apiUrl}/${link}`

export default getFileUrl