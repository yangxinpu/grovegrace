export default function Home() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-highlight">
              人文故事<br />与创意
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              一个阅读、创作，以及深化理解的地方
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-highlight text-background rounded-full font-medium hover:opacity-90 transition-opacity">
                开始阅读
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square relative">
              <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 200" className="w-full h-full text-primary/50">
                  <path
                    d="M100,100 C120,50 180,60 170,120 C160,180 40,160 50,100 C60,40 120,20 150,70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="100" cy="100" r="3" fill="currentColor" />
                  <circle cx="150" cy="70" r="3" fill="currentColor" />
                  <circle cx="170" cy="120" r="3" fill="currentColor" />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/30 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-primary/60">
                  <path
                    d="M20,70 Q30,40 70,35 L85,50 L70,65 Q50,75 45,55"
                    fill="currentColor"
                    stroke="none"
                  />
                  <path
                    d="M80,45 L95,50 L85,60"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3">
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                  <path
                    d="M50,20 C30,20 20,40 20,55 C20,75 40,90 50,90 C60,90 80,75 80,55 C80,40 70,20 50,20 Z"
                    fill="currentColor"
                  />
                  <circle cx="40" cy="50" r="6" fill="background" />
                  <circle cx="60" cy="50" r="6" fill="background" />
                  <path
                    d="M40,65 Q50,75 60,65"
                    fill="none"
                    stroke="background"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-primary/40" />
              <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-primary/30" />
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
