"use client"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <div className="text-2xl font-medium text-white">Continuum</div>
      </div>

      <nav className="flex items-center space-x-2">
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Features
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          How It Works
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200">
          Log In
        </button>
        <button className="px-6 py-2 rounded-full bg-primary text-white font-medium text-sm transition-all duration-300 hover:bg-primary/90 purple-glow-hover">
          Launch Studio
        </button>
      </div>
    </header>
  )
}
