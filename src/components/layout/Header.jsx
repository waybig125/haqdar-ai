"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';

const NAV_LINKS = [
  { name: 'شکایت درج کریں (Home)', href: '/' },
  { name: 'سول نبض (Dashboard)', href: '/dashboard' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b h-16 flex items-center relative overflow-hidden",
        isScrolled 
          ? "bg-[#FAF4E5]/95 border-[#C5B69C] dark:bg-[#1D120E]/95 dark:border-[#523225] shadow-lg shadow-black/15" 
          : "bg-[#FAF4E5]/80 border-transparent dark:bg-[#1D120E]/80 backdrop-blur-md"
      )}
    >
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,rgba(197,160,89,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between relative z-10">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity group">
          <GeometricMedallion size={32} className="shrink-0 drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]" />
          <div className="flex flex-col items-start gap-0.5 pt-1">
            <span className="font-urdu text-2xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">حق دار</span>
            <span className="text-[9px] font-garamond italic font-bold tracking-[0.18em] text-accent uppercase leading-none mt-0.5">HaqDar AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 items-center border-e border-accent/20 dark:border-accent/10 pe-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent font-inter",
                  pathname === link.href ? "text-accent" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <SDGBadge variant="sdg16" className="hidden lg:flex" />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open Menu" className="cursor-pointer" />}>
              <Menu className="w-5 h-5 text-foreground" />
            </SheetTrigger>
            <SheetContent side="start" className="w-[300px] sm:w-[400px] bg-[#FAF4E5] dark:bg-[#1D120E] border-e border-[#C5B69C] dark:border-[#523225]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="flex items-center gap-3">
                  <GeometricMedallion size={36} className="shrink-0 drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]" />
                  <div className="flex flex-col items-start gap-0.5 pt-1">
                    <span className="font-urdu text-3xl font-bold text-foreground leading-tight">حق دار</span>
                    <span className="text-[10px] font-garamond italic font-bold tracking-[0.18em] text-accent uppercase leading-none mt-0.5">HaqDar AI</span>
                  </div>
                </Link>

                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={cn(
                        "text-sm font-semibold uppercase tracking-widest py-2.5 border-b border-accent/10 transition-colors hover:text-accent font-inter",
                        pathname === link.href ? "text-accent border-accent/30" : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 mt-auto pt-8 border-t border-accent/10">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-inter mb-1">Sustainable Development Goals</span>
                  <SDGBadge variant="both" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
