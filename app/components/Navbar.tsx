"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Domů" },
    { href: "/o-nas", label: "O nás" },
    { href: "/menu", label: "Menu" },
    { href: "/prostory", label: "Prostory" },
    { href: "/svatby-a-akce", label: "Svatby a akce" },
    { href: "/galerie", label: "Galerie" },
    { href: "/kontakt", label: "Kontakt", style: "green-btn"},
  ];

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 w-full z-50 bg-[var(--white)] shadow-md
          ${isOpen ? '' : ''} 
        `}
      >
        <div className='width-page px-3 sm:px-6 lg:px-8'>
          <div className="flex items-center justify-between h-16">
            <div>
              <Link className='text-[var(--brown)] text-3xl font-[family-name:var(--font-playfair)]'  href="/" onClick={() => setIsOpen(false)}>
                Hostinec na Nové
              </Link>
            </div>

            <div className="hidden lg:flex md:space-x-1 items-center text-[var(--black)]">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    href={link.href}
                    key={link.label}
                    className={`
                      ${link.style}
                      mx-2 transition duration-300 text-base
                      ${isActive 
                        ? 'text-[var(--green)]'
                        : ''
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-1"
                aria-controls="mobile-menu-items"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Otevřít hlavní menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" /> 
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div 
          id="mobile-menu-items" 
          className={`
            ${isOpen ? 'block' : 'hidden'} 
            lg:hidden 
            absolute top-full left-0 right-0 w-full text-[var(--black)]
          `}
        >
          <div className="py-1 space-y-1 px-2 bg-[var(--white)]">
            {navLinks.map(link => (
              <Link
                href={link.href}
                key={link.label}
                className="block text-center py-1 bg-[var(--white)]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;