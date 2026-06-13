"use client";

import React, { useState } from 'react';
import { Copy, Check, Scale, Building2, FileText, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrustScore } from './TrustScore';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { SDGBadge } from '@/components/ui/SDGBadge';

export function ResultCard({ result, editedLetter, setEditedLetter }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatedContainer variant="fadeUp" className="w-full max-w-6xl mx-auto px-4 pb-16">
      <Card className="wood-console shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-2xl relative border-accent/20">
        
        {/* Header - Trust Score & Badges */}
        <div className="bg-[#3A231A]/30 px-6 py-5 border-b border-[#523225] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TrustScore score={result.confidence_score} reason={result.confidence_reason} />
          {result.sdg_alignment && <SDGBadge variant={result.sdg_alignment} />}
        </div>

        <CardContent className="p-0">
          
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-4 p-4 border-b border-[#523225]">
            
            {/* Violation & Law */}
            <div className="parchment-sheet rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-amber-950 dark:text-amber-100">
                <Scale className="w-5.5 h-5.5 text-accent" />
                <h3 className="font-urdu text-2xl font-bold m-0" dir="rtl">قانون کی خلاف ورزی</h3>
              </div>
              <p className="font-urdu text-xl leading-[2.4] font-medium pt-2" dir="rtl">
                {result.violation_summary}
              </p>
              
              <div className="mt-auto pt-6">
                <span className="text-[10px] uppercase tracking-widest text-amber-900/50 dark:text-amber-100/40 font-bold font-inter mb-1 block">
                  Relevant Legal Reference
                </span>
                <div className="inline-flex items-center px-3 py-1 rounded border border-accent/25 bg-[#3A231A]/10 text-accent font-semibold text-xs font-inter">
                  {result.law_reference}
                </div>
              </div>
            </div>

            {/* Authority & Action */}
            <div className="parchment-sheet rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-amber-950 dark:text-amber-100">
                <Building2 className="w-5.5 h-5.5 text-accent" />
                <h3 className="font-urdu text-2xl font-bold m-0" dir="rtl">متعلقہ ادارہ</h3>
              </div>
              <p className="font-urdu text-lg text-amber-900/60 dark:text-amber-100/50 pt-2" dir="rtl">
                شکایت جمع کروانے کے لیے نامزد کردہ ادارہ:
              </p>
              <div className="p-5 rounded-lg bg-card border border-[#C5B69C] dark:border-[#36221A] text-xl font-bold text-center mt-3 shadow-md font-urdu text-foreground relative overflow-hidden" dir="rtl">
                <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                {result.responsible_authority}
              </div>
            </div>
            
          </div>

          {/* Complaint Letter Accordion */}
          <div className="px-4 py-4 bg-[#23150F]/20">
            <Accordion type="single" collapsible="true" defaultValue="letter">
              <AccordionItem value="letter" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-[#3A231A]/30 hover:bg-[#3A231A]/50 transition-colors group flex items-center justify-between cursor-pointer border border-[#523225]">
                  <div className="flex items-center gap-3 text-accent transition-colors">
                    <FileText className="w-5 h-5 text-accent animate-pulse" />
                    <span className="font-urdu text-2xl font-bold m-0" dir="rtl">تیار کردہ شکایتی خط</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="parchment-sheet rounded-xl overflow-hidden relative shadow-inner">
                    
                    {/* Actions Row */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10 flex items-center gap-2 no-print">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-md font-urdu border border-[#C5B69C] dark:border-[#36221A] h-9 px-3.5 rounded-md cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/30 flex items-center gap-1.5"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <><Check className="w-4 h-4 text-emerald-600" /> نقل ہو گئی</>
                        ) : (
                          <><Copy className="w-4 h-4" /> کاپی کریں</>
                        )}
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-md font-urdu border border-[#C5B69C] dark:border-[#36221A] h-9 px-3.5 rounded-md cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/30 flex items-center gap-1.5"
                        onClick={() => window.print()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                        پرنٹ کریں
                      </Button>
                    </div>

                    <div className="p-6 pt-16 md:p-10 md:pt-12 overflow-x-auto print-container">
                      <div className="text-right text-xs text-muted-foreground/60 mb-3 font-inter no-print flex items-center gap-1 justify-end select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        بٹورِ تحریر ترمیم کر سکتے ہیں / Click directly on text to edit
                      </div>
                      <textarea
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:ring-0 font-urdu text-xl md:text-2xl leading-[2.6] whitespace-pre-wrap break-words max-w-full font-medium resize-none min-h-[500px] text-foreground text-right"
                        dir="rtl"
                        value={editedLetter}
                        onChange={(e) => setEditedLetter(e.target.value)}
                        placeholder="شکایتی خط لکھیں..."
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Step-by-Step Guide "What to do next" */}
          <div className="px-4 pb-6 pt-2 no-print">
            <div className="parchment-sheet rounded-xl p-5 md:p-6 border border-[#C5B69C] dark:border-[#36221A]">
              <h4 className="font-urdu text-2xl font-bold text-accent mb-3" dir="rtl">اگلا اقدام (What to do next)</h4>
              <ol className="font-urdu text-base md:text-lg leading-[2.2] space-y-3 list-decimal list-inside" dir="rtl">
                <li className="text-foreground">
                  <strong className="text-accent">خط نقل یا پرنٹ کریں:</strong> اوپر موجود بٹن کا استعمال کرتے ہوئے شکایتی خط کو کاپی کریں یا پی ڈی ایف کے طور پر محفوظ کر کے پرنٹ کریں۔
                </li>
                <li className="text-foreground">
                  <strong className="text-accent font-urdu">متعلقہ ادارے کو ارسال کریں:</strong> شکایتی خط پر دستخط کریں اور اسے اوپر بتائے گئے متعلقہ ادارے (<span className="text-accent">{result.responsible_authority}</span>) کے دفتر میں ڈاک/ای میل کے ذریعے جمع کروائیں۔
                </li>
                <li className="text-foreground">
                  <strong className="text-accent font-urdu">رسید اور پیروی:</strong> شکایت جمع کرواتے وقت رسید حاصل کریں اور پندرہ کام کے دنوں کے بعد ادارے سے پیش رفت دریافت کریں۔
                </li>
              </ol>
            </div>
          </div>


        </CardContent>
      </Card>
    </AnimatedContainer>
  );

}
