import { BookOpen } from 'lucide-react'

export default function Article() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">页面建设中</h1>
        <p className="text-muted-foreground text-lg mb-8">
          文章页面正在开发中，敬请期待！
        </p>
        
        <div className="flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </section>
  )
}