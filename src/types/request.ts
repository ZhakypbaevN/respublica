interface PaginatorLinks {
  url: string | null
  active: boolean
  label: string
}

export interface Paginator<T = any> {
  data: T
  meta: {
    current_page: number
    from: number
    last_page: number
    links: PaginatorLinks[]
    path: string
    per_page: number
    to: number
    total: number
  }
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
}
