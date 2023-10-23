export type LaravelFile = {
  created_at: string
  id: number
  link: string
  name: string
  type: 'user_photo' | string
}

export type LaravelBoolean = 1 | 0

export type Status = 'accepted' | 'rejected' | 'published' | 'draft'

export type Gender = 'male' | 'female'

// export type Role = 'admin' | 'superadmin' | 'teacher' | 'student'
