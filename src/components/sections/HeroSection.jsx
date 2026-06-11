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
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center relative z-10">
        
        <AnimatedContainer variant="fadeUp" delay={0.1}>
          <div className="mb-6 flex justify-center">
            <SDGBadge variant="both" />
          </div>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2}>
          <h1 className="font-urdu text-5xl md:text-7xl font-bold text-foreground mb-4 leading-[1.2]">
            آواز میں <span className="text-primary">انصاف</span><br />
            کی <span className="text-accent">طاقت</span>
          </h1>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.3}>
          <p className="text-xl md:text-2xl font-inter text-muted-foreground mb-3 font-light tracking-wide max-w-3xl mx-auto">
            The Power of Justice in <span className="text-foreground font-medium">Every Voice.</span>
          </p>
          <p className="text-base text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
            Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint, know your rights, and get your official letter drafted instantly.
          </p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.4}>
          <Button 
            size="lg" 
            onClick={scrollToInput}
            className="px-8 font-urdu shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            شکایت درج کریں
            <ArrowDown className="ms-2 w-5 h-5" />
          </Button>
        </AnimatedContainer>

      </div>
    </section>
  );
}
