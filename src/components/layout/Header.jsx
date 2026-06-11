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
          ? "bg-background/95 backdrop-blur-lg border-border/80 shadow-md shadow-black/5" 
          : "bg-background/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start gap-0.5 hover:opacity-90 transition-opacity group">
          <span className="font-urdu text-2xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">حق دار</span>
          <span className="text-[10px] font-garamond italic font-bold tracking-widest text-accent uppercase leading-none">HaqDar AI</span>
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
            <SheetContent side="start" className="w-[300px] sm:w-[400px] bg-card border-e border-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="flex flex-col items-start gap-1">
                  <span className="font-urdu text-3xl font-bold text-foreground">حق دار</span>
                  <span className="text-xs font-garamond italic font-bold tracking-widest text-accent uppercase">HaqDar AI</span>
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
