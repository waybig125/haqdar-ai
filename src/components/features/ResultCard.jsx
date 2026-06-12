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

export function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.complaint_letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatedContainer variant="fadeUp" className="w-full max-w-4xl mx-auto px-4 pb-16">
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
                <h3 className="font-urdu text-2xl font-bold m-0">قانون کی خلاف ورزی</h3>
              </div>
              <p className="font-urdu text-xl leading-[2.4] font-medium pt-2">
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
                <h3 className="font-urdu text-2xl font-bold m-0">متعلقہ ادارہ</h3>
              </div>
              <p className="font-urdu text-lg text-amber-900/60 dark:text-amber-100/50 pt-2">
                شکایت جمع کروانے کے لیے نامزد کردہ ادارہ:
              </p>
              <div className="p-5 rounded-lg bg-card border border-[#C5B69C] dark:border-[#36221A] text-xl font-bold text-center mt-3 shadow-md font-urdu text-foreground relative overflow-hidden">
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
                    <span className="font-urdu text-2xl font-bold m-0">تیار کردہ شکایتی خط</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="parchment-sheet rounded-xl overflow-hidden relative shadow-inner">
                    
                    {/* Copy Button */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-md font-urdu border border-[#C5B69C] dark:border-[#36221A] h-9 px-4 rounded-md cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/30"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <><Check className="w-4 h-4 mr-2 text-emerald-600" /> نقل ہو گئی</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-2" /> کاپی کریں</>
                        )}
                      </Button>
                    </div>

                    <div className="p-6 pt-16 md:p-10 md:pt-12 overflow-x-auto">
                      <pre className="font-urdu text-xl md:text-2xl leading-[2.6] whitespace-pre-wrap break-words max-w-full font-medium" dir="rtl">
                        {result.complaint_letter}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>


        </CardContent>
      </Card>
    </AnimatedContainer>
  );

}
