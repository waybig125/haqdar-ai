"use client";

import React from 'react';
import { SDGBadge } from "@/components/ui/SDGBadge";
import { Heart } from "lucide-react";
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden border-t border-[#C5B69C] dark:border-[#523225] bg-[#FAF4E5] dark:bg-[#1D120E]">
      
      {/* Background Subtle Ledger Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,rgba(197,160,89,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Logo & Branding */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <div className="flex items-center gap-2.5">
              <GeometricMedallion size={28} className="shrink-0 drop-shadow-[0_2px_6px_rgba(197,160,89,0.2)]" />
              <h3 className="font-urdu text-2xl font-bold text-foreground">حق دار</h3>
            </div>
            <p className="text-[9px] font-garamond italic font-bold tracking-[0.18em] text-accent uppercase leading-none mt-1">HaqDar AI</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-3 font-inter">
              Built with <Heart className="w-3.5 h-3.5 text-red-600 dark:text-red-500 fill-current animate-pulse" /> for Code for Pakistan
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-inter mb-1">Quick Links</span>
            <div className="flex flex-col items-center sm:items-start gap-2 text-xs font-semibold font-inter">
              <a href="/" className="text-muted-foreground hover:text-accent transition-colors">Home / شکایت</a>
              <a href="/dashboard" className="text-muted-foreground hover:text-accent transition-colors">Dashboard / سول نبض</a>
              <a href="https://github.com/waybig125/haqdar-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">GitHub Project</a>
            </div>
          </div>

          {/* SDGs */}
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-inter mb-1">Empowering UN SDGs</span>
            <div className="flex items-center gap-2.5">
              <SDGBadge variant="sdg16" />
              <SDGBadge variant="sdg10" />
            </div>
          </div>

          {/* Disclaimer & Repository Link */}
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-inter mb-1">Disclaimer & Source</span>
            <p className="text-[10px] text-muted-foreground leading-relaxed max-w-[220px] font-inter italic opacity-80 mb-2">
              Disclaimer: HaqDar AI provides automated guidance. It is not a substitute for professional legal advice.
            </p>
            <a 
              href="https://github.com/waybig125/haqdar-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bezel-btn rounded px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold font-inter text-accent cursor-pointer shadow-sm"
              aria-label="GitHub Repository"
            >
              GitHub Project
            </a>
          </div>

        </div>

        {/* Gold Shimmer Divider */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-40 mt-10 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
        </div>
        
        {/* copyright */}
        <div className="pt-2 text-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-inter">
          <p>&copy; {new Date().getFullYear()} HaqDar AI. Dedicated to Legal Accessibility & Transparency.</p>
        </div>
      </div>
    </footer>
  );
}
