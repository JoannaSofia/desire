'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Menu from './Menu';
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useSession } from '../hooks/useSession';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();
  const handleClick = () => setIsOpen(!isOpen);
  const supabase = getSupabaseBrowserClient();
  const logout = async () => { await supabase.auth.signOut(); };


  return (
    <nav className="relative ">
      {/* Navbar row */}
      <div className="flex bg-[#FAF8F6] items-center justify-between h-16 px-4 md:px-8 z-[900]relative">
        <ul className='flex flex-row gap-6 hidden md:flex'>
          <li><Link href="/" className='font-medium text-stone-800'>Desire</Link></li>
          <li><Link href="/wins" className='font-medium text-stone-800'>Add small win</Link></li>
        </ul>

        {/* Hamburger on the left */}
        <Button
          onClick={handleClick}
          className="flex flex-col justify-center items-center h-12 w-12 md:hidden"
        >
          <span
            className={`bg-stone-700 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
          />
          <span
            className={`bg-stone-700 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`bg-stone-700 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
          />
        </Button>
        <div className='hidden md:flex'>
          {session ? (
            <Button variant="default" className="bg-[#45214F] text-white" onClick={logout}>Logout</Button>
          ) : (
            <Link href="/authentication">
              <Button variant="default" className="bg-[#45214F] text-white">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {/* Slide-out menu */}
      {isOpen && (
        <Menu onClose={() => setIsOpen(false)} />
      )}
    </nav>
  );
}