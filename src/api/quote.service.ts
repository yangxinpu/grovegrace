import { get } from './https'
import type { Quote, PaginatedResponse, ApiResponse } from '@/types/api'

export async function getLatestQuotes(params?: {
  limit?: number
}): Promise<ApiResponse<Quote[]>> {
  return get<Quote[]>('/quotes/latest', params as Record<string, unknown>)
}

export async function getQuoteList(params?: {
  page?: number
  pageSize?: number
  category?: string
}): Promise<ApiResponse<PaginatedResponse<Quote>>> {
  return get<PaginatedResponse<Quote>>('/quotes', params as Record<string, unknown>)
}

export async function getQuoteById(id: number): Promise<ApiResponse<Quote>> {
  return get<Quote>(`/quotes/${id}`)
}
