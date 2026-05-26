import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  ChevronRight, 
  Loader2, 
  Search,
  X 
} from 'lucide-react'
import { getArticleList, getArticleCategories } from '@/api'
import type { Article, Category } from '@/types/api'
import { useAppStore } from '@/stores'
import { toast } from 'sonner'
import { formatDate } from '@/utils'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { VirtualList } from '@/components/VirtualList'

export default function Article() {
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useAppStore()
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)
  const pageSize = 8

  const hasMore = articles.length < total

  const loadMoreArticles = useCallback(async () => {
    try {
      const res = await getArticleList({ 
        page: page + 1, 
        pageSize, 
        category: category || undefined,
        keyword: keyword || undefined
      })
      if (res.code === 20000 && res.data) {
        setArticles(prev => [...prev, ...res.data.list])
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('加载更多文章失败:', error)
      toast.error('加载失败，请稍后重试')
    }
  }, [page, pageSize, category, keyword])

  const { observerRef, isLoading } = useInfiniteScroll({
    onLoadMore: loadMoreArticles,
    hasMore,
    threshold: 300,
  })

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
    async function fetchCategories() {
      try {
        const res = await getArticleCategories()
        if (res.code === 20000 && res.data) {
          setCategories(res.data)
        }
      } catch (error) {
        console.error('获取分类选项失败:', error)
        toast.error('获取分类选项失败')
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchArticles() {
      showLoading()
      try {
        const res = await getArticleList({ 
          page: 1, 
          pageSize, 
          category: category || undefined,
          keyword: keyword || undefined
        })
        if (res.code === 20000 && res.data) {
          setArticles(res.data.list)
          setTotal(res.data.total)
          setPage(1)
        }
      } catch (error) {
        console.error('获取文章列表失败:', error)
        toast.error('获取文章列表失败，请稍后重试')
      } finally {
        hideLoading()
      }
    }
    fetchArticles()
  }, [category, keyword, showLoading, hideLoading])

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory)
  }, [])

  const handleSearch = useCallback(() => {
    setKeyword(searchInput.trim())
  }, [searchInput])

  const handleClearSearch = useCallback(() => {
    setSearchInput('')
    setKeyword('')
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }, [handleSearch])

  const handleArticleClick = useCallback((articleId: number) => {
    navigate(`/article/${articleId}`)
  }, [navigate])

  const renderArticleItem = useCallback((article: Article) => (
    <article
      onClick={() => handleArticleClick(article.id)}
      className="group relative bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      {article.cover && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-white/20 backdrop-blur-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {article.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground/80">{article.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.createdAt)}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}分钟
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {article.likeCount}
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-primary" />
      </div>
    </article>
  ), [handleArticleClick])

  return (
    <section className="bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">文章阅读</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            探索思想的深度，感受文字的温度
          </p>
        </header>

        <div 
          ref={categoryRef}
          className="sticky top-14 z-40 -mx-6 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/30 transition-all duration-500"
        >
          <div className={`flex flex-col md:flex-row gap-4 transition-all duration-500 ${isSticky ? 'md:justify-between' : 'md:justify-center'}`}>
            <div className={`flex flex-wrap gap-2 ${isSticky ? 'md:justify-start' : 'md:justify-center'}`}>
              {categories.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCategoryChange(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === option.value
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <div className={`flex items-center gap-2 ${isSticky ? 'md:justify-end' : 'md:justify-center'}`}>
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="搜索文章..."
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                搜索
              </button>
            </div>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">暂无文章</p>
            <p className="text-muted-foreground/70 text-sm mt-2">尝试调整筛选条件或搜索关键词</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {articles.map((article) => (
                <div key={article.id}>
                  {renderArticleItem(article)}
                </div>
              ))}
            </div>

            <div ref={observerRef} className="py-8 flex justify-center">
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">加载中...</span>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <p className="text-sm text-muted-foreground">已经到底啦~</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
