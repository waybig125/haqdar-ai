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
    <AnimatedContainer variant="fadeUp" className="w-full max-w-4xl mx-auto px-4 pb-12">
      <Card className="border-border/50 shadow-lg shadow-black/5 overflow-hidden">
        
        {/* Header - Trust Score & Badges */}
        <div className="bg-muted/30 px-6 py-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TrustScore score={result.confidence_score} reason={result.confidence_reason} />
          {result.sdg_alignment && <SDGBadge variant={result.sdg_alignment} />}
        </div>

        <CardContent className="p-0">
          
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-0 border-b">
            
            {/* Violation & Law */}
            <div className="p-6 md:p-8 md:border-e border-b md:border-b-0 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <Scale className="w-6 h-6" />
                <h3 className="font-urdu text-xl font-bold m-0">قانون کی خلاف ورزی</h3>
              </div>
              <p className="font-urdu text-lg leading-relaxed text-foreground">
                {result.violation_summary}
              </p>
              
              <div className="mt-auto pt-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1 block">
                  Relevant Law
                </span>
                <div className="inline-flex items-center px-3 py-1 rounded-md bg-accent/10 text-accent-foreground border border-accent/20 font-medium text-sm">
                  {result.law_reference}
                </div>
              </div>
            </div>

            {/* Authority & Action */}
            <div className="p-6 md:p-8 flex flex-col gap-4 bg-muted/10">
              <div className="flex items-center gap-3 text-primary">
                <Building2 className="w-6 h-6" />
                <h3 className="font-urdu text-xl font-bold m-0">متعلقہ ادارہ</h3>
              </div>
              <p className="font-urdu text-lg text-foreground">
                شکایت اس ادارے کو جمع کروانی چاہیے:
              </p>
              <div className="p-4 rounded-lg bg-background border text-lg font-semibold text-center mt-2 shadow-sm">
                {result.responsible_authority}
              </div>
            </div>
            
          </div>

          {/* Complaint Letter Accordion */}
          <div className="px-2 sm:px-6 py-2">
            <Accordion type="single" collapsible defaultValue="letter">
              <AccordionItem value="letter" className="border-none">
                <AccordionTrigger className="hover:no-underline py-4 px-4 rounded-lg hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-3 text-foreground group-hover:text-primary transition-colors">
                    <FileText className="w-5 h-5" />
                    <span className="font-urdu text-xl font-bold m-0">رسمی شکایتی خط</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 bg-muted/20 border rounded-xl overflow-hidden relative">
                    
                    {/* Copy Button */}
                    <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 z-10">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-sm font-urdu"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <><Check className="w-4 h-4 mr-2" /> نقل ہو گئی</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-2" /> کاپی کریں</>
                        )}
                      </Button>
                    </div>

                    <div className="p-6 pt-14 md:p-8 md:pt-8 overflow-x-auto">
                      <pre className="font-urdu text-lg leading-[2.2] text-foreground whitespace-pre-wrap break-words max-w-full font-medium" dir="rtl">
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
