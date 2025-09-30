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
    <div className="min-h-screen bg-[#101014] pt-8 pb-12 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#F5F5F7] mb-4">
            Your Alchemy Dashboard
          </h1>
          <p className="text-lg text-[#A1A1AA]">
            Ready to transform your content? Your digital workshop awaits.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Card - Start New Generation */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#A855F7]/20 to-[#9333EA]/20 border border-[#A855F7]/30 rounded-xl p-8 hover:border-[#A855F7]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-3">
                    Start a New Generation
                  </h3>
                  <p className="text-[#A1A1AA] mb-6">
                    Transform your raw content into something extraordinary. The alchemy station is ready.
                  </p>
                  <button
                    onClick={onStartGeneration}
                    className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 group-hover:scale-110"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create</span>
                  </button>
                </div>
                <div className="hidden md:block">
                  <Zap className="w-16 h-16 text-[#A855F7]/30 group-hover:text-[#A855F7]/50 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 hover:border-[#A855F7]/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#F5F5F7]">Account Status</h3>
              <Coins className="w-6 h-6 text-[#A855F7]" />
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-[#F5F5F7] mb-1">
                {credits}
              </div>
              <div className="text-sm text-[#A1A1AA]">Credits remaining</div>
            </div>

            <button
              onClick={onBuyCredits}
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Buy Credits
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#F5F5F7]">Recent Activity</h3>
            <Clock className="w-5 h-5 text-[#A1A1AA]" />
          </div>

          <div className="space-y-4">
            {recentGenerations.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#101014] border border-[#27272A] rounded-lg hover:border-[#A855F7]/30 transition-colors cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm font-medium text-[#A855F7]">{item.type}</span>
                    <span className="text-xs text-[#A1A1AA]">{item.time}</span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] truncate">{item.input}</p>
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[#A855F7] hover:text-[#9333EA] text-sm font-medium">
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