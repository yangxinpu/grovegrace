/** 名言 */
export interface Quote {
  id: number
  content: string
  author: string
  source: string
  category: 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom' | 'love' | 'friendship' | 'success' | 'courage' | 'education' | 'nature' | 'art' | 'history'
  detailId: number
  background?: string
  createdAt: string
}

/** 名言详情 */
export interface QuoteDetail {
  id: number
  quoteId: number
  content: string
  author: string
  source: string
  category: 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom' | 'love' | 'friendship' | 'success' | 'courage' | 'education' | 'nature' | 'art' | 'history'
  authorBio: string
  story: string
  background: string
  createdAt: string
}

/** 名言分类 */
export interface Category {
  value: string
  label: string
}

/** 文章 */
export interface Article {
  id: number
  title: string
  summary: string
  content: string
  author: string
  category: 'technology' | 'philosophy' | 'literature' | 'science' | 'life' | 'wisdom' | 'art' | 'history'
  cover?: string
  tags: string[]
  likeCount: number
  createdAt: string
  updatedAt: string
}

/** 文章详情 */
export interface ArticleDetail extends Article {
  relatedArticles: Article[]
}

/** 口语练习书本 */
export interface SpeakingBook {
  id: number
  title: string
  description: string
  cover?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: 'daily' | 'business' | 'travel' | 'academic' | 'social'
  articleCount: number
  duration: number
  rating: number
  createdAt: string
}

/** 口语练习文章 */
export interface SpeakingArticle {
  id: number
  bookId: number
  title: string
  content: string
  translation: string
  audioUrl?: string
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  keywords: string[]
  tips: string[]
  order: number
  createdAt: string
}

/** 书本详情 */
export interface SpeakingBookDetail extends SpeakingBook {
  articles: SpeakingArticle[]
}

/** 分页响应结构 */
export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 统一 API 响应结构 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
