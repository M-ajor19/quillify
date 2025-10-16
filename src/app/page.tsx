"use client"

import Link from 'next/link';
import { ContinuumLogo } from '@/components/ContinuumLogo';
import { ArrowRight, Zap, Brain, Target, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ContinuumLogo className="w-8 h-8" />
              <span className="text-xl font-semibold">Continuum</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-white/70 hover:text-white transition-colors duration-300 text-sm">
                Features
              </a>
              <a href="#pricing" className="text-white/70 hover:text-white transition-colors duration-300 text-sm">
                Pricing
              </a>
              <Link 
                href="/studio"
                className="bg-white hover:bg-white/90 text-black px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300"
              >
                Launch Studio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/20 rounded-full px-4 py-2 mb-8">
              <Lock className="w-4 h-4 text-white/90" />
              <span className="text-sm text-white/70">Intelligent Infrastructure for Brand Communication</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight">
              Coherence,<br />Engineered
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              A learning system that analyzes your history, understands your voice, and engineers 
              consistently coherent content across all platforms. Stop creating in silos—build a system.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/studio"
                className="bg-white hover:bg-white/90 text-black px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Start Engineering</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="bg-white/10 hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-medium border border-white/20 transition-all duration-300"
              >
                See How It Works
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-sm text-white/50 mb-4">Trusted by professionals at</p>
              <div className="flex items-center justify-center gap-8 text-white/40 text-sm font-mono">
                <span>STARTUPS</span>
                <span className="text-white/20">|</span>
                <span>AGENCIES</span>
                <span className="text-white/20">|</span>
                <span>ENTERPRISES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4">Core Architecture</h2>
            <p className="text-white/70 text-lg">Systematic intelligence. Predictable coherence.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Architectural Memory</h3>
              <p className="text-white/70 text-sm">
                Systematically learns and structures your brand voice for perfect consistency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Coherent Systems</h3>
              <p className="text-white/70 text-sm">
                Engineers content that maintains perfect consistency across all platforms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Stage Pipeline</h3>
              <p className="text-white/70 text-sm">
                Sophisticated engineering process for consistent, high-quality results.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">System Continuity</h3>
              <p className="text-white/70 text-sm">
                Maintains context across your content generation sessions for true coherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4">Intelligent Architecture</h2>
            <p className="text-white/70 text-lg">Four systematic stages. Predictable excellence.</p>
      </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Input Analysis",
                description: "Extract key information, sentiment, and structure from raw content"
              },
              {
                step: "02",
                title: "Prompt Assembly",
                description: "Dynamically construct context-aware engineering instructions"
              },
              {
                step: "03",
                title: "Content Engineering",
                description: "Generate 3 coherent variations using advanced AI pipeline"
              },
              {
                step: "04",
                title: "Validation",
                description: "Ensure quality, format compliance, and brand consistency"
              }
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className="bg-black border border-white/20 rounded-xl p-6 h-full">
                  <div className="text-white/40 text-sm font-mono mb-2">[{stage.step}]</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{stage.title}</h3>
                  <p className="text-white/70 text-sm">{stage.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-white/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/70 text-lg">Start free. Scale with pay-as-you-go credits. No subscriptions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Pack */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-8 hover:border-white/30 transition-all duration-300">
              <div className="mb-6">
                <Zap className="w-10 h-10 text-white/70 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Starter Pack</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$19</span>
                </div>
                <p className="text-white/70 text-sm">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  10 Credits
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  All core features
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  One-time payment
                </li>
              </ul>

              <Link
                href="/studio"
                className="block w-full bg-white/10 hover:bg-white hover:text-black text-white text-center py-3 rounded-lg font-medium border border-white/20 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Pack - Highlighted */}
            <div className="bg-black border border-white/40 rounded-xl p-8 ring-2 ring-white/20 hover:border-white/50 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <svg className="w-10 h-10 text-white mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-2">Pro Pack</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$49</span>
                </div>
                <p className="text-white/70 text-sm">Great for regular users</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                  30 Credits
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                  All core features
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                  One-time payment
                </li>
              </ul>

              <Link
                href="/studio"
                className="block w-full bg-white hover:bg-white/90 text-black text-center py-3 rounded-lg font-medium transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Pack */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-8 hover:border-white/30 transition-all duration-300">
              <div className="mb-6">
                <svg className="w-10 h-10 text-white/70 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-2xl font-semibold text-white mb-2">Enterprise Pack</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$149</span>
                </div>
                <p className="text-white/70 text-sm">For power users and teams</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  100 Credits
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  All core features
                </li>
                <li className="flex items-center text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full mr-3"></span>
                  One-time payment
                </li>
              </ul>

              <Link
                href="/studio"
                className="block w-full bg-white/10 hover:bg-white hover:text-black text-white text-center py-3 rounded-lg font-medium border border-white/20 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-white/70">
              Start with 3 free credits. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4">Trusted by Professionals</h2>
            <p className="text-white/70 text-lg">Engineering coherence for brands worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Continuum transformed our content workflow completely. What used to take hours now takes minutes, with perfect consistency.",
                name: "Sarah Chen",
                title: "Marketing Director"
              },
              {
                quote: "The systematic approach to brand voice is exactly what we needed. No more inconsistent messaging across platforms.",
                name: "Marcus Rodriguez",
                title: "Content Architect"
              },
              {
                quote: "Finally, a tool that understands coherence isn't just about grammar—it's about systematic brand intelligence.",
                name: "Emily Watson",
                title: "Brand Systems Lead"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 border border-white/20 rounded-xl p-6">
                <p className="text-white/90 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-white/50 text-xs font-mono">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Ready to Engineer Coherence?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Start building your intelligent infrastructure today.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center space-x-2 bg-white hover:bg-white/90 text-black px-8 py-4 rounded-lg font-medium transition-all duration-300"
          >
            <span>Launch Continuum Studio</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-white/50 mt-6">
            3 free credits to start. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <ContinuumLogo className="w-6 h-6" />
              <span className="text-white/70 text-sm font-mono">Continuum</span>
            </div>
            <p className="text-white/50 text-sm">
              © 2025 Continuum. Coherence, Engineered.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
