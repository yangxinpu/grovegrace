export default function AiSpeaking() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-bold mb-4">AI 口语</h1>
        <p className="text-muted-foreground text-lg">与 AI 对话，提升口语表达能力</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-2">情景对话</h2>
          <p className="text-muted-foreground text-sm">模拟真实场景，与 AI 进行沉浸式口语练习</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-2">发音纠正</h2>
          <p className="text-muted-foreground text-sm">AI 实时分析发音，提供精准改进建议</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-2">词汇积累</h2>
          <p className="text-muted-foreground text-sm">在对话中学习高频词汇，自然掌握用法</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-2">进度追踪</h2>
          <p className="text-muted-foreground text-sm">记录学习历程，见证口语能力提升</p>
        </div>
      </div>
    </div>
  )
}
