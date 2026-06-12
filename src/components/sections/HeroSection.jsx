"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { GeometricMedallion } from '@/components/ui/GeometricMedallion';

const CountUp = ({ to, prefix = "", suffix = "", isUrdu = false }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1500;
    const end = to;
    const step = Math.max(Math.ceil(end / (duration / 30)), 1);
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [to]);

  const formatted = isUrdu 
    ? count.toString().replace(/\d/g, d => ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'][d])
    : count.toLocaleString();

  return <span>{prefix}{formatted}{suffix}</span>;
};

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
          <div className="col-span-1 md:col-span-8 flex flex-col items-center md:items-start text-center md:text-start">
            
            <AnimatedContainer variant="fadeUp" delay={0.2}>
              <h1 className="font-garamond text-5xl md:text-8xl font-black mb-1 tracking-wider uppercase gold-gradient-text-light leading-none select-none">
                HaqDar AI
              </h1>
              <p className="font-garamond italic text-lg md:text-xl font-bold tracking-widest text-accent uppercase mb-4" dir="ltr">
                AI-Powered Rights Empowerment for Pakistan
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.3} className="space-y-4">
              <h2 className="font-urdu text-4xl md:text-6xl font-bold leading-[1.4] text-foreground">
                آواز میں انصاف کی طاقت
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-inter" dir="ltr">
                Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint in Urdu or English, know your rights, and draft formal legal petitions instantly.
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.4} className="mt-6">
              <Button 
                size="lg" 
                onClick={scrollToInput}
                className="bezel-btn px-10 h-14 font-urdu text-xl rounded-lg border border-accent/40 shadow-xl cursor-pointer"
              >
                شکایت درج کریں
                <ArrowDown className="ms-2 w-5 h-5 animate-bounce text-accent" />
              </Button>
            </AnimatedContainer>

            {/* Impact Counter Stat Bar */}
            <AnimatedContainer variant="fadeUp" delay={0.5} className="mt-12 w-full max-w-lg no-print">
              <div className="parchment-sheet rounded-xl p-4 md:p-5 border border-[#C5B69C] dark:border-[#36221A] flex items-center justify-around gap-4 shadow-md text-center">
                <div className="flex flex-col items-center">
                  <span className="font-urdu text-2xl md:text-3xl font-bold text-accent">
                    <CountUp to={1247} suffix="+" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-inter mt-1">
                    شکایات / Filed
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-accent/20" />
                <div className="flex flex-col items-center">
                  <span className="font-urdu text-2xl md:text-3xl font-bold text-accent">
                    <CountUp to={1120} suffix="+" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-inter mt-1">
                    پٹیشنیں / Drafted
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-accent/20" />
                <div className="flex flex-col items-center">
                  <span className="font-urdu text-2xl md:text-3xl font-bold text-accent">
                    <CountUp to={94} suffix="%" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-inter mt-1">
                    درستگی / Accuracy
                  </span>
                </div>
              </div>
            </AnimatedContainer>

          </div>

          {/* Right Column: Decorative Gold Rosette Medallion (now responsive) */}
          <div className="col-span-1 md:col-span-4 flex items-center justify-center relative mt-8 md:mt-0">
            <AnimatedContainer variant="fadeUp" delay={0.3} className="relative z-10">
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />
                <GeometricMedallion 
                  size={160} 
                  className="animate-[spin_120s_linear_infinite] md:hidden shrink-0" 
                />
                <GeometricMedallion 
                  size={300} 
                  className="animate-[spin_120s_linear_infinite] hidden md:block shrink-0" 
                />
              </div>
            </AnimatedContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
