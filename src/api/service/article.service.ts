import { get } from '../https'
import type { Article, ArticleDetail, Category, PaginatedResponse, ApiResponse } from '@/types/api'

export const getArticleCategories = async (): Promise<ApiResponse<Category[]>> => 
  get<Category[]>('/articles/categories')

export const getLatestArticles = async (params?: { limit?: number }): Promise<ApiResponse<Article[]>> => 
  get<Article[]>('/articles/latest', params as Record<string, unknown>)

export const getArticleList = async (params?: { 
  page?: number
  pageSize?: number
  category?: string
  keyword?: string
}): Promise<ApiResponse<PaginatedResponse<Article>>> => 
  get<PaginatedResponse<Article>>('/articles', params as Record<string, unknown>)

export const getArticleById = async (id: number): Promise<ApiResponse<Article>> => 
  get<Article>(`/articles/${id}`)

export const getArticleDetail = async (id: number): Promise<ApiResponse<ArticleDetail>> => 
  get<ArticleDetail>(`/articles/${id}/detail`)
