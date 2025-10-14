import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { ContinuumLogo } from './ContinuumLogo';
import { ChevronDown, User, Settings, LogOut, Coins } from 'lucide-react';

interface NavbarProps {
  credits: number;
  onBuyCredits: () => void;
  onDashboard: () => void;
  showDashboard: boolean;
}

export function Navbar({ credits, onBuyCredits, onDashboard, showDashboard }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#101014]/95 backdrop-blur-sm border-b border-[#18181B]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center space-x-3">
            <ContinuumLogo className="w-8 h-8" />
            <span className="text-xl font-semibold text-[#F5F5F7]">Continuum</span>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-4">
            {showDashboard && (
              <button
                onClick={onDashboard}
                className="px-4 py-2 text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
              >
                Dashboard
              </button>
            )}
            
            {/* Credits Display */}
            <div className="flex items-center space-x-2 bg-[#18181B] rounded-lg px-4 py-2">
              <Coins className="w-4 h-4 text-[#A855F7]" />
              <span className="text-sm font-medium">Credits: {credits}</span>
            </div>

            {/* Buy Credits Button */}
            <button
              onClick={onBuyCredits}
              className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
            >
              Buy Credits
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-[#18181B] hover:bg-[#27272A] rounded-lg px-3 py-2 transition-colors"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl">
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-[#27272A] rounded-md transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Account Settings</span>
                    </button>
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-[#27272A] rounded-md transition-colors text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}