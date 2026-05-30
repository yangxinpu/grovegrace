const features = [
  {
    title: '名言警句',
    description: '精选古今中外的名言警句，配以深度解读，启迪智慧',
  },
  {
    title: '优质文章',
    description: '涵盖哲学、文学、科技等领域的高质量原创文章',
  },
  {
    title: 'AI 口语',
    description: '智能口语练习系统，提升英语表达能力',
  },
  {
    title: '精心设计',
    description: '简洁优雅的界面设计，提供舒适的阅读体验',
  },
]

export default function About() {
  return (
    <section className="bg-background min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">林下之风</h1>
              <p className="text-lg text-primary/80 font-medium mb-2">GROVEGRACE</p>
              <p className="text-base text-muted-foreground max-w-md mx-auto md:mx-0">
                一个阅读、思考、成长的空间
              </p>
            </div>
            
            <div>
              <p className="text-base text-muted-foreground leading-relaxed text-left">
                林下之风是一个专注于人文内容的阅读平台，致力于为用户提供高质量的哲学、文学、科技等领域的文章和名言警句。
                我们相信，阅读和思考是提升自我的最佳途径，希望通过这个平台，帮助每一位访客在知识的海洋中找到属于自己的那片林下之风。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="border border-border/60 rounded-lg p-4">
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
