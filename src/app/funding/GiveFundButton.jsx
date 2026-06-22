'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

// TSX (!) non-null assertion mark shorano hoyeche
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function GiveFundButton() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);

  const handleDonate = async () => {
    // Zero ba negative funding block korar jonno frontend standard check
    if (!amount || amount < 5) {
      alert("Minimum donation amount is $5");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error("Stripe or Session ID missing");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm mb-1">Amount ($)</label>
        <input
          type="number"
          value={amount || ''} // Field empty rakhle jate error na dey dynamic state handle korbe
          onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
          className="border p-3 rounded-lg w-40"
          min={5}
        />
      </div>
      <button
        onClick={handleDonate}
        disabled={loading}
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
      >
        {loading ? "Processing..." : "Give Fund Now"}
      </button>
    </div>
  );
}