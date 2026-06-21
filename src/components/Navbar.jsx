'use client';

import { Avatar, Button, Spinner } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/blood-logo.jpg';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoading = isPending;
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut();
        redirect('/login');
    };

    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const desktopProfileRef = useRef(null);

    // Dynamic Dashboard URL based on user role
    const dashboardHref = user?.role
        ? `/dashboard/${user.role}`
        : '/dashboard/donor';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (desktopProfileRef.current && !desktopProfileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    // Dynamic Navbar Links
    const navLinks = user
        ? [
            { name: 'Home', href: '/' },
            { name: 'Donation Requests', href: '/donation-requests' },
            { name: 'Funding', href: '/funding' },
        ]
        : [
            { name: 'Home', href: '/' },
            { name: 'Donation Requests', href: '/donation-requests' },
            { name: 'Search Donor', href: '/search-donor' },
        ];

    return (
        <nav className='sticky z-50 w-full border-b bg-zinc-950/70 backdrop-blur-md'>
            <div className=' mx-auto h-20 px-5 lg:px-8 flex justify-between items-center'>

                {/* LOGO */}
                <Link href="/" className='flex items-center gap-2'>
                    <Image
                        src={logo}
                        width={50}
                        height={50}
                        alt="BloodBridge"
                        className='w-11 h-11 rounded-lg object-cover'
                    />
                    <p className='font-bold text-2xl md:text-3xl text-red-500'>
                        Blood<span className='text-white'>Bridge</span>
                    </p>
                </Link>

                {/* DESKTOP MENU */}
                <ul className='hidden lg:flex gap-8 items-center'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`font-semibold text-lg transition ${pathname === link.href ? 'text-red-500' : 'text-white hover:border-b-2 border-red-400'}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* RIGHT SECTION */}
                <div className='flex items-center gap-4'>
                    {isLoading ? (
                        <Loader2 className='animate-spin text-red-500' />
                    ) : user ? (
                        /* DESKTOP PROFILE DROPDOWN */
                        <div className='relative hidden lg:block' ref={desktopProfileRef}>
                            <button onClick={() => setProfileOpen(!profileOpen)} className="block focus:outline-none">
                                <Avatar size="sm" className="ring-2 ring-red-500/20 cursor-pointer">
                                    <Avatar.Image src={user?.image} name={user?.name} />
                                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                </Avatar>
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className='absolute right-0 mt-3 w-56 p-2 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 origin-top-right'
                                    >
                                        {/* USER INFO */}
                                        <div className='flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-900 mb-1.5'>
                                            <Avatar size="sm" className="ring-2 ring-red-500/20">
                                                <Avatar.Image src={user?.image} name={user?.name} />
                                                <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                            </Avatar>
                                            <div className='flex flex-col min-w-0'>
                                                <p className='text-xs font-bold text-zinc-200 truncate'>{user?.name}</p>
                                                <p className='text-[10px] text-zinc-500 truncate'>{user?.email}</p>
                                            </div>
                                        </div>

                                        <hr className='border-zinc-900 my-1 mx-2' />

                                        <ul className='flex flex-col gap-1'>
                                            <li>
                                                <Link
                                                    href={dashboardHref}
                                                    onClick={() => setProfileOpen(false)}
                                                    className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${pathname.startsWith('/dashboard')
                                                            ? 'text-red-500 bg-red-500/10 border border-red-500/20'
                                                            : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                                                        }`}
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        handleSignOut();
                                                        setProfileOpen(false);
                                                    }}
                                                    className='w-full text-left px-4 py-2.5 text-sm font-bold text-red-500/90 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer'
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className='hidden md:block text-white font-semibold hover:text-red-500'>
                                Login
                            </Link>
                            <Link href="/register" className='hidden md:block bg-red-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-700'>
                                Register
                            </Link>
                        </>
                    )}

                    {/* MOBILE MENU BUTTON */}
                    <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden text-white text-3xl'>
                        {isOpen ? <BiX className='text-red-500' /> : <BiMenu />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className='absolute right-5 top-[calc(100%+12px)] w-56 p-2 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 origin-top-right'
                    >
                        {user && (
                            <>
                                <div className='flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-900 mb-1.5'>
                                    <Avatar size="sm" className="ring-2 ring-red-500/20">
                                        <Avatar.Image src={user?.image} name={user?.name} />
                                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                    </Avatar>
                                    <div className='flex flex-col min-w-0'>
                                        <p className='text-xs font-bold text-zinc-200 truncate'>{user?.name}</p>
                                        <p className='text-[10px] text-zinc-500 truncate'>{user?.email}</p>
                                    </div>
                                </div>
                                <hr className='border-zinc-900 my-1 mx-2' />
                            </>
                        )}

                        <ul className='flex flex-col gap-1'>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${isActive
                                                    ? 'text-red-500 bg-red-500/10 border border-red-500/20'
                                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}

                            <hr className='border-zinc-900 my-1.5 mx-2' />

                            {user && (
                                <>
                                    <li>
                                        <Link
                                            href={dashboardHref}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${pathname.startsWith('/dashboard')
                                                    ? 'text-red-500 bg-red-500/10 border border-red-500/20'
                                                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                                                }`}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setIsOpen(false);
                                            }}
                                            className='w-full text-left px-4 py-2.5 text-sm font-bold text-red-500/90 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer'
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}

                            {!user && (
                                <div className="grid grid-cols-2 gap-2 p-1 pt-1.5">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className='block text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-850 text-center font-bold text-xs rounded-xl py-2.5 border border-zinc-800 transition-all'
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className='block bg-gradient-to-b from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-center font-black text-xs rounded-xl py-2.5 shadow-md shadow-red-950/40 transition-all cursor-pointer'
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;