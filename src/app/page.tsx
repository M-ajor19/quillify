export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Simple Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Quillify</div>
        <nav className="space-x-4">
          <a href="#features" className="hover:text-purple-300">Features</a>
          <a href="#pricing" className="hover:text-purple-300">Pricing</a>
          <a href="#docs" className="hover:text-purple-300">Docs</a>
        </nav>
      </header>

      {/* Simple Hero */}
      <main className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-800/30 backdrop-blur-sm rounded-lg p-6 mb-8 inline-block">
            <span className="text-sm">✨ Transform Feedback into Social Proof - SIMPLE VERSION</span>
          </div>
          
          <h1 className="text-6xl font-light mb-6">
            Turn Reviews into Revenue.
            <br />
            <span className="font-medium italic text-purple-300">Instantly.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload customer reviews, testimonials, and feedback. Our AI transforms them into polished, engaging social media content that builds trust and drives conversions.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-purple-400 hover:bg-purple-400/10 rounded-full transition-colors">
              Pricing
            </button>
          </div>
        </div>
      </main>

      {/* Simple Features */}
      <section id="features" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-medium mb-4">Drop in Anything</h3>
              <p className="text-gray-300">Upload documents, paste text, or share links. Our AI understands any format.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-medium mb-4">Choose Your Magic</h3>
              <p className="text-gray-300">Select from dozens of writing styles, tones, and formats.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-medium mb-4">Get Perfect Content</h3>
              <p className="text-gray-300">Receive polished, ready-to-use content that matches your brand voice.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
