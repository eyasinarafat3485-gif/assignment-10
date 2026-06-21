'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiHeart, BiPhoneCall, BiEnvelope, BiMap } from 'react-icons/bi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import logo from '../../public/blood-logo.jpg'; // আপনার লোগোর পাথ অনুযায়ী পরিবর্তন করতে পারেন

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Smooth Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-zinc-950/70 backdrop-blur-md text-zinc-400 font-sans relative">
      <div className=" mx-auto px-5 lg:px-8 pt-16 pb-8">
        
        {/* Main Grid Network */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex gap-2 items-center hover:opacity-90 transition-opacity">
              <Image src={logo} width={45} height={45} alt="logo" className="w-10 h-10 rounded-xl object-contain" />
              <p className="font-black text-2xl tracking-tighter text-red-500 ">
                Blood<span className='text-white'>Bridge</span>
              </p>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Connecting life-saving blood donors with critical search requests instantly. Join us to be the reason a heart keeps beating.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaFacebookF />, href: '/' },
                { icon: <FaTwitter />, href: '/' },
                { icon: <FaLinkedinIn />, href: '/' },
                { icon: <FaInstagram />, href: '/' },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500/50 hover:bg-red-600/20 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-bold text-zinc-200 text-xs mb-5 tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home Base', href: '/' },
                { name: 'Search Donors', href: '/search-donor' },
                { name: 'Active Blood Requests', href: '/donation-requests' },
                { name: 'Become a Volunteer', href: '/register' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-red-500 text-zinc-400 transition-colors duration-200 block py-0.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources & Support */}
          <div>
            <h4 className="font-bold text-zinc-200 text-xs mb-5 tracking-wide uppercase">
              Resources & Legal
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Eligibility Guidelines', href: '/' },
                { name: 'Donation Process', href: '/' },
                { name: 'Privacy Policy', href: '/' },
                { name: 'Terms of Service', href: '/' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-red-500 text-zinc-400 transition-colors duration-200 block py-0.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Urgent Contact / Support */}
          <div>
            <h4 className="font-bold text-zinc-200 text-xs mb-5 tracking-wide uppercase">
              Emergency Contact
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <BiPhoneCall className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-zinc-200">Emergency Helpline</p>
                  <p className="text-zinc-400 text-xs mt-0.5">+880 1234-567890</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BiEnvelope className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-zinc-200">Support Email</p>
                  <p className="text-zinc-400 text-xs mt-0.5">support@ideavault.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BiMap className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-zinc-200">Central Hub</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Dhaka, Bangladesh</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500 relative">
          <p>© {currentYear} BloodBridge. All rights reserved.</p>
          <p className="flex items-center gap-1 sm:mr-16">
            Crafted with <BiHeart className="text-red-500 animate-pulse" size={14} /> for a better community.
          </p>

          {/* Interactive Scroll-to-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute right-0 bottom-6 sm:bottom-4 w-10 h-10 rounded-xl bg-red-600 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-red-600 hover:border-red-500 shadow-lg hover:shadow-red-900/30 flex items-center justify-center transition-all duration-300 group cursor-pointer"
          >
            <FiArrowUp size={18} className="transform group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}