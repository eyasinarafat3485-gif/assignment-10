
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe';
import { auth } from "@/lib/auth"; 

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const sessionUser = await auth.api.getSession({ headers: headersList });
    const user = sessionUser?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized! Please login first." }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Tkzl8DGrhEoJ0txbf2tgyDq', 
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: user.email,  
      metadata: {
        userName: user.name,   
        userEmail: user.email, 
      },
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/funding`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}