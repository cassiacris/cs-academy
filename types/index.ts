export interface Course {
  id: string
  slug: string
  title: string
  description: string
  thumbnail_url: string
  total_lessons: number
  total_duration: number
  modules?: Module[]
  progress?: number
  has_free_preview?: boolean
  purchase_url?: string
  price?: string
}

export interface Module {
  id: string
  course_id: string
  title: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  youtube_url: string
  duration_minutes: number
  order: number
  description: string
  completed?: boolean
  is_free?: boolean
}


export interface Material {
  id: string
  title: string
  description: string
  category: string
  file_url: string
  type: 'pdf' | 'video' | 'audio' | 'link'
  created_at: string
}

export interface FeedPost {
  id: string
  content: string
  image_url?: string
  created_at: string
  author_name: string
  author_avatar?: string
  likes_count: number
  liked_by_user?: boolean
  comments: FeedComment[]
}

export interface FeedComment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  user_name: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  created_at: string
  source: 'hotmart' | 'hubla' | 'kiwify' | 'manual'
}

export interface Student {
  id: string
  name: string
  email: string
  created_at: string
  enrollments: Enrollment[]
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar_url?: string
  role: 'student' | 'admin'
  created_at: string
}
