import React from 'react';
import { AlchemyStation } from './AlchemyStation';

interface OnboardingScreenProps {
  onGenerate: () => void;
}

export function OnboardingScreen({ onGenerate }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-[#101014] pt-8 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Welcome to Continuum
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Intelligent infrastructure that analyzes, learns, and architects your brand's voice. Engineer consistently coherent content across all platforms.
          </p>
        </div>

        {/* Main Tool */}
        <AlchemyStation onGenerate={onGenerate} credits={3} isOnboarding={true} />
      </div>
    </div>
  );
}