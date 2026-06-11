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
        "sticky top-0 z-50 w-full transition-all duration-300 border-b h-16 flex items-center",
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-border/40 shadow-sm" 
          : "bg-background/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start gap-0 hover:opacity-80 transition-opacity">
          <span className="font-urdu text-2xl font-bold text-primary leading-none drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">حق دار</span>
          <span className="text-[10px] font-inter font-medium tracking-wider text-muted-foreground uppercase">HaqDar AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 items-center border-e border-border/40 pe-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
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
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open Menu" />}>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="start" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="flex flex-col items-start gap-0">
                  <span className="font-urdu text-3xl font-bold text-primary">حق دار</span>
                  <span className="text-xs font-inter font-medium tracking-wider text-muted-foreground uppercase">HaqDar AI</span>
                </Link>
                
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={cn(
                        "text-lg font-medium py-2 border-b border-border/40 transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary border-primary" : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 mt-auto pt-8">
                  <span className="text-sm text-muted-foreground mb-2">Sustainable Development Goals</span>
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
