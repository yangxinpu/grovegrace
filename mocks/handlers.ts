import { quoteHandlers } from './handlers/quote.handler'
import { articleHandlers } from './handlers/article.handler'
import { speakingHandlers } from './handlers/speaking.handler'

export const handlers = [...quoteHandlers, ...articleHandlers, ...speakingHandlers]
