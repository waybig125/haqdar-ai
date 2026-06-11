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
      <Card className="border-4 border-double border-accent/30 dark:border-accent/15 shadow-[0_20px_50px_-10px_rgba(27,56,42,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden bg-card rounded-2xl relative">
        
        {/* Header - Trust Score & Badges */}
        <div className="bg-muted/40 px-6 py-5 border-b border-accent/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TrustScore score={result.confidence_score} reason={result.confidence_reason} />
          {result.sdg_alignment && <SDGBadge variant={result.sdg_alignment} />}
        </div>

        <CardContent className="p-0">
          
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-0 border-b border-accent/10">
            
            {/* Violation & Law */}
            <div className="p-6 md:p-8 md:border-e border-b md:border-b-0 border-accent/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-accent">
                <Scale className="w-5.5 h-5.5" />
                <h3 className="font-urdu text-2xl font-bold m-0 text-foreground">قانون کی خلاف ورزی</h3>
              </div>
              <p className="font-urdu text-xl leading-[1.8] text-foreground font-medium pt-2">
                {result.violation_summary}
              </p>
              
              <div className="mt-auto pt-6">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-inter mb-1 block">
                  Relevant Legal Reference
                </span>
                <div className="inline-flex items-center px-3 py-1 rounded border border-accent/25 bg-accent/5 text-accent font-semibold text-xs font-inter">
                  {result.law_reference}
                </div>
              </div>
            </div>

            {/* Authority & Action */}
            <div className="p-6 md:p-8 flex flex-col gap-4 bg-muted/20">
              <div className="flex items-center gap-3 text-accent">
                <Building2 className="w-5.5 h-5.5" />
                <h3 className="font-urdu text-2xl font-bold m-0 text-foreground">متعلقہ ادارہ</h3>
              </div>
              <p className="font-urdu text-lg text-muted-foreground pt-2">
                شکایت جمع کروانے کے لیے نامزد کردہ ادارہ:
              </p>
              <div className="p-5 rounded-lg bg-card border border-accent/20 dark:border-accent/10 text-xl font-bold text-center mt-3 shadow-md font-urdu text-foreground relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                {result.responsible_authority}
              </div>
            </div>
            
          </div>

          {/* Complaint Letter Accordion */}
          <div className="px-3 sm:px-8 py-4 bg-card">
            <Accordion type="single" collapsible defaultValue="letter">
              <AccordionItem value="letter" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-muted/40 transition-colors group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                    <FileText className="w-5 h-5 text-accent" />
                    <span className="font-urdu text-2xl font-bold m-0">تیار کردہ شکایتی خط</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="bg-muted/10 border border-accent/20 dark:border-accent/10 rounded-xl overflow-hidden relative shadow-inner">
                    
                    {/* Copy Button */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-md font-urdu border border-border/80 h-9 px-4 rounded-md cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/30"
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
                      <pre className="font-urdu text-xl md:text-2xl leading-[2.1] text-foreground whitespace-pre-wrap break-words max-w-full font-medium" dir="rtl">
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
