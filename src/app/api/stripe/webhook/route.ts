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
      // Check if we've already processed this webhook (idempotency)
      const { data: existingTransaction } = await supabaseAdmin
        .from('credit_transactions')
        .select('id')
        .eq('stripe_checkout_session_id', session.id)
        .single();

      if (existingTransaction) {
        console.log(`Webhook ${session.id} already processed`);
        return NextResponse.json({ received: true });
      }

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

        // Record transaction with checkout session ID for idempotency
        await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: parseInt(credits),
            type: 'purchase',
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_checkout_session_id: session.id,
          });

        console.log(`Added ${credits} credits to user ${userId}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      
      // If it's a unique constraint violation, it means we already processed this webhook
      if (error?.code === '23505') {
        console.log(`Webhook ${session.id} already processed (duplicate detected)`);
        return NextResponse.json({ received: true });
      }
      
      return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
