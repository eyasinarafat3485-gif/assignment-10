'use client';

import { useEffect } from 'react';

export default function SuccessMessage({ message, type }) {
  useEffect(() => {
    // Auto hide after 6 seconds
    const timer = setTimeout(() => {
      window.history.replaceState({}, '', '/funding'); // Remove query params
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mb-6 p-4 rounded-lg border ${type === 'success' 
      ? 'bg-green-50 border-green-200 text-green-800' 
      : 'bg-red-50 border-red-200 text-red-800'}`}>
      <p className="font-medium">{message}</p>
      <p className="text-sm mt-1">This page will refresh shortly...</p>
    </div>
  );
}