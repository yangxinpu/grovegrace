import { quoteHandlers } from './handlers/quote.handler'
import { articleHandlers } from './handlers/article.handler'
import { newsHandlers } from './handlers/news.handler'

export const handlers = [...quoteHandlers, ...articleHandlers, ...newsHandlers]
