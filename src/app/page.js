"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { SdgFocusSection } from '@/components/sections/SdgFocusSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ComplaintInput } from '@/components/features/ComplaintInput';
import { ResultCard } from '@/components/features/ResultCard';
import { KnowYourRights } from '@/components/features/KnowYourRights';
import { HeatmapSection } from '@/components/features/HeatmapSection';
import { useAnalyzeComplaint } from '@/lib/hooks';

function formatUrduLetter(letter) {
  if (!letter) return '';
  // If it already has newlines, don't modify it
  if (letter.includes('\n')) return letter;

  let formatted = letter;
  
  // Insert newlines before key structural Urdu letter phrases
  formatted = formatted.replace(/(حوالہ نمبر:)/g, '\n$1');
  formatted = formatted.replace(/(بتاریخ:)/g, '\n$1');
  formatted = formatted.replace(/(بخدمت جناب)/g, '\n$1');
  formatted = formatted.replace(/(موضوع:)/g, '\n\n$1');
  formatted = formatted.replace(/(جنابِ? عالی،)/g, '\n\n$1\n');
  formatted = formatted.replace(/(والسلام،)/g, '\n\n$1\n');
  
  return formatted.trim();
}

export default function Home() {
  const { data: analysisResult, loading, analyze } = useAnalyzeComplaint();
  const [editedLetter, setEditedLetter] = React.useState('');
  const [submittedOptions, setSubmittedOptions] = React.useState({ language: 'Urdu', letter_language: 'Urdu' });

  React.useEffect(() => {
    if (analysisResult?.complaint_letter) {
      setEditedLetter(formatUrduLetter(analysisResult.complaint_letter));
    }
  }, [analysisResult?.complaint_letter]);

  const handleAnalyze = (text, options = {}) => {
    setSubmittedOptions(options);
    analyze(text, options);
    // Smooth scroll down slightly after analyzing
    setTimeout(() => {
      const resultEl = document.getElementById('result-section');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary no-print">
        <Header />
        
        <main className="flex-grow">
          <HeroSection />
          
          <HowItWorksSection />
          
          <ComplaintInput onAnalyze={handleAnalyze} loading={loading} />
          
          <div id="result-section" className="scroll-mt-24">
            {analysisResult && (
              <>
                <ResultCard 
                  result={analysisResult} 
                  editedLetter={editedLetter} 
                  setEditedLetter={setEditedLetter} 
                  language={submittedOptions.language}
                  letterLanguage={submittedOptions.letter_language}
                />
                {analysisResult.status === "ok" && (
                  <KnowYourRights result={analysisResult} />
                )}
              </>
            )}
          </div>

          <div className="mt-12">
            <HeatmapSection />
          </div>

          <SdgFocusSection />

          <TestimonialsSection />

          <FaqSection />
        </main>

        <Footer />
      </div>

      {analysisResult && (
        <div id="print-letter-target" className="hidden print:block font-urdu">
          {editedLetter}
        </div>
      )}
    </>
  );
}
