import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, BookOpen, User, Quote } from 'lucide-react'
import { getQuoteDetail } from '@/api/quote.service'
import type { QuoteDetail } from '@/types/api'
import { formatDate } from '@/utils'
import { useAppStore } from '@/stores'

const CATEGORY_LABELS: Record<string, string> = {
  philosophy: '哲学',
  literature: '文学',
  science: '科学',
  life: '人生',
  wisdom: '智慧',
}

export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useAppStore()
  const [detail, setDetail] = useState<QuoteDetail | null>(null)

  useEffect(() => {
    async function fetchDetail(quoteId: number) {
      showLoading()
      try {
        const res = await getQuoteDetail(quoteId)
        if (res.code === 20000 && res.data) {
          setDetail(res.data)
        }
      } catch (error) {
        console.error('获取名言详情失败:', error)
      } finally {
        hideLoading()
      }
    }

    if (id) {
      fetchDetail(Number(id))
    }
  }, [id, showLoading, hideLoading])

  if (!detail) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">名言不存在</h1>
          <button
            onClick={() => navigate('/quote')}
            className="text-primary hover:underline"
          >
            返回名言列表
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/quote')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回名言列表</span>
        </button>

        <article className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/50">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Quote className="w-10 h-10 text-primary" />
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {CATEGORY_LABELS[detail.category] || detail.category}
              </span>
            </div>

            <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground mb-6">
              "{detail.content}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-foreground">{detail.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>《{detail.source}》</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(detail.createdAt, { monthFormat: 'long' })}</span>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                名言故事
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {detail.story}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                背景介绍
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {detail.background}
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}
