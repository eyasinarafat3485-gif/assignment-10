// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'

// import { stripe } from '../../../lib/stripe'

// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: '{{PRICE_ID}}',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { stripe } from '../../../lib/stripe'; // আপনার আগের স্ট্রাইপ ক্লায়েন্ট ইম্পোর্ট

export async function POST(req) {
  try {
    // ১. NextAuth সেশন থেকে ইউজার চেক করা
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ২. ফ্রন্টএন্ড থেকে পাঠানো Amount রিসিভ করা
    const { amount } = await req.json();
    if (!amount || amount < 5) {
      return NextResponse.json({ error: "Invalid amount. Minimum is $5" }, { status: 400 });
    }

    // ৩. Stripe Checkout Session তৈরি করা (ডাইনামিক অ্যামাউন্ট সহ)
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Project Funding / Donation",
            },
            unit_amount: amount * 100, // Stripe cents এ হিসাব করে ($1 = 100 cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/funding?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/funding?canceled=true`,
    });

    // ৪. সরাসরি MongoDB-তে 'pending' স্ট্যাটাসে ডাটা সেভ করা
    const client = await clientPromise;
    const db = client.db();

    await db.collection("fundings").insertOne({
      userId: session.user.id || session.user.email, // NextAuth ইউজার আইডি বা ইমেইল
      userName: session.user.name || "Anonymous",
      amount: parseFloat(amount),
      status: "pending",
      sessionId: checkoutSession.id,
      createdAt: new Date(),
    });

    // ৫. ফ্রন্টএন্ড GiveFundButton এর জন্য সেশন আইডি রিটার্ন করা
    return NextResponse.json({ sessionId: checkoutSession.id });

  } catch (err) {
    console.error("Checkout Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}