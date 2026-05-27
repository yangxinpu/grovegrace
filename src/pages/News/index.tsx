import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  Clock, 
  Eye,
  ChevronRight
} from 'lucide-react'
import { getNewsList, getTopNews, getHotNews, getNewsCategories } from '@/api'
import type { News, Category } from '@/types/api'
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

export default function News() {
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useAppStore()
  const [categories, setCategories] = useState<Category[]>([])
  const [topNews, setTopNews] = useState<News[]>([])
  const [newsList, setNewsList] = useState<News[]>([])
  const [hotNews, setHotNews] = useState<News[]>([])

  const getCategoryLabel = (value: string) => {
    const category = categories.find(c => c.value === value)
    return category?.label || value
  }

  useEffect(() => {
    async function fetchNews() {
      showLoading()
      try {
        const [categoriesRes, topRes, listRes, hotRes] = await Promise.all([
          getNewsCategories(),
          getTopNews({ limit: 1 }),
          getNewsList({ page: 1, pageSize: 8 }),
          getHotNews({ limit: 5 })
        ])

        if (categoriesRes.code === 20000 && categoriesRes.data) {
          setCategories(categoriesRes.data)
        }
        if (topRes.code === 20000 && topRes.data) {
          setTopNews(topRes.data)
        }
        if (listRes.code === 20000 && listRes.data) {
          setNewsList(listRes.data.list)
        }
        if (hotRes.code === 20000 && hotRes.data) {
          setHotNews(hotRes.data)
        }
      } catch (error) {
        console.error('获取新闻失败:', error)
        toast.error('获取新闻失败，请稍后重试')
      } finally {
        hideLoading()
      }
    }
    fetchNews()
  }, [showLoading, hideLoading])

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours}小时前`
    return `${Math.floor(hours / 24)}天前`
  }

  const heroNews = topNews[0]
  const importantNews = newsList.slice(0, 3)
  const regularNews = newsList.slice(3)

  return (
    <section className="bg-background min-h-screen">
      {heroNews && (
        <div 
          className="relative h-[500px] bg-cover bg-center cursor-pointer group"
          style={{ backgroundImage: heroNews.cover ? `url(${heroNews.cover})` : 'none', backgroundColor: !heroNews.cover ? 'hsl(var(--card))' : undefined }}
          onClick={() => handleNewsClick(heroNews.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className={`${CATEGORY_COLORS[heroNews.category]} text-white px-3 py-1 rounded text-sm font-medium`}>
                  {getCategoryLabel(heroNews.category)}
                </span>
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(heroNews.publishedAt)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:underline decoration-2 underline-offset-8">
                {heroNews.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl leading-relaxed">
                {heroNews.summary}
              </p>
              <div className="flex items-center gap-4 mt-6 text-white/70 text-sm">
                <span className="font-medium">{heroNews.source}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {heroNews.viewCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {importantNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">重要新闻</h2>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {importantNews.map((news) => (
                <article
                  key={news.id}
                  onClick={() => handleNewsClick(news.id)}
                  className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {news.cover && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={news.cover}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`${CATEGORY_COLORS[news.category]} text-white px-2 py-0.5 rounded text-xs font-medium`}>
                        {getCategoryLabel(news.category)}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatTime(news.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {news.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">最新新闻</h2>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {regularNews.map((news) => (
                <article
                  key={news.id}
                  onClick={() => handleNewsClick(news.id)}
                  className="group cursor-pointer bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex gap-4"
                >
                  {news.cover && (
                    <div className="flex-shrink-0 w-32 h-24 rounded overflow-hidden">
                      <img
                        src={news.cover}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`${CATEGORY_COLORS[news.category]} text-white px-2 py-0.5 rounded text-xs font-medium`}>
                        {getCategoryLabel(news.category)}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(news.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {news.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">热门新闻</h2>
              </div>
              <div className="space-y-4">
                {hotNews.map((news, index) => (
                  <article
                    key={news.id}
                    onClick={() => handleNewsClick(news.id)}
                    className="group cursor-pointer bg-card rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {news.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {news.viewCount > 10000 
                              ? `${(news.viewCount / 10000).toFixed(1)}万` 
                              : news.viewCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
