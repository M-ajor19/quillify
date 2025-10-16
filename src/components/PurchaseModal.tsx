import React, { useState } from 'react';
import { X, Check, Gift, Zap, Crown, Loader } from 'lucide-react';
import { CREDIT_PACKAGES } from '@/lib/stripe';

interface PurchaseModalProps {
  onClose: () => void;
  onPurchase: (credits: number) => void;
}

export function PurchaseModal({ onClose, onPurchase }: PurchaseModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">Simple, Pay-As-You-Go Pricing</h2>
            <p className="text-white/70 text-sm">Start for free. Buy a credit pack when you need one. No subscriptions, no hidden fees.</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREDIT_PACKAGES.map((plan, index) => {
              const isPopular = index === 1; // Make middle plan popular
              const IconComponent = index === 0 ? Zap : index === 1 ? Crown : Gift;
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-black border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                    isPopular 
                      ? 'border-white/40 ring-2 ring-white/20' 
                      : 'border-white/20 hover:border-white/30'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className="mb-4">
                      <IconComponent className={`w-12 h-12 mx-auto ${isPopular ? 'text-white' : 'text-white/70'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    {isPopular && (
                      <div className="mb-2">
                        <span className="inline-block bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-medium">
                          Recommended
                        </span>
                      </div>
                    )}
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">
                        ${plan.price}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-white/90 flex-shrink-0" />
                        <span className="text-sm text-white/70">{plan.credits} Credits</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-white/90 flex-shrink-0" />
                        <span className="text-sm text-white/70">{plan.description}</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-white/90 flex-shrink-0" />
                        <span className="text-sm text-white/70">One-Time Purchase</span>
                      </li>
                    </ul>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading === plan.id}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                      isPopular
                        ? 'bg-white hover:bg-white/90 text-black'
                        : 'bg-white/10 hover:bg-white hover:text-black text-white border border-white/20'
                    }`}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Buy Now'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/70">
              Secure payment powered by Stripe. No subscriptions, no hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}