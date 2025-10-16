import React from 'react';
import { Plus, Coins, Clock, Zap } from 'lucide-react';

interface DashboardProps {
  credits: number;
  onStartGeneration: () => void;
  onBuyCredits: () => void;
}

export function Dashboard({ credits, onStartGeneration, onBuyCredits }: DashboardProps) {
  const recentGenerations = [
    { id: 1, type: 'Social Post', input: 'Product launch announcement...', time: '2 hours ago' },
    { id: 2, type: 'Testimonial', input: 'Customer feedback transformation...', time: '1 day ago' },
    { id: 3, type: 'Blog Outline', input: 'Content marketing strategy...', time: '2 days ago' },
    { id: 4, type: 'Email Copy', input: 'Newsletter campaign content...', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-black pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Continuum Core
          </h1>
          <p className="text-lg text-white/70">
            Your intelligent infrastructure is ready. Engineer coherent content across all platforms.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Card - Start New Generation */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Create New Content
                  </h3>
                  <p className="text-white/70 mb-6">
                    Engineer coherent content with precision. Your architectural system is ready.
                  </p>
                  <button
                    onClick={onStartGeneration}
                    className="bg-white text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/90 flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create</span>
                  </button>
                </div>
                <div className="hidden md:block">
                  <Zap className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-6 hover:border-white/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Account Status</h3>
              <Coins className="w-6 h-6 text-white/90" />
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-white mb-1">
                {credits}
              </div>
              <div className="text-sm text-white/70">Credits remaining</div>
            </div>

            <button
              onClick={onBuyCredits}
              className="w-full bg-white text-black py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/90"
            >
              Buy Credits
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            <Clock className="w-5 h-5 text-white/70" />
          </div>

          <div className="space-y-4">
            {recentGenerations.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-black border border-white/20 rounded-lg hover:border-white/40 transition-colors duration-300 cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm font-medium text-white/90">{item.type}</span>
                    <span className="text-xs text-white/50">{item.time}</span>
                  </div>
                  <p className="text-sm text-white/70 truncate">{item.input}</p>
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-white hover:text-white/80 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}