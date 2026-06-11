"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';

export function HeroSection() {
  const scrollToInput = () => {
    const el = document.getElementById('complaint-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center content */}
          <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-start">
            
            <AnimatedContainer variant="fadeUp" delay={0.1}>
              <div className="mb-6 flex justify-center md:justify-start">
                <SDGBadge variant="both" />
              </div>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.2}>
              <h1 className="font-garamond text-5xl md:text-8xl font-black mb-1 tracking-wider uppercase bg-gradient-to-b from-[#FAF4E5] via-[#C5A059] to-[#8A6635] text-transparent bg-clip-text filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] leading-none select-none">
                HaqDar AI
              </h1>
              <p className="font-garamond italic text-lg md:text-xl font-bold tracking-widest text-accent uppercase mb-8" dir="ltr">
                AI-Powered Rights Empowerment for Pakistan
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.3} className="space-y-6">
              <h2 className="font-urdu text-4xl md:text-6xl font-bold leading-[1.3] text-foreground">
                آواز میں انصاف کی طاقت
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-inter" dir="ltr">
                Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint in Urdu or English, know your rights, and draft formal legal petitions instantly.
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.4} className="mt-10">
              <Button 
                size="lg" 
                onClick={scrollToInput}
                className="bezel-btn px-10 h-14 font-urdu text-xl rounded-lg border border-accent/40 shadow-xl cursor-pointer"
              >
                شکایت درج کریں
                <ArrowDown className="ms-2 w-5 h-5 animate-bounce text-accent" />
              </Button>
            </AnimatedContainer>

          </div>

          {/* Right Column: Decorative Gold Rosette Medallion */}
          <div className="hidden md:col-span-4 md:flex items-center justify-center relative">
            <AnimatedContainer variant="fadeUp" delay={0.3} className="relative z-10">
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />
                <GeometricMedallion size={300} className="animate-[spin_120s_linear_infinite]" />
              </div>
            </AnimatedContainer>
          </div>

        </div>
      </div>
    </section>
  );
}


