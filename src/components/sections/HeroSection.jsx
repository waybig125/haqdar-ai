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
          <div className="col-span-1 md:col-span-8 flex flex-col items-center md:items-start text-center md:text-start relative">
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute top-40 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />

            <AnimatedContainer variant="fadeUp" delay={0.2} className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-6">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-inter">Live Beta / لائیو بیٹا</span>
              </div>
              <h1 className="font-garamond text-6xl md:text-8xl lg:text-[7rem] font-black mb-1 tracking-wider uppercase gold-gradient-text-light leading-none select-none drop-shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                HaqDar AI
              </h1>
              <p className="font-garamond italic text-lg md:text-2xl font-bold tracking-[0.25em] text-accent uppercase mb-6" dir="ltr">
                AI-Powered Rights Empowerment
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.3} className="space-y-5 relative z-10">
              <h2 className="font-urdu text-4xl md:text-6xl font-bold leading-[1.4] text-foreground drop-shadow-sm">
                آواز میں انصاف کی طاقت
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-inter bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-white/5 dark:border-white/5 shadow-inner" dir="ltr">
                Pakistan's first voice-enabled AI legal rights assistant. Speak your complaint in Urdu or English, know your rights, and draft formal legal petitions instantly.
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.4} className="mt-8 relative z-10">
              <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-emerald-500 to-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500 group-hover:duration-200 animate-gradient-x"></div>
                <Button 
                  size="lg" 
                  onClick={scrollToInput}
                  className="bezel-btn relative px-10 h-14 font-urdu text-xl rounded-lg border border-accent/40 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  شکایت درج کریں
                  <ArrowDown className="ms-2 w-5 h-5 animate-bounce text-accent drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]" />
                </Button>
              </div>
            </AnimatedContainer>

            {/* Impact Counter Stat Bar */}
            <AnimatedContainer variant="fadeUp" delay={0.5} className="mt-14 w-full max-w-lg no-print relative z-10">
              <div className="parchment-sheet backdrop-blur-md rounded-2xl p-5 md:p-6 border border-accent/30 flex items-center justify-around gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 pointer-events-none" />
                <div className="flex flex-col items-center relative z-10">
                  <span className="font-urdu text-3xl md:text-4xl font-black text-accent drop-shadow-sm">
                    <CountUp to={1247} suffix="+" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-inter mt-1.5">
                    شکایات / Filed
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
                <div className="flex flex-col items-center relative z-10">
                  <span className="font-urdu text-3xl md:text-4xl font-black text-accent drop-shadow-sm">
                    <CountUp to={1120} suffix="+" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-inter mt-1.5">
                    پٹیشنیں / Drafted
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
                <div className="flex flex-col items-center relative z-10">
                  <span className="font-urdu text-3xl md:text-4xl font-black text-accent drop-shadow-sm">
                    <CountUp to={94} suffix="%" isUrdu />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-inter mt-1.5">
                    درستگی / Accuracy
                  </span>
                </div>
              </div>
            </AnimatedContainer>

          </div>

          {/* Right Column: Decorative Gold Rosette Medallion (now responsive) */}
          <div className="col-span-1 md:col-span-4 flex items-center justify-center relative mt-12 md:mt-0">
            <AnimatedContainer variant="fadeUp" delay={0.3} className="relative z-10">
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-emerald-500/20 rounded-full blur-[60px] opacity-40 animate-pulse pointer-events-none transform -rotate-12 scale-110" />
                <GeometricMedallion 
                  size={160} 
                  className="md:hidden shrink-0 transition-transform duration-700 hover:scale-105 hover:rotate-3" 
                />
                <GeometricMedallion 
                  size={340} 
                  className="hidden md:block shrink-0 transition-transform duration-700 hover:scale-105 hover:rotate-3" 
                />
              </div>
            </AnimatedContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
