"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/Navbar';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { Dashboard } from '@/components/Dashboard';
import { AlchemyStation } from '@/components/AlchemyStation';
import { PurchaseModal } from '@/components/PurchaseModal';
import { SignInScreen } from '@/components/SignInScreen';

type Screen = 'onboarding' | 'dashboard' | 'alchemy';

export default function Home() {
  const { data: session, status } = useSession();
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [credits, setCredits] = useState(0);
  const [isFirstRun, setIsFirstRun] = useState(true);

  // Update credits when session changes
  useEffect(() => {
    if (session?.user?.credits !== undefined) {
      setCredits(session.user.credits);
    }
  }, [session]);

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

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign-in screen if not authenticated
  if (status === 'unauthenticated') {
    return <SignInScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
