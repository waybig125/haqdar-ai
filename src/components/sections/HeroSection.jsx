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
    ? count.toString().replace(/\d/g, d => ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][d])
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
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left / Center content */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-start relative">

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
              <h1 className="font-garamond text-5xl md:text-7xl lg:text-[6rem] font-black mb-1 tracking-wider uppercase gold-gradient-text-light leading-none select-none drop-shadow-[0_0_25px_rgba(197,160,89,0.2)] text-center md:text-left" dir="ltr">
                HaqDar AI
              </h1>
              <p className="font-garamond italic text-base md:text-xl lg:text-2xl font-bold tracking-[0.2em] text-accent uppercase mb-6 text-center md:text-left" dir="ltr">
                AI-Powered Rights Empowerment
              </p>
            </AnimatedContainer>

            <AnimatedContainer variant="fadeUp" delay={0.3} className="space-y-5 relative z-10">
              <h2 className="font-urdu text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.4] text-foreground drop-shadow-sm">
                جب آواز قانون بن جائے
              </h2>
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

          {/* Right Column: Decorative Gold Medallion */}
          <div className="hidden md:flex col-span-1 md:col-span-5 items-center justify-center relative mt-12 md:mt-0">
            <AnimatedContainer variant="fadeUp" delay={0.3} className="relative z-10">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
                <GeometricMedallion
                  size={360}
                  className="shrink-0 drop-shadow-[0_4px_30px_rgba(197,160,89,0.3)]"
                />
              </div>
            </AnimatedContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
