import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './stores/useTheme'
import Main from './pages/Main'
import Home from './pages/Home'
import News from './pages/News'

export default function App() {
  useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
