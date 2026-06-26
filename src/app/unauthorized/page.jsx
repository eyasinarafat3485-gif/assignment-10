"use client";

import React from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';

export default function Unauthorized() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-10 lg:px-8 font-sans text-white">
      <div className="max-w-md w-full text-center space-y-8 bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800">
        
        {/* Icon & Visual representation */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative p-5 bg-red-950/50 rounded-full text-red-500 animate-pulse border border-red-900/30">
            <HiLockClosed className="w-16 h-16" />
          </div>
          <span className="mt-4 text-xs font-semibold tracking-widest text-red-400 uppercase px-2.5 py-1 bg-red-950/40 rounded-full border border-red-900/30">
            Error 401
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Oops! It looks like you don't have permission to access this part of <span className="font-semibold text-indigo-400">hireloop</span>. Please log in or check your credentials.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          <Link href={'/'}
            onClick={handleGoBack}
            className="inline-flex items-center justify-center px-5 py-3 border border-zinc-700 text-base font-medium rounded-xl text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-black"
          >
            <BiArrowBack className="mr-2 w-5 h-5" />
            Go Back
          </Link>
          
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-md shadow-indigo-950/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-black"
          >
            Login to Hireloop
          </Link>
        </div>

        {/* Footer Help */}
        <div className="pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            Think this is a mistake? Contact your administrator or support team.
          </p>
        </div>

      </div>
    </div>
  );
}