"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { Scale, Users2 } from 'lucide-react';

export function SdgFocusSection() {
  return (
    <section className="w-full py-16 relative overflow-hidden">
      
      {/* Background Watermark/Aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/2 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedContainer variant="fadeUp">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent font-inter block mb-2">
              Sustainable Development Goals Alignment
            </span>
            <h2 className="font-garamond text-3xl md:text-5xl font-black mb-3 gold-gradient-text-light">
              پائیدار ترقیاتی اہداف / SDG Focus
            </h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed mt-2">
              HaqDar AI proudly targets key international United Nations SDGs to improve civic governance and standard of life.
            </p>
            <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full mt-4" />
          </AnimatedContainer>
        </div>

        {/* SDG Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SDG 16 */}
          <AnimatedContainer variant="fadeUp" delay={0.1}>
            <div className="wood-console rounded-2xl p-6 md:p-8 flex flex-col h-full border border-accent/20 relative group hover:scale-[1.01] transition-transform duration-300">
              
              {/* Badge Anchor */}
              <div className="absolute top-4 right-4 bg-emerald-800/10 dark:bg-emerald-500/10 border border-emerald-600/30 dark:border-emerald-400/20 text-emerald-800 dark:text-emerald-400 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase font-inter">
                Goal 16: Peace & Justice
              </div>

              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-urdu text-3xl font-bold text-primary dark:text-[#E6DBC6] leading-none mb-1" dir="rtl">
                    امن، انصاف اور مضبوط ادارے
                  </h3>
                  <span className="font-garamond text-sm italic text-accent font-bold uppercase tracking-wider">
                    Peace, Justice & Strong Institutions
                  </span>
                </div>
              </div>

              {/* Parchment Sub-sheet for readable text */}
              <div className="parchment-sheet rounded-xl p-5 flex-grow flex flex-col gap-4">
                
                {/* Urdu */}
                <div>
                  <p className="font-urdu text-[15px] leading-[2.4] text-amber-950 dark:text-amber-100" dir="rtl">
                    حق دار کا بنیادی مقصد ہر شہری تک قانونی رہنمائی اور آسان انصاف کی رسائی کو ممکن بنانا ہے۔ آواز پر مبنی سمارٹ مائیکرو پٹیشن فارمیٹ کے ذریعے ہم پسماندہ طبقات کو اپنے حقوق کے تحفظ کا اختیار دیتے ہیں۔
                  </p>
                </div>

                <div className="w-full h-[1px] bg-accent/20 my-1" />

                {/* English */}
                <div>
                  <p className="font-inter text-xs leading-relaxed text-amber-900/70 dark:text-amber-100/60">
                    HaqDar AI promotes peaceful and inclusive societies by providing free, accessible, voice-driven legal tools that allow users to identify violations and immediately document formal petitions for justice.
                  </p>
                </div>
                
              </div>

            </div>
          </AnimatedContainer>

          {/* SDG 10 */}
          <AnimatedContainer variant="fadeUp" delay={0.25}>
            <div className="wood-console rounded-2xl p-6 md:p-8 flex flex-col h-full border border-accent/20 relative group hover:scale-[1.01] transition-transform duration-300">
              
              {/* Badge Anchor */}
              <div className="absolute top-4 right-4 bg-accent/10 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 text-[#8A6635] dark:text-[#DFBA73] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase font-inter">
                Goal 10: Reduced Inequalities
              </div>

              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  <Users2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-urdu text-3xl font-bold text-primary dark:text-[#E6DBC6] leading-none mb-1" dir="rtl">
                    نابرابری میں کمی
                  </h3>
                  <span className="font-garamond text-sm italic text-accent font-bold uppercase tracking-wider">
                    Reduced Inequalities
                  </span>
                </div>
              </div>

              {/* Parchment Sub-sheet */}
              <div className="parchment-sheet rounded-xl p-5 flex-grow flex flex-col gap-4">
                
                {/* Urdu */}
                <div>
                  <p className="font-urdu text-[15px] leading-[2.4] text-amber-950 dark:text-amber-100" dir="rtl">
                    اردو صوتی ان پٹ کی مدد سے ہم خواندگی اور زبان کی رکاوٹ کو دور کر رہے ہیں۔ اب کوئی بھی عام شہری جو لکھ پڑھ نہیں سکتا، صرف بول کر اپنی شکایت درج کروا سکتا ہے اور برابری کا حق حاصل کر سکتا ہے۔
                  </p>
                </div>

                <div className="w-full h-[1px] bg-accent/20 my-1" />

                {/* English */}
                <div>
                  <p className="font-inter text-xs leading-relaxed text-amber-900/70 dark:text-amber-100/60">
                    By removing literacy and language barriers with our dual-script Urdu speech engine, we bridge the gap in civic representation for populations traditionally excluded from legal literacy.
                  </p>
                </div>
                
              </div>

            </div>
          </AnimatedContainer>

        </div>

      </div>
    </section>
  );
}
