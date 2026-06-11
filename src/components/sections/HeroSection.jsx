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
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
      
      <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-10">
        
        <AnimatedContainer variant="fadeUp" delay={0.1}>
          <div className="mb-8 flex justify-center">
            <SDGBadge variant="both" className="bg-background/40 backdrop-blur-md border-border/20 shadow-sm" />
          </div>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2}>
          <h1 className="font-urdu text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-foreground mb-4 leading-[1.1] tracking-tight drop-shadow-sm mix-blend-hard-light dark:mix-blend-normal">
            آواز میں <span className="text-primary/90">انصاف</span><br />
            کی <span className="text-accent/90">طاقت</span>
          </h1>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.3}>
          <p className="text-xl md:text-3xl font-inter text-muted-foreground mb-4 font-light tracking-wide max-w-3xl mx-auto">
            The Power of Justice in <span className="text-foreground font-medium">Every Voice.</span>
          </p>
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
            Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint, know your rights, and get your official letter drafted instantly.
          </p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.4}>
          <Button 
            size="lg" 
            onClick={scrollToInput}
            className="rounded-full px-10 h-16 text-xl font-urdu shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 bg-foreground text-background hover:bg-foreground/90"
          >
            شکایت درج کریں
            <ArrowDown className="ms-3 w-6 h-6 animate-bounce" />
          </Button>
        </AnimatedContainer>

      </div>
    </section>
  );
}
