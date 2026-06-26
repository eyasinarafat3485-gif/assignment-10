import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950/70 px-6 relative overflow-hidden">
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:50px_50px]" />

            <div className="text-center max-w-lg relative z-10">
                {/* 404 Number */}
                <p className="text-5xl md:text-9xl font-black text-red-600/30 dark:text-white/10 tracking-tighter">
                    404
                </p>

                <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-white">
                    Page not found
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                    Sorry, we couldn’t find the page you’re looking for.<br />
                    Let’s get you back on track.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        href="/" 
                        className="rounded-2xl bg-red-600 hover:bg-red-700 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-red-900/30 cursor-pointer transition-all duration-200 flex items-center gap-2"
                    ><FaArrowLeft />
                        Go back home
                        <span aria-hidden="true"></span>
                    </Link>
                </div>

                {/* LifeStream Branding */}
                <div className="mt-16 flex justify-center">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <span className="text-xl">🩸</span>
                        <span className="font-bold tracking-widest text-sm">LIFESTREAM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;