import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme, useAppStore } from '@/stores'
import Loading from '@/components/Loading'
import NotFound from '@/pages/NotFound'
import { Toaster } from '@/components/ui/sonner'

const Main = lazy(() => import('@/pages/Main'))
const Home = lazy(() => import('@/pages/Home'))
const Quote = lazy(() => import('@/pages/Quote'))
const QuoteDetail = lazy(() => import('@/pages/QuoteDetail'))
const Article = lazy(() => import('@/pages/Article'))
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'))
const News = lazy(() => import('@/pages/News'))
const NewsDetail = lazy(() => import('@/pages/NewsDetail'))
const About = lazy(() => import('@/pages/About'))
const AiSpeaking = lazy(() => import('@/pages/AiSpeaking'))

export default function App() {
  useTheme()
  const { isLoading, hideLoading } = useAppStore()

  useEffect(() => {
    // 页面加载完成后隐藏加载动画
    if (document.readyState === 'complete') {
      hideLoading()
    } else {// 页面未加载完成，监听 load事件
      window.addEventListener('load', hideLoading)
      return () => window.removeEventListener('load', hideLoading)
    }
  }, [hideLoading])

  return (
    <>
      {isLoading && <Loading />}
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="quotes" element={<Quote />} />
              <Route path="quote" element={<Quote />} />
              <Route path="quote/:id" element={<QuoteDetail />} />
              <Route path="articles" element={<Article />} />
              <Route path="article/:id" element={<ArticleDetail />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="ai-speaking" element={<AiSpeaking />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  )
}
