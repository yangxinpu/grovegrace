import { http, HttpResponse, delay } from 'msw'
import { createMockQuoteList } from '../fakers'

const BASE_URL = '/api'

const quoteList = createMockQuoteList(20)

export const quoteHandlers = [
  http.get(`${BASE_URL}/quotes/latest`, async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit')) || 5

    const latestQuotes = quoteList
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: latestQuotes,
    })
  }),

  http.get(`${BASE_URL}/quotes`, async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const category = url.searchParams.get('category')

    let filtered = quoteList
    if (category) {
      filtered = filtered.filter((q) => q.category === category)
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedList = filtered.slice(start, end)

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

  http.get(`${BASE_URL}/quotes/:id`, async ({ params }) => {
    await delay(200)

    const id = Number(params.id)
    const quote = quoteList.find((q) => q.id === id)

    if (!quote) {
      return HttpResponse.json(
        { code: 40400, message: '请求资源不存在', data: null },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      code: 20000,
      message: '请求成功',
      data: quote,
    })
  }),
]
