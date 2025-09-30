import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, credits, packageId } = session.metadata!;

    try {
      // Add credits to user account
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('credits')
        .eq('id', userId)
        .single();

      if (user) {
        const newCredits = user.credits + parseInt(credits);
        
        // Update user credits
        await supabaseAdmin
          .from('users')
          .update({ credits: newCredits })
          .eq('id', userId);

        // Record transaction
        await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: parseInt(credits),
            type: 'purchase',
            stripe_payment_intent_id: session.payment_intent as string,
          });

        console.log(`Added ${credits} credits to user ${userId}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
