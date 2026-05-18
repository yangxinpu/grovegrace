import { Button } from '@/components/ui/button'

const quotes = [
  {
    author: "苏轼",
    category: "诗词",
    content: "人生如逆旅，我亦是行人。",
    dynasty: "北宋"
  },
  {
    author: "泰戈尔",
    category: "哲理",
    content: "世界以痛吻我，要我回报以歌。",
    dynasty: "印度"
  },
  {
    author: "鲁迅",
    category: "散文",
    content: "真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。",
    dynasty: "现代"
  },
  {
    author: "莎士比亚",
    category: "戏剧",
    content: "生存还是毁灭，这是个问题。",
    dynasty: "英国"
  },
  {
    author: "陶渊明",
    category: "诗词",
    content: "采菊东篱下，悠然见南山。",
    dynasty: "东晋"
  },
  {
    author: "纪伯伦",
    category: "散文诗",
    content: "你的孩子，其实不是你的孩子。他们是生命对于自身渴望而诞生的孩子。",
    dynasty: "黎巴嫩"
  }
]

const categories = [
  { name: "名人语录", icon: "💬", count: "1,280+" },
  { name: "诗词鉴赏", icon: "📜", count: "856+" },
  { name: "经典散文", icon: "📖", count: "432+" },
  { name: "哲理金句", icon: "✨", count: "2,100+" },
  { name: "名人故事", icon: "🌟", count: "156+" },
  { name: "读书笔记", icon: "📝", count: "89+" }
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍃</span>
            <h1 className="text-xl font-heading font-semibold">林下之风</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#quotes" className="text-muted-foreground hover:text-foreground transition-colors">语录精选</a>
            <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">分类浏览</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">关于我们</a>
          </div>
          <Button variant="outline" size="sm">开始探索</Button>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
          汇集名家智慧<br />
          <span className="text-primary">品味文字之美</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          林下之风，致力于打造纯净、优质的名人名言与经典美文聚合平台。
          收录古今中外各界名人语录、哲理金句、传世散文、随笔好文、经典篇章，
          为您提供摘抄素材、静心阅读、文案灵感的线上空间。
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">探索语录</Button>
          <Button variant="outline" size="lg">了解更多</Button>
        </div>
      </section>

      <section id="categories" className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-heading font-semibold mb-8 text-center">内容分类</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="p-6 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer text-center"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-medium mb-1">{cat.name}</div>
              <div className="text-sm text-muted-foreground">{cat.count} 篇</div>
            </div>
          ))}
        </div>
      </section>

      <section id="quotes" className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-heading font-semibold">精选语录</h3>
          <Button variant="ghost" size="sm">查看更多 →</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  {quote.category}
                </span>
                <span className="text-xs text-muted-foreground">{quote.dynasty}</span>
              </div>
              <blockquote className="text-lg font-medium mb-4 leading-relaxed">
                「{quote.content}」
              </blockquote>
              <div className="text-sm text-muted-foreground">
                —— {quote.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-semibold mb-4">关于林下之风</h3>
          <p className="text-muted-foreground leading-relaxed">
            「林下之风」取自古代对高雅士人的美誉。我们相信，优秀的文字具有穿越时空的力量，
            能够启迪心智、温暖心灵。在这里，您将领略到古今中外名家大师的思想火花，
            发现那些历经岁月洗礼依然熠熠生辉的文字瑰宝。
          </p>
        </div>
      </section>

      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍃</span>
              <span className="font-heading font-semibold">林下之风</span>
            </div>
            <p className="text-sm text-muted-foreground">
              分类规整、持续更新 | 静心阅读、文案灵感
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 林下之风. 精心整理，传承经典.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
