"use client";

import React from 'react';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { CheckCircle2, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quoteUrdu: "میرے زرعی ٹیوب ویل کے بل میں غلط چارجز لگائے گئے تھے۔ حق دار اے آئی کی مدد سے میں نے چند منٹوں میں متعلقہ محکمے کے لیے ایک رسمی درخواست تیار کر لی اور بالآخر مسئلہ حل ہو گیا۔",
    quoteEnglish: "My agricultural tubewell bill had incorrect charges. With HaqDar AI, I generated a formal petition for the department in minutes, and the issue was resolved.",
    authorUrdu: "محمد بشیر، کسان (سرگودھا، پنجاب)",
    authorEnglish: "Muhammad Bashir, Farmer (Sargodha, Punjab)",
    complaintUrdu: "شکایت: بجلی اوور بلنگ",
    complaintEnglish: "Category: Electricity Overbilling",
  },
  {
    quoteUrdu: "گیس کے بلوں میں اوور چارجنگ کا کوئی پرسانِ حال نہیں تھا۔ اس پلیٹ فارم نے مجھے اوگرا کے قوانین بتائے اور قانونی خط کا مسودہ بنا کر دیا جس پر عمل درآمد ممکن ہوا۔",
    quoteEnglish: "There was no recourse for gas overbilling. HaqDar AI explained OGRA rules and drafted a legal petition that got processed.",
    authorUrdu: "عائشہ خان، گھریلو خاتون (گلشن اقبال، کراچی)",
    authorEnglish: "Ayesha Khan, Homemaker (Gulshan-e-Iqbal, Karachi)",
    complaintUrdu: "شکایت: گیس نرخ اوور بلنگ",
    complaintEnglish: "Category: Gas Overbilling",
  },
  {
    quoteUrdu: "سرکاری سکول کی مرمت کے فنڈز التوا کا شکار تھے۔ میں نے یہاں سے پٹیشن تیار کی جس کے بعد ضلعی انتظامیہ نے فنڈز جاری کیے۔ یہ ایک بہترین سول ڈیجیٹل سروس ہے۔",
    quoteEnglish: "Public school repair funds were delayed. I drafted a petition here, after which the district administration released the funds. Excellent civic tool.",
    authorUrdu: "احمد جان، سکول استاد (پشاور، خیبر پختونخوا)",
    authorEnglish: "Ahmad Jan, School Teacher (Peshawar, KPK)",
    complaintUrdu: "شکایت: فنڈز التوا",
    complaintEnglish: "Category: Delay in Public Funds",
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] pointer-events-none bg-[linear-gradient(to_right,rgba(197,160,89,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <AnimatedContainer variant="fadeUp">
            <h2 className="font-urdu text-4xl md:text-5xl font-bold text-foreground mb-4">
              شہریوں کی آوازیں
            </h2>
            <p className="font-garamond italic text-lg md:text-xl font-bold tracking-widest text-accent uppercase mb-2">
              Community Voices & Impact
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-inter max-w-md mx-auto">
              Real-world scenarios demonstrating how HaqDar AI empowers everyday citizens to demand accountability and access legal remedies.
            </p>
          </AnimatedContainer>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <AnimatedContainer key={idx} variant="fadeUp" delay={0.1 * (idx + 1)}>
              <div className="parchment-sheet rounded-2xl p-6 md:p-8 flex flex-col h-full border border-[#C5B69C] dark:border-[#36221A] shadow-lg relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />

                {/* Complaint Type and Emerald Check Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold tracking-wider font-inter text-accent uppercase bg-[#C5A059]/10 px-2.5 py-1 rounded">
                    {t.complaintEnglish}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    پٹیشن تیار ✓
                  </span>
                </div>

                {/* Urdu Quote */}
                <p className="font-urdu text-lg md:text-xl leading-[2.2] text-foreground font-medium mb-4" dir="rtl">
                  "{t.quoteUrdu}"
                </p>

                {/* English Quote (Small & Muted) */}
                <p className="text-xs text-muted-foreground leading-relaxed font-inter italic mb-6">
                  "{t.quoteEnglish}"
                </p>

                {/* Author Details */}
                <div className="mt-auto pt-6 border-t border-accent/10 flex flex-col">
                  <span className="font-urdu text-base font-bold text-foreground" dir="rtl">
                    {t.authorUrdu}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground font-inter tracking-wide mt-0.5">
                    {t.authorEnglish}
                  </span>
                </div>

              </div>
            </AnimatedContainer>
          ))}
        </div>

      </div>
    </section>
  );
}
