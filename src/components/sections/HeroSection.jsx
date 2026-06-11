"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const scrollToInput = () => {
    const el = document.getElementById('complaint-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center relative z-10">
        
        <AnimatedContainer variant="fadeUp" delay={0.1}>
          <div className="mb-8 flex justify-center">
            <SDGBadge variant="both" />
          </div>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2}>
          <h1 className="font-urdu text-5xl md:text-7xl font-bold mb-6 leading-[1.3] bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground">
            آواز میں انصاف<br />
            کی طاقت
          </h1>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.3}>
          <p className="text-2xl md:text-3xl font-garamond italic text-muted-foreground mb-4 tracking-wide max-w-3xl mx-auto" dir="ltr">
            The Power of Justice in <span className="text-accent font-semibold not-italic">Every Voice.</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed font-inter" dir="ltr">
            Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint in Urdu or English, know your rights, and draft formal legal petitions instantly.
          </p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.4}>
          <Button 
            size="lg" 
            onClick={scrollToInput}
            className="px-10 h-14 rounded-lg font-urdu text-xl shadow-xl shadow-primary/5 dark:shadow-black/20 hover:shadow-primary/15 transition-all hover:-translate-y-0.5 border border-accent/30 hover:border-accent cursor-pointer"
          >
            شکایت درج کریں
            <ArrowDown className="ms-2 w-5 h-5 animate-bounce" />
          </Button>
        </AnimatedContainer>

      </div>
    </section>
  );
}

