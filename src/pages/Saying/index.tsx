export default function Saying() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-highlight">名言</h1>
        
        <div className="space-y-8">
          <blockquote className="p-6 border-l-4 border-primary bg-card rounded-r-lg">
            <p className="text-lg italic mb-3">"生活不是等待暴风雨过去，而是学会在雨中跳舞。"</p>
            <footer className="text-sm text-muted-foreground">— 维维安·格林</footer>
          </blockquote>
          
          <blockquote className="p-6 border-l-4 border-primary bg-card rounded-r-lg">
            <p className="text-lg italic mb-3">"真正的智慧不是预见未来，而是知道当下什么是最有价值的。"</p>
            <footer className="text-sm text-muted-foreground">— 苏格拉底</footer>
          </blockquote>
          
          <blockquote className="p-6 border-l-4 border-primary bg-card rounded-r-lg">
            <p className="text-lg italic mb-3">"我们不是等待未来，我们创造未来。"</p>
            <footer className="text-sm text-muted-foreground">— 乔治·萧伯纳</footer>
          </blockquote>
          
          <blockquote className="p-6 border-l-4 border-primary bg-card rounded-r-lg">
            <p className="text-lg italic mb-3">"每一个不曾起舞的日子，都是对生命的辜负。"</p>
            <footer className="text-sm text-muted-foreground">— 尼采</footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
