import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme, useAppStore } from '@/stores'
import Loading from '@/components/Loading'
import NotFound from '@/pages/NotFound'

const Main = lazy(() => import('@/pages/Main'))
const Home = lazy(() => import('@/pages/Home'))
const Saying = lazy(() => import('@/pages/Saying'))
const Article = lazy(() => import('@/pages/Article'))
const News = lazy(() => import('@/pages/News'))
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
              <Route path="quotes" element={<Saying />} />
              <Route path="articles" element={<Article />} />
              <Route path="news" element={<News />} />
              <Route path="ai-speaking" element={<AiSpeaking />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
