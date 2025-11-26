import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_development', {
  apiVersion: '2025-11-17.clover',
});

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutPayload {
  items: CheckoutItem[];
  customerEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutPayload = await request.json();
    const { items, customerEmail } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Tidak ada item di keranjang' },
        { status: 400 }
      );
    }

    // Convert items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'idr',
        product_data: {
          name: item.name,
          description: `ThriftMap - Barang Bekas Berkualitas`,
          images: item.image ? [item.image] : undefined,
          metadata: {
            productId: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/marketplace?cancelled=true`,
      metadata: {
        orderSource: 'thriftmap',
        itemCount: items.length.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat checkout';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
