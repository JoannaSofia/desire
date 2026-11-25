'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
//import Menu from './Menu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      {/* Navbar row */}
      <div className="flex items-center justify-between h-16 px-4 md:px-8 bg-white z-[900]relative">
        <ul className='flex flex-row gap-6 hidden md:flex'>
          <li><Link href="/" className='font-medium text-stone-800'>Desire</Link></li>
          <li><Link href="/Wins" className='font-medium text-stone-800'>Add small win</Link></li>
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


       
      </div>

    </nav>
  );
}
