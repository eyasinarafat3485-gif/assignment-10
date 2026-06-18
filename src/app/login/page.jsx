'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { BiShieldQuarter, BiPlus } from 'react-icons/bi';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function LoginSection() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // লগইন মেথড লজিক এখানে লিখুন
//   };
const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        console.log(user);

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })
        if (data) {
            toast.success("Succesfully login done");
                // window.location.href = callbackUrl;
        }
        if (error) {
            toast.error(error.message)
        }
    }

  return (
    <section className="w-full py-16 bg-zinc-950/70 backdrop-blur-md text-white font-sans  flex items-center justify-center relative overflow-hidden">
      
      {/* Background gradient like the image */}
      <div className="absolute inset-0"/>

      {/* Main Container - Dark Card Style like Image */}
      <div className="max-w-5xl w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[680px] border border-white/5 relative z-10">
        
        {/* Left Pane - Branding (Image Style) */}
        <div className="md:col-span-5 bg-zinc-950/70 p-10 flex flex-col justify-between relative text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🩸</span>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter">LifeStream</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center py-12">
            <h2 className="text-4xl font-black tracking-tight leading-none mb-4">
              Join The <span className="text-red-500">Lifesaving</span> Elite.
            </h2>
            
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
              By creating a donor profile, you instantly sync with live hospital requests across Bangladesh. 
              Your single decision can rewrite someone&apos;s story.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="text-red-500">✔</span> Encrypted Health Records
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="text-red-500">✔</span> Instant SOS Request Match
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="text-red-500">✔</span> Verified Badge Status
              </div>
            </div>
          </div>

          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <span>🔒</span> Secure & Compliant Infrastructure
          </div>
        </div>

        {/* Right Pane: Login Form (Image Style) */}
        <div className="md:col-span-7 p-10 md:p-14 flex flex-col justify-center bg-zinc-900">
          <div className="w-full max-w-md mx-auto space-y-8">
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
              <p className="text-zinc-400 mt-2">Sign in to access your donor dashboard</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">
                  Email Address
                </label>
                <div className="relative bg-zinc-800 border border-zinc-700 focus-within:border-red-600 rounded-2xl transition-all">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    <FiMail size={20} />
                  </div>
                  <Input
                    type="email"
                    id="donor_login_email"
                    name="email"
                    autoComplete="off"
                    placeholder="name@example.com"
                    variant="unstyled"
                    radius="none"
                    required
                    className="w-full h-14 pl-12 pr-4 text-white bg-transparent focus:outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-red-500 hover:text-red-400">
                    Forgot?
                  </Link>
                </div>
                <div className="relative bg-zinc-800 border border-zinc-700 focus-within:border-red-600 rounded-2xl transition-all">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    <FiLock size={20} />
                  </div>
                  <Input
                    type={isVisible ? "text" : "password"}
                    id="donor_login_password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    variant="unstyled"
                    radius="none"
                    required
                    className="w-full h-14 pl-12 pr-12 text-white bg-transparent focus:outline-none placeholder:text-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                  >
                    {isVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Link href='/'>
              <Button
                type="submit"
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-red-900/30 transition-all mt-4"
                size="lg"
              >
                SIGN IN TO DASHBOARD
                <FiArrowRight className="ml-2" />
              </Button>
              </Link>

              <p className="text-center text-zinc-400 text-sm pt-3">
                New to LifeStream?{' '}
                <Link href="/register" className="text-red-400 text-xl font-semibold hover:underline">
                  Create Account
                </Link>
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                <BiShieldQuarter className="text-emerald-500" /> 
                End-to-end Encrypted
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}