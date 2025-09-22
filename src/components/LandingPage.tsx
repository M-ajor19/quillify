'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, Users, Zap, Shield, TrendingUp, Play } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Quillify</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            </div>
            <Link href="/app" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Professional Ken Burns Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Ken Burns Background Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%), url('https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            animation: 'kenBurns 20s ease-in-out infinite alternate',
          }}
        />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
          <div className={`transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                animation: 'heroTitleFadeIn 1.2s ease-out 0.3s forwards',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              Transform Feedback Into Social Proof Gold
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 font-light"
              style={{
                animation: 'heroSubtitleFadeIn 1s ease-out 0.8s forwards',
                opacity: isVisible ? 0.9 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Turn raw customer reviews into polished, engaging social media content that builds trust and drives conversions.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              style={{
                animation: 'ctaFadeIn 0.8s ease-out 1.2s forwards',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <Link 
                href="/app" 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white border-2 border-cyan-400 rounded-lg font-semibold text-lg transition-all duration-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Start Creating Content</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-cyan-500 transition-transform duration-400 -translate-x-full group-hover:translate-x-0"></div>
              </Link>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Professional Style */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Why Choose Quillify?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful AI-driven content transformation that saves you hours while creating compelling social proof that converts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Transform raw feedback into polished content in seconds, not hours. Our AI understands context and tone perfectly.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Authentic Voice</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Maintains the authentic voice of your customers while enhancing readability and impact for maximum engagement.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Boost Engagement</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Create compelling social proof that increases engagement and drives more conversions than ever before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your customer feedback into compelling social proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paste Your Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply copy and paste any customer feedback, review, or testimonial into our smart editor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Style</h3>
              <p className="text-gray-600 leading-relaxed">
                Select the tone and format that best fits your brand and the platform you&apos;re posting on.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Perfect Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive polished, engaging content ready to share across all your social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Professional Layered Design */}
      <section id="testimonials" className="py-24 bg-white relative">
        {/* Subtle background line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Trusted by Leading Content Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how Quillify is helping businesses turn feedback into powerful social proof that drives real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg relative transition-all duration-400 hover:shadow-xl hover:-translate-y-2 border border-gray-200 overflow-hidden group">
              <div className="text-8xl text-gray-200 absolute -top-4 left-6 font-serif transition-all duration-300 group-hover:text-blue-100 group-hover:scale-110">&ldquo;</div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 mt-8 italic">
                Quillify has completely transformed how we handle customer testimonials. What used to take hours now takes minutes, and the quality is incredible.
              </p>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Sarah Chen</h4>
                  <p className="text-gray-600">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg relative transition-all duration-400 hover:shadow-xl hover:-translate-y-2 border border-gray-200 overflow-hidden group">
              <div className="text-8xl text-gray-200 absolute -top-4 left-6 font-serif transition-all duration-300 group-hover:text-emerald-100 group-hover:scale-110">&ldquo;</div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 mt-8 italic">
                The AI understands context so well. It maintains the authenticity while making our testimonials much more engaging and shareable.
              </p>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Marcus Rodriguez</h4>
                  <p className="text-gray-600">Founder, GrowthLab</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg relative transition-all duration-400 hover:shadow-xl hover:-translate-y-2 border border-gray-200 overflow-hidden group">
              <div className="text-8xl text-gray-200 absolute -top-4 left-6 font-serif transition-all duration-300 group-hover:text-purple-100 group-hover:scale-110">&ldquo;</div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 mt-8 italic">
                Our social media engagement has increased by 40% since using Quillify. The content it generates is just more compelling.
              </p>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Emily Watson</h4>
                  <p className="text-gray-600">Social Media Manager, InnovateCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Professional Background */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white"/><circle cx="80" cy="80" r="2" fill="white"/><circle cx="40" cy="60" r="1" fill="white"/><circle cx="70" cy="30" r="1" fill="white"/></svg>')`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            Join thousands of content creators who are already using Quillify to create compelling social proof that drives real business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/app" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-white rounded-lg font-semibold text-lg transition-all duration-400 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">Start Creating Free</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-cyan-400 transition-transform duration-400 -translate-x-full group-hover:translate-x-0"></div>
            </Link>
            <div className="flex items-center gap-2 text-gray-300">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Quillify</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Transform raw customer feedback into polished social proof content that drives engagement and builds trust.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Quillify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
