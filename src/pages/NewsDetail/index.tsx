import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Clock, 
  Eye,
  ChevronLeft,
  Share2
} from 'lucide-react'
import { getNewsDetail, getNewsCategories } from '@/api'
import type { NewsDetail, Category } from '@/types/api'
import { useAppStore } from '@/stores'
import { toast } from 'sonner'

const CATEGORY_COLORS: Record<string, string> = {
  politics: 'bg-red-500',
  economy: 'bg-blue-500',
  technology: 'bg-purple-500',
  sports: 'bg-green-500',
  entertainment: 'bg-pink-500',
  health: 'bg-teal-500',
  science: 'bg-indigo-500',
  world: 'bg-orange-500',
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useAppStore()
  const [news, setNews] = useState<NewsDetail | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const getCategoryLabel = (value: string) => {
    const category = categories.find(c => c.value === value)
    return category?.label || value
  }

  useEffect(() => {
    async function fetchNewsDetail() {
      if (!id) return
      
      showLoading()
      try {
        const [categoriesRes, detailRes] = await Promise.all([
          getNewsCategories(),
          getNewsDetail(Number(id))
        ])

        if (categoriesRes.code === 20000 && categoriesRes.data) {
          setCategories(categoriesRes.data)
        }

        if (detailRes.code === 20000 && detailRes.data) {
          setNews(detailRes.data)
        } else {
          toast.error('新闻不存在')
          navigate('/news')
        }
      } catch (error) {
        console.error('获取新闻详情失败:', error)
        toast.error('获取新闻详情失败')
        navigate('/news')
      } finally {
        hideLoading()
      }
    }
    fetchNewsDetail()
  }, [id, showLoading, hideLoading, navigate])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleBack = () => {
    navigate('/news')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        text: news?.summary,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('链接已复制到剪贴板')
    }
  }

  if (!news) return null

  return (
    <section className="bg-background min-h-screen">
      {news.cover && (
        <div 
          className="relative h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${news.cover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回新闻列表</span>
        </button>

        <article className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`${CATEGORY_COLORS[news.category]} text-white px-3 py-1 rounded text-sm font-medium`}>
                {getCategoryLabel(news.category)}
              </span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(news.publishedAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/20">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{news.source}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {news.viewCount.toLocaleString()} 次浏览
                </span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                分享
              </button>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {news.summary}
              </p>
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>

            {news.relatedNews && news.relatedNews.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/20">
                <h2 className="text-xl font-bold mb-6">相关新闻</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.relatedNews.slice(0, 4).map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="group cursor-pointer bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{formatTime(item.publishedAt)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
