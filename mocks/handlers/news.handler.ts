import { http, HttpResponse, delay } from 'msw'
import { createMockNewsList, NEWS_CATEGORIES } from '@mocks/fakers/news.faker'

const BASE_URL = '/api'

const newsList = createMockNewsList(11)

export const newsHandlers = [
  http.get(`${BASE_URL}/news/categories`, async () => {
    await delay(200)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: NEWS_CATEGORIES,
    })
  }),

  http.get(`${BASE_URL}/news`, async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const category = url.searchParams.get('category')

    let filtered = newsList

    if (category) {
      filtered = filtered.filter((n) => n.category === category)
    }

    const sorted = filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedList = sorted.slice(start, end)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: {
        list: paginatedList,
        total: filtered.length,
        page,
        pageSize,
      },
    })
  }),

  http.get(`${BASE_URL}/news/top`, async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit')) || 3

    const topNews = newsList
      .filter((n) => n.isTop)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: topNews,
    })
  }),

  http.get(`${BASE_URL}/news/hot`, async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit')) || 5

    const hotNews = newsList
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: hotNews,
    })
  }),

  http.get(`${BASE_URL}/news/:id`, async ({ params }) => {
    await delay(200)

    const id = Number(params.id)
    const news = newsList.find((n) => n.id === id)

    if (!news) {
      return HttpResponse.json(
        { code: 40400, message: '请求资源不存在', data: null },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: news,
    })
  }),

  http.get(`${BASE_URL}/news/:id/detail`, async ({ params }) => {
    await delay(200)

    const id = Number(params.id)
    const news = newsList.find((n) => n.id === id)

    if (!news) {
      return HttpResponse.json(
        { code: 40400, message: '请求资源不存在', data: null },
        { status: 404 }
      )
    }

    const relatedNews = newsList
      .filter((n) => n.id !== id && n.category === news.category)
      .slice(0, 4)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: {
        ...news,
        relatedNews,
      },
    })
  }),
]
