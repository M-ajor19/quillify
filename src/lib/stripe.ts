import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-08-27.basil',
});

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Credit packages
export const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 10,
    price: 19,
    description: 'Perfect for getting started',
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 30,
    price: 49,
    description: 'Great for regular users',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 100,
    price: 149,
    description: 'For power users and teams',
  },
];
