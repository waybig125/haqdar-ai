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
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        
        <AnimatedContainer variant="fadeUp" delay={0.1}>
          <div className="mb-6 flex justify-center">
            <SDGBadge variant="both" />
          </div>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2}>
          <h1 className="font-urdu text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            اپنی شکایت درج کریں — <br className="hidden md:block" />
            <span className="text-primary">اپنے حقوق جانیں</span>
          </h1>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.3}>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            Speak your complaint. Know your rights. Get your letter. <br />
            Pakistan's first voice-enabled AI legal rights assistant.
          </p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.4}>
          <Button 
            size="lg" 
            onClick={scrollToInput}
            className="rounded-full px-8 h-14 text-lg font-urdu shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
          >
            شکایت درج کریں
            <ArrowDown className="ms-2 w-5 h-5" />
          </Button>
        </AnimatedContainer>

      </div>
    </section>
  );
}
