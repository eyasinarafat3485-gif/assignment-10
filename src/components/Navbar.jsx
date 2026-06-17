'use client';

import { Avatar, Button, Spinner } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/blood-logo.jpg';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoading = isPending;

    const handleSignOut = async () => {
        await authClient.signOut();
        redirect('/login');
    };

    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const pathname = usePathname();

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
            { name: 'Search Donor ', href: '/search-donor' },
        ];

    return (
        <nav className='sticky z-50 w-full bg-zinc-950/70 backdrop-blur-md'>
            <div className='max-w-7xl mx-auto h-20 px-5 lg:px-14 flex justify-between items-center'>

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
                                className={`font-semibold text-lg transition ${pathname === link.href ? 'text-red-500' : 'text-white hover:text-red-400'
                                    }`}
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
                        <div className='relative'>
                            <button onClick={() => setProfileOpen(!profileOpen)}>
                                <Avatar>
                                    <Avatar.Image src={user?.image} name={user?.name} />
                                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                </Avatar>
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className='absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border overflow-hidden z-50'
                                    >
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setProfileOpen(false)}
                                            className='block px-4 py-3 font-medium text-gray-800 hover:bg-red-50'
                                        >
                                            Dashboard
                                        </Link>

                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setProfileOpen(false);
                                            }}
                                            className='w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50'
                                        >
                                            Logout
                                        </button>
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

                    {/* MOBILE BUTTON */}
                    <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden text-white text-3xl'>
                        {isOpen ? <BiX className='text-red-500' /> : <BiMenu />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='lg:hidden bg-zinc-900 px-5 py-5'
                    >
                        <ul className='flex flex-col gap-2'>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block p-3 rounded-lg font-semibold ${pathname === link.href ? 'text-red-500 bg-red-500/10' : 'text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}

                            <hr className='border-zinc-700 my-2' />

                            {isLoading ? (
                                <div className='flex justify-center'>
                                    <Spinner />
                                </div>
                            ) : user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className='block text-white p-3 rounded-lg hover:bg-zinc-800'
                                    >
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsOpen(false);
                                        }}
                                        className='w-full text-left text-red-500 p-3'
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className='block text-white p-3'>
                                        Login
                                    </Link>
                                    <Link href="/register" className='block bg-red-600 text-white text-center rounded-lg p-3'>
                                        Register
                                    </Link>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;