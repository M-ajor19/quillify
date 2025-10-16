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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center space-x-3">
            <ContinuumLogo className="w-8 h-8" />
            <span className="text-xl font-semibold text-white">Continuum</span>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-4">
            {showDashboard && (
              <button
                onClick={onDashboard}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                Dashboard
              </button>
            )}
            
            {/* Credits Display */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
              <Coins className="w-4 h-4 text-white/90" />
              <span className="text-sm font-medium text-white">Credits: {credits}</span>
            </div>

            {/* Buy Credits Button */}
            <button
              onClick={onBuyCredits}
              className="bg-white hover:bg-white/90 text-black px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300"
            >
              Buy Credits
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-colors duration-300"
              >
                <User className="w-4 h-4 text-white" />
                <ChevronDown className="w-3 h-3 text-white" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl">
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-white/10 rounded-md transition-colors duration-300 text-white">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Account Settings</span>
                    </button>
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-white/10 rounded-md transition-colors duration-300 text-white/70"
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