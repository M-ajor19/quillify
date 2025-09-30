import React from 'react';
import { X, Check, Gift, Zap, Crown } from 'lucide-react';

interface PurchaseModalProps {
  onClose: () => void;
  onPurchase: (credits: number) => void;
}

export function PurchaseModal({ onClose, onPurchase }: PurchaseModalProps) {
  const plans = [
    {
      name: 'Free Trial',
      credits: 2,
      price: 0,
      popular: false,
      icon: Gift,
      buttonText: 'Get Started',
      features: [
        '2 Free Credits',
        'Access to all core features',
      ],
    },
    {
      name: 'Starter Pack',
      credits: 10,
      price: 19,
      popular: true,
      icon: Zap,
      buttonText: 'Buy Now',
      features: [
        '10 Credits',
        'One-Time Purchase',
      ],
    },
    {
      name: 'Pro Pack',
      credits: 30,
      price: 49,
      popular: false,
      icon: Crown,
      buttonText: 'Buy Now',
      features: [
        '30 Credits',
        'One-Time Purchase',
      ],
    },
  ];

  const handlePurchase = (credits: number, price: number) => {
    // In a real app, this would integrate with Stripe
    // For demo purposes, we'll simulate a successful purchase
    setTimeout(() => {
      onPurchase(credits);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#27272A]">
          <div>
            <h2 className="text-2xl font-semibold text-[#F5F5F7] mb-1">Simple, Pay-As-You-Go Pricing</h2>
            <p className="text-[#A1A1AA] text-sm">Start for free. Buy a credit pack when you need one. No subscriptions, no hidden fees.</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              
              return (
                <div
                  key={plan.name}
                  className={`relative bg-[#101014] border rounded-xl p-6 transition-all hover:scale-105 ${
                    plan.popular 
                      ? 'border-[#A855F7] ring-2 ring-[#A855F7]/20' 
                      : 'border-[#27272A] hover:border-[#A855F7]/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#A855F7] text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className="mb-4">
                      <IconComponent className={`w-12 h-12 mx-auto ${plan.popular ? 'text-[#A855F7]' : 'text-[#A1A1AA]'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#F5F5F7] mb-2">{plan.name}</h3>
                    {plan.popular && (
                      <div className="mb-2">
                        <span className="inline-block bg-[#A855F7]/20 text-[#A855F7] px-3 py-1 rounded-full text-xs font-medium">
                          Recommended
                        </span>
                      </div>
                    )}
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-[#F5F5F7]">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                          <span className="text-sm text-[#A1A1AA]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handlePurchase(plan.credits, plan.price)}
                    className={`w-full py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                      plan.popular
                        ? 'bg-[#A855F7] hover:bg-[#9333EA] text-white'
                        : 'bg-[#27272A] hover:bg-[#A855F7] text-[#F5F5F7]'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-sm text-[#A1A1AA]">
              Secure payment powered by Stripe. No subscriptions, no hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}