import { get } from '../https'
import type { News, NewsDetail, Category, PaginatedResponse, ApiResponse } from '@/types/api'

export const getNewsCategories = async (): Promise<ApiResponse<Category[]>> => 
  get<Category[]>('/news/categories')

export const getNewsList = async (params?: { 
  page?: number
  pageSize?: number
  category?: string
}): Promise<ApiResponse<PaginatedResponse<News>>> => 
  get<PaginatedResponse<News>>('/news', params as Record<string, unknown>)

export const getTopNews = async (params?: { limit?: number }): Promise<ApiResponse<News[]>> => 
  get<News[]>('/news/top', params as Record<string, unknown>)

export const getNewsById = async (id: number): Promise<ApiResponse<News>> => 
  get<News>(`/news/${id}`)

export const getNewsDetail = async (id: number): Promise<ApiResponse<NewsDetail>> => 
  get<NewsDetail>(`/news/${id}/detail`)

export const getHotNews = async (params?: { limit?: number }): Promise<ApiResponse<News[]>> => 
  get<News[]>('/news/hot', params as Record<string, unknown>)
