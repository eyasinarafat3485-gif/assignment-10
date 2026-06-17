'use client';

import React, { useState } from 'react';
import { BiPhoneCall, BiEnvelope, BiMap, BiSend } from 'react-icons/bi';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <section className="w-full py-20 bg-zinc-950/70 text-white font-sans">
      <div className="max-w-7xl mx-auto px-5 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Get in Touch <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">With Us</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            Have questions about blood eligibility, or need urgent assistance? Drop us a message or call our support line directly.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Contact Information Cards (Signature Charcoal Gray) */}
          <div className="lg:col-span-5 bg-[#4A4A4A]/90 backdrop-blur-md text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-xl space-y-10 relative overflow-hidden border border-zinc-700/50">
            {/* Subtle background highlight */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Contact Information</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Our emergency response team is available 24/7 to assist with urgent blood requests and volunteer coordination.
              </p>
            </div>

            {/* Info Items List */}
            <div className="space-y-6">
              {/* Call Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-red-500/30 transition-all group">
                <div className="p-3 bg-red-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <BiPhoneCall size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Emergency Helpline</p>
                  <p className="text-base font-bold text-white mt-0.5">+880 1234-567890</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-red-500/30 transition-all group">
                <div className="p-3 bg-zinc-900 text-red-400 border border-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
                  <BiEnvelope size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Official Support</p>
                  <p className="text-base font-bold text-white mt-0.5">support@ideavault.com</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-red-500/30 transition-all group">
                <div className="p-3 bg-zinc-900 text-red-400 border border-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
                  <BiMap size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Central Hub</p>
                  <p className="text-base font-bold text-white mt-0.5">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="text-xs font-medium text-zinc-400 border-t border-zinc-800 pt-6">
              Response Time: <span className="text-red-400 font-bold">Within 15 minutes</span> for emergencies.
            </div>
          </div>

          {/* Right Side: Professional Premium Dark Form */}
          <div className="lg:col-span-7 bg-[#4A4A4A]/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-xl flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all text-zinc-100 placeholder-zinc-600 font-medium"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all text-zinc-100 placeholder-zinc-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="Urgent Blood Requirement / Feedback"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all text-zinc-100 placeholder-zinc-600 font-medium"
                  />
                </div>
              </div>

              {/* Message TextArea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Message</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Write your message details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all text-zinc-100 placeholder-zinc-600 font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-950/20 hover:shadow-red-900/40 hover:scale-[1.01] cursor-pointer"
              >
                <BiSend size={20} />
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}