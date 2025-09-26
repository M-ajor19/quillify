"use client"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-6xl md:text-8xl font-light text-white mb-6 text-balance">
          Chaos into Clarity. <span className="font-medium italic instrument text-primary">Instantly.</span>
        </h1>

        <p className="text-lg font-light text-secondary-foreground mb-8 leading-relaxed max-w-2xl mx-auto text-pretty">
          Transform your content chaos into perfect clarity with AI-powered writing assistance. Drop in anything, choose
          your magic, get perfect content.
        </p>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <button className="px-8 py-4 rounded-full bg-primary text-white font-medium text-sm transition-all duration-300 hover:bg-primary/90 purple-glow-hover">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full bg-transparent border border-primary/50 text-white font-medium text-sm transition-all duration-300 hover:bg-primary/10 hover:border-primary">
            See How It Works
          </button>
        </div>
      </div>
    </main>
  )
}
