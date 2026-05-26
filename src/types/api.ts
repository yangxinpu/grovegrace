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
  readTime: number
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
}

/** 文章详情 */
export interface ArticleDetail extends Article {
  relatedArticles: Article[]
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
