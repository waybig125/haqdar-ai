"use client";

import React, { useState } from 'react';
import { Copy, Check, Scale, Building2, FileText, Download } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const TRANSLATIONS = {
  Urdu: {
    officialReferenceNumber: "سرکاری حوالہ نمبر",
    violationSummaryHeader: "قانون کی خلاف ورزی",
    relevantLegalReference: "متعلقہ قانونی حوالہ",
    responsibleAuthorityHeader: "متعلقہ ادارہ",
    responsibleAuthoritySubtext: "شکایت جمع کروانے کے لیے نامزد کردہ ادارہ:",
    petitionAccordionTitle: "تیار کردہ شکایتی خط (Official Petition)",
    editInstructions: "بٹورِ تحریر ترمیم کر سکتے ہیں / Click directly on text to edit",
    copyButton: "کاپی کریں",
    copiedButton: "نقل ہو گئی",
    downloadPdfButton: "پی ڈی ایف ڈاؤن لوڈ",
    verifiedLawsTitle: "حکومتی قوانین کا ریکارڈ (Verified Laws)",
    registryEntry: "رجسٹری اندراج نمبر #",
    lawProvision: "قانون کی دفعہ",
    enforcementAuthority: "مجاز ادارہ",
    officialContact: "رابطہ نمبر / ہیلپ لائن",
    nextStepsTitle: "اگلا اقدام (What to do next)",
    step1: "خط نقل یا پرنٹ کریں: اوپر موجود بٹن کا استعمال کرتے ہوئے شکایتی خط کو کاپی کریں یا پی ڈی ایف کے طور پر محفوظ کر کے پرنٹ کریں۔",
    step2: "متعلقہ ادارے کو ارسال کریں: شکایتی خط پر دستخط کریں اور اسے اوپر بتائے گئے متعلقہ ادارے ([authority]) کے دفتر میں ڈاک یا ای میل کے ذریعے جمع کروائیں۔",
    step3: "رسید اور پیروی: شکایت جمع کرواتے وقت رسید حاصل کریں اور پندرہ کام کے دنوں کے بعد ادارے سے پیش رفت دریافت کریں۔",
    moreInfoTitle: "مزید تفصیلات درکار ہیں / More Information Needed",
    moreInfoSubtext: "قانونی تجزیہ کے لیے درج ذیل معلومات کی ضرورت ہے:"
  },
  English: {
    officialReferenceNumber: "Official Reference Number",
    violationSummaryHeader: "Violation of Law",
    relevantLegalReference: "Relevant Legal Reference",
    responsibleAuthorityHeader: "Responsible Authority",
    responsibleAuthoritySubtext: "Designated authority to submit the complaint:",
    petitionAccordionTitle: "Generated Complaint Letter (Official Petition)",
    editInstructions: "Click directly on text to edit the letter",
    copyButton: "Copy",
    copiedButton: "Copied",
    downloadPdfButton: "Download PDF",
    verifiedLawsTitle: "Record of Government Laws (Verified Laws)",
    registryEntry: "Registry Entry #",
    lawProvision: "Law Provision",
    enforcementAuthority: "Enforcement Authority",
    officialContact: "Official Contact / Helpline",
    nextStepsTitle: "Next Steps",
    step1: "Copy or Print the Letter: Use the button above to copy the complaint letter or download it as a PDF and print it.",
    step2: "Send to the Concerned Authority: Sign the complaint letter and send it to the office of the designated authority ([authority]) listed above via post or email.",
    step3: "Receipt and Follow-up: Obtain a receipt when submitting the complaint and follow up on progress with the authority after 15 working days.",
    moreInfoTitle: "More Information Needed",
    moreInfoSubtext: "The following information is required for legal analysis:"
  },
  "Roman (Urdu/Regional)": {
    officialReferenceNumber: "Sarkari Hawala Number",
    violationSummaryHeader: "Qanoon Ki Khilaf Warzi",
    relevantLegalReference: "Mutaliqa Qanooni Hawala",
    responsibleAuthorityHeader: "Mutaliqa Idara",
    responsibleAuthoritySubtext: "Shikayat jama karwane ke liye muntakhib idara:",
    petitionAccordionTitle: "Tiyar Karda Shikayati Khat (Official Petition)",
    editInstructions: "Edit karne ke liye seedha text par click karen",
    copyButton: "Copy Karen",
    copiedButton: "Copy Ho Gaya",
    downloadPdfButton: "PDF Download",
    verifiedLawsTitle: "Hukumati Qawaneen Ka Record (Verified Laws)",
    registryEntry: "Registry Entry #",
    lawProvision: "Qanoon ki Daf'a",
    enforcementAuthority: "Majaz Idara",
    officialContact: "Rabta Number / Helpline",
    nextStepsTitle: "Agla Iqdam",
    step1: "Khat copy ya print karen: Upar diye gaye button se shikayati khat copy karen ya PDF download kar ke print nikalen.",
    step2: "Mutaliqa idaray ko bhejen: Shikayati khat par sign karen aur isay upar bataye gaye idaray ([authority]) ke office mein post ya email ke zariye jama karwayen.",
    step3: "Raseed aur follow-up: Shikayat jama karwatay waqt raseed len aur 15 dino ke baad idaray se shikayat par progress maloom karen.",
    moreInfoTitle: "Mazeed Tafseelat Darkar Hain",
    moreInfoSubtext: "Qanooni tajziya ke liye darj zail maloomat ki zaroorat hai:"
  },
  Sindhi: {
    officialReferenceNumber: "سرڪاري حوالو نمبر",
    violationSummaryHeader: "قانون جي خلاف ورزي",
    relevantLegalReference: "لاڳاپيل قانوني حوالو",
    responsibleAuthorityHeader: "لاڳاپيل ادارو",
    responsibleAuthoritySubtext: "شڪايت داخل ڪرڻ لاءِ نامزد ڪيل ادارو:",
    petitionAccordionTitle: "تيار ڪيل شڪايتي خط (سرڪاري درخواست)",
    editInstructions: "تبديلي ڪرڻ لاءِ سڌو سنئون متن تي ڪلڪ ڪريو",
    copyButton: "ڪاپي ڪريو",
    copiedButton: "ڪاپي ٿي ويو",
    downloadPdfButton: "پي ڊي ايف ڊائون لوڊ",
    verifiedLawsTitle: "حڪومتي قانونن جو رڪارڊ (تصديق ٿيل قانون)",
    registryEntry: "رجسٽري داخلائن نمبر #",
    lawProvision: "قانون جو دفعو",
    enforcementAuthority: "مجاز ادارو",
    officialContact: "رابطي نمبر / هيلپ لائين",
    nextStepsTitle: "اڳيون قدم",
    step1: "خط ڪاپي يا پرنٽ ڪريو: مٿي ڏنل بٽڻ کي استعمال ڪندي شڪايتي خط کي ڪاپي ڪريو يا پي ڊي ايف ڊائون لوڊ ڪري پرنٽ ڪڍو.",
    step2: "لاڳاپيل اداري ڏانهن موڪليو: شڪايتي خط تي دستخط ڪريو ۽ ان کي لاڳاپيل اداري ([authority]) جي آفيس ۾ ٽپال يا اي ميل ذريعي جمع ڪرايو.",
    step3: "رسيد ۽ پيروي: شڪايت جمع ڪرائڻ وقت رسيد وٺو ۽ 15 ڪم جي ڏينهن کانپوءِ اداري مان اڳڀرائي معلوم ڪريو.",
    moreInfoTitle: "وڌيڪ معلومات گهربل آهي",
    moreInfoSubtext: "قانوني تجزيي لاءِ هيٺين معلومات جي ضرورت آهي:"
  },
  Pashto: {
    officialReferenceNumber: "سرکاري حواله نمبر",
    violationSummaryHeader: "د قانون سرغړونه",
    relevantLegalReference: "اړونده قانوني حواله",
    responsibleAuthorityHeader: "اړونده اداره",
    responsibleAuthoritySubtext: "د شکايت ثبتولو لپاره ټاکل شوې اداره:",
    petitionAccordionTitle: "چمتو شوی د شکایت لیک (رسمي غوښتنلیک)",
    editInstructions: "د ایډیټ لپاره مستقیم په متن باندې کلیک وکړئ",
    copyButton: "کاپی کړئ",
    copiedButton: "کاپی شو",
    downloadPdfButton: "پي ډي ایف ډاونلوډ",
    verifiedLawsTitle: "د دولتي قوانینو ریکارډ (تصدیق شوي قوانین)",
    registryEntry: "د راجستر نمبر #",
    lawProvision: "د قانون ماده",
    enforcementAuthority: "مجاز واک لرونکې اداره",
    officialContact: "اړیکې شمیره / هیلپ لاین",
    nextStepsTitle: "بل ګام",
    step1: "لیک کاپي یا پرنټ کړئ: د پورته تڼۍ څخه په استفادې د شکایت لیک کاپي کړئ یا یې په پی ډی ایف کې ډاونلوډ او پرنټ کړئ.",
    step2: "اړونده ادارې ته یې واستوئ: په شکایت لیک لاسلیک وکړئ او پورته ذکر شوې ادارې ([authority]) دفتر ته یې د پوست یا بریښنالیک له لارې وسپارئ.",
    step3: "رسید او تعقیب: د شکایت سپارلو پرمهال رسید ترلاسه کړئ او له ۱۵ کاري ورځو وروسته د پرمختګ پوښتنه وکړئ.",
    moreInfoTitle: "نورو معلوماتو ته اړتیا ده",
    moreInfoSubtext: "د قانوني تحلیل لپاره لاندې معلوماتو ته اړتیا ده:"
  },
  Punjabi: {
    officialReferenceNumber: "سرکاری حوالہ نمبر",
    violationSummaryHeader: "قانون دی خلاف ورزی",
    relevantLegalReference: "متعلقہ قانونی حوالہ",
    responsibleAuthorityHeader: "متعلقہ ادارہ",
    responsibleAuthoritySubtext: "شکایت جمع کروان لئی نامزد کیتا گیا ادارہ:",
    petitionAccordionTitle: "تیار کیتا گیا شکایتی خط (سرکاری درخواست)",
    editInstructions: "تبدیلی کرن لئی سدھا لکھت تے کلک کرو",
    copyButton: "کاپی کرو",
    copiedButton: "کاپی ہو گیا",
    downloadPdfButton: "پی ڈی ایف ڈاؤن لوڈ",
    verifiedLawsTitle: "حکومتی قانوناں دا ریکارڈ (تصدیق شدہ قانون)",
    registryEntry: "رجسٹری اندراج نمبر #",
    lawProvision: "قانون دی دفعہ",
    enforcementAuthority: "مجاز ادارہ",
    officialContact: "رابطہ نمبر / ہیلپ لائن",
    nextStepsTitle: "اگلا قدم",
    step1: "خط کاپی یا پرنٹ کرو: اوپر دتے گئے بٹن نوں ورتدے ہوئے شکایتی خط نوں کاپی کرو یا پی ڈی ایف ڈاؤن لوڈ کر کے پرنٹ کڈو.",
    step2: "متعلقہ ادارے نوں بھیجو: شکایتی خط تے دستخط کرو تے اوپر دسے گئے متعلقہ ادارے ([authority]) دے دفتر وچ ڈاک یا ای میل راہیں جمع کرواؤ.",
    step3: "رسید تے پیروی: شکایت جمع کرواندے ویلے رسید لوو تے 15 دناں بعد ادارے توں کم دی پیش رفت پچھو.",
    moreInfoTitle: "ہور تفصیلات چاہیدیاں نیں",
    moreInfoSubtext: "قانونی تجزیے لئی ایہناں معلومات دی لوڑ اے:"
  }
};

function isMostlyEnglish(text) {
  if (!text) return false;
  const cleanText = text.replace(/\s+/g, '');
  if (!cleanText) return false;
  const latinCount = (cleanText.match(/[a-zA-Z]/g) || []).length;
  return (latinCount / cleanText.length) > 0.5;
}

export function ResultCard({ result, editedLetter, setEditedLetter, language = 'Urdu', letterLanguage = 'Urdu' }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openItems, setOpenItems] = useState(["letter"]);

  // Open the petition letter accordion by default when a new result loads
  React.useEffect(() => {
    setOpenItems(["letter"]);
  }, [result]);

  if (!result) return null;

  const lang = TRANSLATIONS[language] || TRANSLATIONS.Urdu;

  const textToTest = result.status === "needs_more_info" 
    ? (result.questions || []).join(" ") 
    : (result.complaint_letter || result.violation_summary || "");
  
  const isResponseEnglish = language === 'English' || language === 'Roman (Urdu/Regional)' || isMostlyEnglish(textToTest);
  
  // Use English/Latin font classes for English and Roman Urdu, Urdu font for others
  const textFontClass = isResponseEnglish ? "font-inter" : "font-urdu";

  if (result.status === "needs_more_info") {
    return (
      <AnimatedContainer variant="fadeUp" className="w-full max-w-6xl mx-auto px-4 pb-16">
        <Card className="wood-console shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-2xl border border-accent/20">
          <CardHeader className="bg-[#3A231A]/30 border-b border-[#523225] py-5">
            <CardTitle className={cn(
              "text-3xl font-bold text-foreground flex items-center gap-2",
              textFontClass,
              isResponseEnglish ? "text-left justify-start" : "text-right justify-end flex-row-reverse"
            )} dir={isResponseEnglish ? "ltr" : "rtl"}>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              {lang.moreInfoTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 flex flex-col gap-6">
            <div className="parchment-sheet rounded-xl p-6 md:p-8 flex flex-col gap-4">
              <h3 className={cn("text-2xl font-bold text-amber-950 dark:text-[#E6DBC6]", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>
                {lang.moreInfoSubtext}
              </h3>
              
              <ul className={cn(
                "space-y-4 text-xl text-amber-950 dark:text-[#E6DBC6] list-none mt-2",
                textFontClass,
                isResponseEnglish ? "pl-0" : "pr-0"
              )} dir={isResponseEnglish ? "ltr" : "rtl"}>
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
            
            <div className={cn(
              "text-xs text-amber-900/40 dark:text-[#E6DBC6]/30 font-inter",
              isResponseEnglish ? "text-left" : "text-right"
            )} dir={isResponseEnglish ? "ltr" : "rtl"}>
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
              {lang.officialReferenceNumber}
            </span>
            <span className="text-sm font-bold font-inter text-amber-950 dark:text-accent">
              {result.reference_id || (result.meta?.request_id ? `HQD-REF-${result.meta.request_id.toUpperCase()}` : "HQD-2026-0001")}
            </span>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <TrustScore score={result.confidence_score} reason={result.confidence_reason} language={language} />
            {result.sdg_alignment && <SDGBadge variant={result.sdg_alignment} />}
          </div>
        </div>

        <CardContent className="p-0">
          
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-4 p-4 border-b border-[#523225]">
            
            {/* Violation & Law */}
            <div className="parchment-sheet rounded-xl p-6 flex flex-col gap-4">
              <div className={cn("flex items-center gap-3 text-amber-950 dark:text-amber-100", isResponseEnglish ? "justify-start" : "justify-end flex-row-reverse")}>
                <Scale className="w-5.5 h-5.5 text-accent" />
                <h3 className={cn("text-2xl font-bold m-0", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>{lang.violationSummaryHeader}</h3>
              </div>
              <p className={cn("text-xl leading-[2.4] font-medium pt-2", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>
                {result.violation_summary}
              </p>
              
              <div className={cn("mt-auto pt-6", isResponseEnglish ? "text-left" : "text-right")}>
                <span className="text-[10px] uppercase tracking-widest text-amber-900/50 dark:text-amber-100/40 font-bold font-inter mb-1 block">
                  {lang.relevantLegalReference}
                </span>
                <div className="inline-flex items-center px-3 py-1 rounded border border-accent/25 bg-[#3A231A]/10 text-accent font-semibold text-xs font-inter">
                  {result.law_reference}
                </div>
              </div>
            </div>

            {/* Authority & Action */}
            <div className="parchment-sheet rounded-xl p-6 flex flex-col gap-4">
              <div className={cn("flex items-center gap-3 text-amber-950 dark:text-amber-100", isResponseEnglish ? "justify-start" : "justify-end flex-row-reverse")}>
                <Building2 className="w-5.5 h-5.5 text-accent" />
                <h3 className={cn("text-2xl font-bold m-0", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>{lang.responsibleAuthorityHeader}</h3>
              </div>
              <p className={cn("text-lg text-amber-900/60 dark:text-amber-100/50 pt-2", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>
                {lang.responsibleAuthoritySubtext}
              </p>
              <div className={cn("p-5 rounded-lg bg-card border border-[#C5B69C] dark:border-[#36221A] text-xl font-bold text-center mt-3 shadow-md text-foreground relative overflow-hidden leading-[2.4]", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>
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
                  <div className={cn("flex items-center gap-3 text-accent transition-colors", isResponseEnglish ? "justify-start" : "justify-end flex-row-reverse")}>
                    <FileText className="w-5 h-5 text-accent animate-pulse" />
                    <span className={cn("text-2xl font-bold m-0", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>{lang.petitionAccordionTitle}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="parchment-sheet rounded-xl overflow-hidden relative shadow-inner">
                    
                    {/* Actions Row */}
                    <div className={cn("absolute top-3 z-10 flex items-center gap-2 no-print", isResponseEnglish ? "right-3" : "left-3")}>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="shadow-md font-urdu border border-[#C5B69C] dark:border-[#36221A] h-9 px-3.5 rounded-md cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/30 flex items-center gap-1.5"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <><Check className="w-4 h-4 text-emerald-600" /> {lang.copiedButton}</>
                        ) : (
                          <><Copy className="w-4 h-4" /> {lang.copyButton}</>
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
                        {lang.downloadPdfButton}
                      </Button>
                    </div>

                    <div className="p-6 pt-16 md:p-10 md:pt-12 overflow-x-auto print-container">
                      <div className={cn(
                        "text-xs text-muted-foreground/60 mb-3 font-inter no-print flex items-center gap-1 select-none",
                        isResponseEnglish ? "justify-start" : "justify-end"
                      )}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {lang.editInstructions}
                      </div>
                      <textarea
                        className={cn(
                          "w-full bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-xl md:text-2xl leading-[2.6] whitespace-pre-wrap break-words max-w-full font-medium resize-none min-h-[500px] text-foreground",
                          textFontClass,
                          isResponseEnglish ? "text-left" : "text-right"
                        )}
                        dir={isResponseEnglish ? "ltr" : "rtl"}
                        value={editedLetter}
                        onChange={(e) => setEditedLetter(e.target.value)}
                        placeholder={isResponseEnglish ? "Write your complaint letter..." : "شکایتی خط لکھیں..."}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {result.relevant_laws && result.relevant_laws.length > 0 && (
                <AccordionItem value="laws" className="border-none mt-3">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-[#3A231A]/30 hover:bg-[#3A231A]/50 transition-colors group flex items-center justify-between cursor-pointer border border-[#523225]">
                    <div className={cn("flex items-center gap-3 text-accent transition-colors", isResponseEnglish ? "justify-start" : "justify-end flex-row-reverse")}>
                      <Scale className="w-5 h-5 text-accent" />
                      <span className={cn("text-2xl font-bold m-0", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>{lang.verifiedLawsTitle}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3">
                    <div className="grid gap-4 mt-2">
                      {result.relevant_laws.map((lawObj, idx) => (
                        <div key={idx} className="parchment-sheet rounded-xl p-5 border border-accent/20 flex flex-col gap-2 shadow-sm">
                          <div className={cn("flex items-center justify-between gap-4 border-b border-[#C5B69C]/40 dark:border-accent/10 pb-2", isResponseEnglish ? "" : "flex-row-reverse")}>
                            <span className="font-bold text-amber-950 dark:text-[#E6DBC6] text-lg font-inter">
                              ⚖️ {lawObj.law}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent font-inter">
                              {lang.registryEntry}{idx + 1}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1 pt-1">
                            <span className={cn("text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter", isMostlyEnglish(lawObj.provision) ? "text-left" : "text-right")}>
                              {lang.lawProvision}
                            </span>
                            <p className={cn("text-lg leading-relaxed text-amber-950 dark:text-[#E6DBC6]", isMostlyEnglish(lawObj.provision) ? "font-inter" : "font-urdu")} dir={isMostlyEnglish(lawObj.provision) ? "ltr" : "rtl"}>
                              {lawObj.provision}
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-[#C5B69C]/40 dark:border-accent/10">
                            <div className={isMostlyEnglish(lawObj.authority) ? "text-left" : "text-right"}>
                              <span className="text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter">
                                {lang.enforcementAuthority}
                              </span>
                              <p className={cn("text-base font-semibold text-amber-950 dark:text-[#E6DBC6]", isMostlyEnglish(lawObj.authority) ? "font-inter" : "font-urdu")} dir={isMostlyEnglish(lawObj.authority) ? "ltr" : "rtl"}>
                                {lawObj.authority}
                              </p>
                            </div>
                            {lawObj.contact && (
                              <div className={isMostlyEnglish(lawObj.contact) ? "text-left" : "text-right"}>
                                <span className="text-[9px] uppercase tracking-wider text-amber-900/50 dark:text-amber-100/40 font-bold font-inter">
                                  {lang.officialContact}
                                </span>
                                <p className="font-inter text-xs font-semibold text-accent leading-normal mt-0.5" dir={isMostlyEnglish(lawObj.contact) ? "ltr" : "rtl"}>
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
              <h4 className={cn("text-2xl font-bold text-accent mb-3", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>{lang.nextStepsTitle}</h4>
              <ol className={cn("text-base md:text-lg leading-[2.2] space-y-3 list-decimal list-inside", textFontClass)} dir={isResponseEnglish ? "ltr" : "rtl"}>
                <li className="text-foreground">
                  {lang.step1}
                </li>
                <li className="text-foreground">
                  {lang.step2.replace('[authority]', result.responsible_authority)}
                </li>
                <li className="text-foreground">
                  {lang.step3}
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
