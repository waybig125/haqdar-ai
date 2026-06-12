"use client";

import React from 'react';
import { SDGBadge } from "@/components/ui/SDGBadge";
import { Heart } from "lucide-react";
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden border-t border-[#C5B69C] dark:border-[#523225] bg-[#FAF4E5] dark:bg-[#1D120E]">
      
      {/* Background Subtle Ledger Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,rgba(197,160,89,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Branding */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2.5">
              <GeometricMedallion size={28} className="shrink-0 drop-shadow-[0_2px_6px_rgba(197,160,89,0.2)]" />
              <h3 className="font-urdu text-2xl font-bold text-foreground">حق دار</h3>
            </div>
            <p className="text-[9px] font-garamond italic font-bold tracking-[0.18em] text-accent uppercase leading-none mt-1">HaqDar AI</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-3 font-inter">
              Built with <Heart className="w-3.5 h-3.5 text-red-600 dark:text-red-500 fill-current animate-pulse" /> for Code for Pakistan
            </p>
          </div>

          {/* SDGs */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-inter mb-1">Empowering UN SDGs</span>
            <div className="flex items-center gap-2.5">
              <SDGBadge variant="sdg16" />
              <SDGBadge variant="sdg10" />
            </div>
          </div>

          {/* Github / Linkages */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-inter mb-1">Source Repository</span>
            <a 
              href="https://github.com/waybig125/haqdar-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bezel-btn rounded px-4 py-1.5 flex items-center gap-2 text-xs font-bold font-inter text-accent cursor-pointer shadow-md"
              aria-label="GitHub Repository"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-accent"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub Project
            </a>
          </div>

        </div>
        
        {/* copyright */}
        <div className="mt-10 pt-6 border-t border-accent/15 dark:border-[#523225]/40 text-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-inter">
          <p>&copy; {new Date().getFullYear()} HaqDar AI. Dedicated to Legal Accessibility & Transparency.</p>
        </div>
      </div>
    </footer>
  );
}
