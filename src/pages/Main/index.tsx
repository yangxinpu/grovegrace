import { Outlet, Link, useLocation } from "react-router-dom"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "../../stores/useTheme"
import logo from "../../assets/images/logo.png"

export default function Main() {
  const { setTheme, resolved } = useTheme()
  const location = useLocation()

  const navItems = [
    { path: "/", label: "首页" },
    { path: "/news", label: "动态" },
    { path: "/about", label: "关于" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="GroveGrace Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-highlight tracking-tight">GroveGrace</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="切换主题"
            >
              {resolved === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button className="hidden md:flex items-center gap-2 px-5 py-2 bg-highlight text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              开始探索
            </button>

            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">帮助</Link>
            <Link to="#" className="hover:text-foreground transition-colors">状态</Link>
            <Link to="#" className="hover:text-foreground transition-colors">关于</Link>
            <Link to="#" className="hover:text-foreground transition-colors">隐私</Link>
            <Link to="#" className="hover:text-foreground transition-colors">条款</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
