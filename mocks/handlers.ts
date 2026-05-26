import { quoteHandlers } from './handlers/quote.handler'
import { articleHandlers } from './handlers/article.handler'

export const handlers = [...quoteHandlers, ...articleHandlers]
