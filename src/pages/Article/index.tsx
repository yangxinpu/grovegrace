export default function Article() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-highlight">文章</h1>
        
        <div className="space-y-8">
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月20日</div>
            <h2 className="text-xl font-semibold mb-3">探索内心的宁静之路</h2>
            <p className="text-muted-foreground leading-relaxed">在喧嚣的现代生活中，如何找到属于自己的内心宁静？本文将带你探索一系列实用的方法和技巧，帮助你在日常生活中培养平和的心态。</p>
          </article>
          
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月18日</div>
            <h2 className="text-xl font-semibold mb-3">创意写作的艺术</h2>
            <p className="text-muted-foreground leading-relaxed">创意写作不仅仅是文字的堆砌，更是一种心灵的对话。让我们一起探索如何通过文字表达内心深处的想法和情感。</p>
          </article>
          
          <article className="p-6 border border-border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground mb-2">2026年5月15日</div>
            <h2 className="text-xl font-semibold mb-3">生活中的小确幸</h2>
            <p className="text-muted-foreground leading-relaxed">幸福往往藏在生活的细节中。一杯温暖的咖啡、一本好书、一次深入的对话，这些看似平凡的瞬间，却是生活中最珍贵的礼物。</p>
          </article>
        </div>
      </div>
    </section>
  )
}
