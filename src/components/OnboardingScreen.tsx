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
          <h1 className="text-4xl md:text-5xl font-semibold text-[#F5F5F7] mb-4">
            Welcome to Continuum.
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Your intelligent infrastructure for brand voice. Let's build living systems of knowledge and communication together.
          </p>
        </div>

        {/* Main Tool */}
        <AlchemyStation onGenerate={onGenerate} credits={3} isOnboarding={true} />
      </div>
    </div>
  );
}