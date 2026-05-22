export default function News() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-highlight">最新动态</h1>
        
        <div className="space-y-8">
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月20日</div>
            <h2 className="text-xl font-semibold mb-3">全新社区功能上线</h2>
            <p className="text-muted-foreground leading-relaxed">我们很高兴地宣布，全新的社区互动功能现已正式上线！用户可以创建自己的讨论主题，分享想法和见解，与志同道合的朋友交流。</p>
          </article>
          
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月15日</div>
            <h2 className="text-xl font-semibold mb-3">深色模式全面优化</h2>
            <p className="text-muted-foreground leading-relaxed">我们对深色模式进行了全面的视觉优化，现在在夜间使用时更加舒适护眼。支持一键切换，并记住您的偏好设置。</p>
          </article>
          
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月10日</div>
            <h2 className="text-xl font-semibold mb-3">创作者计划启动</h2>
            <p className="text-muted-foreground leading-relaxed">我们正式启动了创作者计划，为优质内容创作者提供更多支持和激励，共同打造一个充满活力的创作社区。</p>
          </article>
        </div>
      </div>
    </section>
  )
}
