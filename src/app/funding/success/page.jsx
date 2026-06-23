
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const {
    status,
    metadata, 
    amount_total,
    payment_intent
  } = session

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    try {
      const amountPaid = amount_total / 100; 
      const transactionId = typeof payment_intent === 'string' ? payment_intent : payment_intent?.id;

      const loggedInUserName = metadata?.userName || "Anonymous";
      const loggedInUserEmail = metadata?.userEmail || "No Email";

      const backendApiUrl = 'http://localhost:5000/api/funding';

      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: loggedInUserName,   
          email: loggedInUserEmail,     
          amount: amountPaid,
          transactionId: transactionId,
          sessionId: session_id,
          status: 'succeeded'           
        }),
      });

      if (response.ok) {
        console.log("✅ Logged in user data successfully saved to MongoDB!");
      }

    } catch (error) {
      console.error("❌ Error hitting backend API:", error);
    }

    return (
      <section className="min-h-screen bg-zinc-950/70 flex items-center justify-center p-4 antialiased">
        <div className="max-w-md w-full bg-zinc-950 rounded-2xl shadow-2xl p-8 text-center border border-zinc-800/80">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 mb-6 animate-pulse">
            <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Thank you, {metadata?.userName}!</h1>
          <p className="text-zinc-400 font-medium mb-6">Your payment was successful.</p>
          <hr className="border-zinc-800 my-4" />

          <div className="mt-8">
            <Link href="/funding" className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
              Return to Funding Page
            </Link>
          </div>
        </div>
      </section>
    )
  }
}