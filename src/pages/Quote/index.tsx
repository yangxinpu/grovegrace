import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Quote as QuoteIcon, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { getQuoteList, getLatestQuotes } from '@/api/quote.service'
import type { Quote as QuoteType } from '@/types/api'
import { useAppStore } from '@/stores'
import { toast } from 'sonner'
import { formatDate } from '@/utils'

/** 名言分类选项 */
const CATEGORY_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'philosophy', label: '哲学' },
  { value: 'literature', label: '文学' },
  { value: 'science', label: '科学' },
  { value: 'life', label: '人生' },
  { value: 'wisdom', label: '智慧' },
]

/** 名言列表页面 */
export default function Quote() {
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useAppStore()
  const [latestQuote, setLatestQuote] = useState<QuoteType | null>(null)
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)
  const pageSize = 6

  useEffect(() => {
    function handleScroll() {
      if (categoryRef.current) {
        const rect = categoryRef.current.getBoundingClientRect()
        const headerHeight = 56
        const isFixed = rect.top <= headerHeight + 1
        setIsSticky(isFixed)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchLatestQuote() {
      try {
        const res = await getLatestQuotes({ limit: 1 })
        if (res.code === 20000 && res.data && res.data.length > 0) {
          setLatestQuote(res.data[0])
        }
      } catch (error) {
        console.error('获取最新名言失败:', error)
        toast.error('获取最新名言失败')
      }
    }
    fetchLatestQuote()
  }, [])

  useEffect(() => {
    async function fetchQuotes() {
      showLoading()
      try {
        const res = await getQuoteList({ page, pageSize, category: category || undefined })
        if (res.code === 20000 && res.data) {
          setQuotes(res.data.list)
          setTotal(res.data.total)
        }
      } catch (error) {
        console.error('获取名言列表失败:', error)
        toast.error('获取名言列表失败，请稍后重试')
      } finally {
        hideLoading()
      }
    }
    fetchQuotes()
  }, [category, page, showLoading, hideLoading])

  /** 切换分类时重置页码 */
  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory)
    setPage(1)
  }

  /** 跳转到名言详情页 */
  function handleQuoteClick(quoteId: number) {
    navigate(`/quote/${quoteId}`)
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <section className="bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {latestQuote && (
          <header
            className="mb-12 cursor-pointer group"
            onClick={() => handleQuoteClick(latestQuote.id)}
          >
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-relaxed group-hover:text-primary transition-colors animate-fade-in">
              {latestQuote.content}
            </h1>
            <p className="text-muted-foreground text-lg text-right">
              —— {latestQuote.author}《{latestQuote.source}》
            </p>
          </header>
        )}

        <div 
          ref={categoryRef}
          className="sticky top-14 z-40 -mx-6 px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border/30 transition-all duration-500"
        >
          <div className={`flex flex-wrap gap-2 transition-all duration-500 ${isSticky ? 'justify-end' : 'justify-center'}`}>
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCategoryChange(option.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  category === option.value
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-20">
            <QuoteIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">暂无名言</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  onClick={() => handleQuoteClick(quote.id)}
                  className="group relative bg-card rounded-xl p-5 shadow-sm border border-border/50 cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium leading-relaxed group-hover:text-primary transition-colors">
                        {quote.content}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">{quote.author}</span>
                      <span className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(quote.createdAt)}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                        page === p
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
