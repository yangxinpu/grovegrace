export default function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-highlight">关于我们</h1>
        
        <div className="space-y-8">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-3">我们的使命</h2>
            <p className="text-muted-foreground leading-relaxed">GroveGrace 致力于为每一个寻求内心平静和创意灵感的人提供一个温暖的家。我们相信，通过分享故事、名言和创意，可以点亮彼此的生活。</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-3">我们的愿景</h2>
            <p className="text-muted-foreground leading-relaxed">我们希望成为一个充满人文关怀的社区，在这里，每个人都能找到属于自己的声音，分享自己的故事，获得灵感和力量。</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-3">我们的价值观</h2>
            <p className="text-muted-foreground leading-relaxed">真诚、包容、创意、成长。我们相信每个人都有独特的价值，都值得被倾听和理解。我们鼓励真实的表达，支持彼此的成长。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
