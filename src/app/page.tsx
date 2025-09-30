"use client"

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { Dashboard } from '@/components/Dashboard';
import { AlchemyStation } from '@/components/AlchemyStation';
import { PurchaseModal } from '@/components/PurchaseModal';

type Screen = 'onboarding' | 'dashboard' | 'alchemy';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [credits, setCredits] = useState(3);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const handleGenerate = () => {
    setCurrentScreen('alchemy');
    setIsFirstRun(false);
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleBuyCredits = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseComplete = (newCredits: number) => {
    setCredits(prev => prev + newCredits);
    setShowPurchaseModal(false);
  };

  return (
    <div className="min-h-screen bg-[#101014] text-[#F5F5F7] font-['Inter',sans-serif]">
      <Navbar 
        credits={credits}
        onBuyCredits={handleBuyCredits}
        onDashboard={handleDashboard}
        showDashboard={currentScreen !== 'dashboard'}
      />
      
      <main className="pt-16">
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onGenerate={handleGenerate} />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard 
            credits={credits}
            onStartGeneration={handleGenerate}
            onBuyCredits={handleBuyCredits}
          />
        )}
        
        {currentScreen === 'alchemy' && (
          <AlchemyStation 
            credits={credits}
            onCreditsUsed={() => setCredits(prev => Math.max(0, prev - 1))}
          />
        )}
      </main>

      {showPurchaseModal && (
        <PurchaseModal
          onClose={() => setShowPurchaseModal(false)}
          onPurchase={handlePurchaseComplete}
        />
      )}
    </div>
  );
}
