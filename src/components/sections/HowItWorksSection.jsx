"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { Mic, Sparkles, FileSpreadsheet } from 'lucide-react';

const STEPS = [
  {
    icon: Mic,
    num: "۱",
    titleUrdu: "شکایت ریکارڈ کریں",
    titleEnglish: "Record Complaint",
    descUrdu: "مائیک بٹن کو دبا کر اپنی شکایت اردو یا انگریزی آواز میں بیان کریں۔ ایپ خود بخود آواز کو متن میں تبدیل کر دے گی۔",
    descEnglish: "Press the mic button to speak in Urdu or English. HaqDar AI automatically transcribes your voice to text."
  },
  {
    icon: Sparkles,
    num: "۲",
    titleUrdu: "خودکار قانونی تجزیہ",
    titleEnglish: "AI Legal Analysis",
    descUrdu: "ہمارا طاقتور AI آپ کی شکایت کا تجزیہ کر کے متعلقہ خلاف ورزی شدہ قوانین اور ذمہ دار محکمے کا تعین کرتا ہے۔",
    descEnglish: "Our advanced AI processes your case to detect relevant violated laws, references, and responsible departments."
  },
  {
    icon: FileSpreadsheet,
    num: "۳",
    titleUrdu: "شکایتی پٹیشن حاصل کریں",
    titleEnglish: "Generate Petition",
    descUrdu: "فوری طور پر ایک رسمی قانونی پٹیشن حاصل کریں جسے آپ کاپی کر کے متعلقہ محکمے میں جمع کروا سکتے ہیں۔",
    descEnglish: "Instantly draft a polished legal petition ready to be copied and filed with the appropriate authorities."
  }
];

export function HowItWorksSection() {
  return (
    <section className="w-full py-16 bg-[#3A231A]/5 border-y border-accent/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedContainer variant="fadeUp">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent font-inter block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="font-garamond text-3xl md:text-5xl font-black mb-3 gold-gradient-text-light">
              طریقہ کار / How It Works
            </h2>
            <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full mt-4" />
          </AnimatedContainer>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <AnimatedContainer 
                key={idx} 
                variant="fadeUp" 
                delay={idx * 0.15}
                className="flex"
              >
                <div className="parchment-sheet rounded-2xl p-6 md:p-8 flex flex-col items-center text-center relative w-full border border-accent/20 hover:border-accent/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-b from-[#2A170F] to-[#1C0F0A] border-2 border-accent flex items-center justify-center text-accent font-urdu text-xl font-bold shadow-md">
                    {step.num}
                  </div>

                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 rounded-full bg-[#3A231A]/10 flex items-center justify-center text-accent mt-2 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Urdu Content */}
                  <div className="mb-4">
                    <h3 className="font-urdu text-2xl font-bold text-amber-950 dark:text-amber-100 mb-2 leading-relaxed" dir="rtl">
                      {step.titleUrdu}
                    </h3>
                    <p className="font-urdu text-[15px] text-amber-900/70 dark:text-amber-100/60 leading-[2.1]" dir="rtl">
                      {step.descUrdu}
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className="w-12 h-[1px] bg-accent/20 my-3" />

                  {/* English Content */}
                  <div>
                    <h4 className="font-garamond text-md font-bold text-amber-950 dark:text-amber-100/90 mb-1.5 uppercase tracking-wider">
                      {step.titleEnglish}
                    </h4>
                    <p className="font-inter text-xs text-amber-900/60 dark:text-amber-100/50 leading-relaxed">
                      {step.descEnglish}
                    </p>
                  </div>

                </div>
              </AnimatedContainer>
            );
          })}
        </div>

      </div>
    </section>
  );
}
