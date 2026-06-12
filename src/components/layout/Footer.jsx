"use client";

import React from 'react';
import { SDGBadge } from "@/components/ui/SDGBadge";
import { Heart } from "lucide-react";
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden mt-12 backdrop-blur-xl bg-[#FAF4E5]/80 dark:bg-[#1D120E]/80 border-t border-accent/20 dark:border-accent/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]" dir="ltr">
      
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(197,160,89,0.4),transparent_50%)]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      <div className="container mx-auto px-6 py-14 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Logo & Branding - Takes up more space */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-3" dir="ltr">
            <div className="flex items-center gap-3">
              <GeometricMedallion size={36} className="shrink-0 drop-shadow-[0_4px_12px_rgba(197,160,89,0.3)]" />
              <div className="flex flex-col">
                <h3 className="font-urdu text-3xl font-bold text-foreground leading-none" dir="rtl">حق دار</h3>
                <p className="text-[10px] font-garamond italic font-bold tracking-[0.2em] text-accent uppercase mt-1">HaqDar AI</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed font-inter max-w-xs text-center md:text-left mt-2">
              Empowering citizens through AI-driven legal accessibility. Know your rights, file your complaints, and hold systems accountable.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <SDGBadge variant="sdg16" />
              <SDGBadge variant="sdg10" />
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4" dir="ltr">
            <span className="text-[10px] font-bold text-foreground uppercase tracking-widest font-inter flex items-center gap-2">
              <span className="w-4 h-px bg-accent"></span> Quick Links
            </span>
            <div className="flex flex-col gap-3 text-sm font-medium font-inter">
              <a href="/" className="text-muted-foreground hover:text-accent transition-all hover:translate-x-1 flex items-center gap-2">
                Home <span dir="rtl" className="font-urdu text-xs font-bold text-accent/70">/ شکایت</span>
              </a>
              <a href="/dashboard" className="text-muted-foreground hover:text-accent transition-all hover:translate-x-1 flex items-center gap-2">
                Dashboard <span dir="rtl" className="font-urdu text-xs font-bold text-accent/70">/ سول نبض</span>
              </a>
            </div>
          </div>

          {/* Disclaimer & Source */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4" dir="ltr">
            <span className="text-[10px] font-bold text-foreground uppercase tracking-widest font-inter flex items-center gap-2">
              <span className="w-4 h-px bg-accent"></span> Legal & Open Source
            </span>
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed font-inter italic text-center md:text-left bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-border/50">
              Disclaimer: HaqDar AI provides automated legal drafting guidance. It is not a substitute for professional legal advice.
            </p>
            <a 
              href="https://github.com/waybig125/haqdar-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2 text-xs font-bold font-inter text-foreground hover:text-accent transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-full border border-accent/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              View Source on GitHub
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-accent/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-inter" dir="ltr">
            <p>&copy; 2026 HaqDar AI. All Rights Reserved.</p>
          </div>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-inter font-medium">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20 animate-pulse" /> for Code for Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
