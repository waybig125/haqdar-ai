"use client";

import React, { useState } from 'react';
import { Copy, Check, Scale, Building2, FileText, ChevronDown, Download } from 'lucide-react';
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
import { downloadLetterPdf } from '@/lib/api';
import { toast } from 'sonner';

export function ResultCard({ result, editedLetter, setEditedLetter }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openItems, setOpenItems] = useState(["letter"]);

  // Open the petition letter accordion by default when a new result loads
  React.useEffect(() => {
    setOpenItems(["letter"]);
  }, [result]);

  if (!result) return null;

  if (result.status === "needs_more_info") {
    return (
      <AnimatedContainer variant="fadeUp" className="w-full max-w-6xl mx-auto px-4 pb-16">
        <Card className="wood-console shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-2xl border border-accent/20">
          <CardHeader className="bg-[#3A231A]/30 border-b border-[#523225] py-5">
            <CardTitle className="font-urdu text-3xl font-bold text-foreground text-right flex items-center justify-end gap-2" dir="rtl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              مزید تفصیلات درکار ہیں / More Information Needed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 flex flex-col gap-6">
            <div className="parchment-sheet rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-urdu text-2xl font-bold text-amber-950 dark:text-[#E6DBC6]" dir="rtl">
                قانونی تجزیہ کے لیے درج ذیل معلومات کی ضرورت ہے:
              </h3>
              <p className="text-sm text-amber-900/60 dark:text-amber-100/50 font-inter">
                Your complaint is too brief or missing essential context. Please check the suggestions below and submit a revised version.
              </p>
              
              <ul className="space-y-4 font-urdu text-xl text-amber-950 dark:text-[#E6DBC6] list-none pr-0 mt-2" dir="rtl">
                {result.questions?.map((q, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm mt-1.5 font-inter">
                      {index + 1}
                    </span>
                    <span className="leading-[2.4] pt-1">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-right text-xs text-amber-900/40 dark:text-[#E6DBC6]/30 font-inter" dir="rtl">
              Reference ID: {result.meta?.request_id ? `HQD-REF-${result.meta.request_id.toUpperCase()}` : "Pending"} | Checked against Law DB {result.meta?.db_version || "June 2026"}
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPdf = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const { blob, isFallback } = await downloadLetterPdf({
        reference_id: result.reference_id || "HQD-2026-0001",
        complaint_letter: editedLetter,
        law_reference: result.law_reference || "",
        responsible_authority: result.responsible_authority || "",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isFallback
        ? `${result.reference_id || 'HQD-2026-0001'}.txt`
        : `${result.reference_id || 'HQD-2026-0001'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      if (isFallback) {
        toast.warning('شکایتی خط ڈاؤنلوڈ کر لیا گیا (بغیر فارمیٹ / ٹیکسٹ فارمیٹ میں)', {
          description: 'پی ڈی ایف سروس دستیاب نہیں تھی، اس لیے خط ٹیکسٹ فائل کے طور پر ڈاؤنلوڈ کیا گیا ہے۔',
        });
      } else {
        toast.success('پی ڈی ایف ڈاؤن لوڈ کر لی گئی ہے / PDF Downloaded', {
          description: 'سرکاری شکایتی خط کامیابی کے ساتھ ڈاؤن لوڈ ہو گیا ہے۔',
        });
      }
    } catch (err) {
      console.error('Failed to download PDF', err);
      toast.error('ڈاؤن لوڈ ناکام / Download Failed', {
        description: 'فائل ڈاؤن لوڈ کرنے میں کوئی مسئلہ پیش آیا ہے۔',
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatedContainer variant="fadeUp" className="w-full max-w-6xl mx-auto px-4 pb-16">
      <Card className="wood-console shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-2xl relative border-accent/20">
        
        {/* Header - Trust Score & Badges */}
        <div className="bg-[#3A231A]/30 px-6 py-5 border-b border-[#523225] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest text-accent font-bold font-inter leading-none">
              Official Reference Number
            </span>
            <span className="text-sm font-bold font-inter text-amber-950 dark:text-accent">
              {result.reference_id || (result.meta?.request_id ? `HQD-REF-${result.meta.request_id.toUpperCase()}` : "HQD-2026-0001")}
            </span>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <TrustScore score={result.confidence_score} reason={result.confidence_reason} />
            {result.sdg_alignment && <SDGBadge variant={result.sdg_alignment} />}
          </div>
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
              <div className="p-5 rounded-lg bg-card border border-[#C5B69C] dark:border-[#36221A] text-xl font-bold text-center mt-3 shadow-md font-urdu text-foreground relative overflow-hidden leading-[2.4]" dir="rtl">
                <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                {result.responsible_authority}
              </div>
            </div>
            
          </div>

          {/* Accordions Container */}
          <div className="px-4 py-4 bg-[#23150F]/20">
            <Accordion 
              type="multiple" 
              value={openItems}
              onValueChange={setOpenItems}
            >
              <AccordionItem value="letter" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-[#3A231A]/30 hover:bg-[#3A231A]/50 transition-colors group flex items-center justify-between cursor-pointer border border-[#523225]">
                  <div className="flex items-center gap-3 text-accent transition-colors">
                    <FileText className="w-5 h-5 text-accent animate-pulse" />
                    <span className="font-urdu text-2xl font-bold m-0" dir="rtl">تیار کردہ شکایتی خط (Official Petition)</span>
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
                        onClick={handleDownloadPdf}
                        disabled={downloading}
                      >
                        {downloading ? (
                          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 text-accent" />
                        )}
                        پی ڈی ایف ڈاؤن لوڈ
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

              {result.relevant_laws && result.relevant_laws.length > 0 && (
                <AccordionItem value="laws" className="border-none mt-3">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-[#3A231A]/30 hover:bg-[#3A231A]/50 transition-colors group flex items-center justify-between cursor-pointer border border-[#523225]">
                    <div className="flex items-center gap-3 text-accent transition-colors">
                      <Scale className="w-5 h-5 text-accent" />
                      <span className="font-urdu text-2xl font-bold m-0" dir="rtl">حکومتی قوانین کا ریکارڈ (Verified Laws)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3">
                    <div className="grid gap-4 mt-2">
                      {result.relevant_laws.map((lawObj, idx) => (
                        <div key={idx} className="parchment-sheet rounded-xl p-5 border border-accent/20 flex flex-col gap-2 shadow-sm">
                          <div className="flex items-center justify-between gap-4 border-b border-[#C5B69C]/40 dark:border-accent/10 pb-2">
                            <span className="font-bold text-amber-950 dark:text-[#E6DBC6] text-lg font-inter">
                              ⚖️ {lawObj.law}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent font-inter">
                              Registry Entry #{idx + 1}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1 pt-1">
                            <span className="text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter">
                              Law Provision (قانون کی دفعہ)
                            </span>
                            <p className="font-urdu text-lg leading-relaxed text-amber-950 dark:text-[#E6DBC6]" dir="rtl">
                              {lawObj.provision}
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-[#C5B69C]/40 dark:border-accent/10">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter">
                                Enforcement Authority (مجاز ادارہ)
                              </span>
                              <p className="font-urdu text-base font-semibold text-amber-950 dark:text-[#E6DBC6]" dir="rtl">
                                {lawObj.authority}
                              </p>
                            </div>
                            {lawObj.contact && (
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter">
                                  Official Contact (رابطہ نمبر / ہیلپ لائن)
                                </span>
                                <p className="font-inter text-xs font-semibold text-accent leading-normal mt-0.5">
                                  {lawObj.contact}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
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

        {/* Metadata verification block */}
        {result.meta && (
          <div className="px-6 py-4 bg-[#3A231A]/20 border-t border-[#523225] flex flex-wrap items-center justify-between gap-4 text-[10px] text-amber-900/50 dark:text-amber-100/30 font-inter no-print">
            <div>
              <span>Database: </span>
              <strong className="text-accent">{result.meta.db_version}</strong>
              <span> | Last legal review: </span>
              <strong className="text-accent">{result.meta.last_legal_review}</strong>
            </div>
            <div className="flex gap-3">
              <span>Model: <strong>{result.meta.model_used}</strong></span>
              <span>Speed: <strong>{result.meta.processing_ms}ms</strong></span>
              <span>Cache: <strong>{result.meta.cached ? "HIT" : "MISS"}</strong></span>
            </div>
          </div>
        )}

      </Card>
    </AnimatedContainer>
  );

}
